import { useState, useEffect } from "react"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import Hero from "@/components/Hero"
import Button from "@/components/Button"
import { CalendarIcon, Clock, RefreshCw, XCircle } from "lucide-react"
import { fetchWithAuth } from "../utils/auth-utils"

interface Slot {
  id: number
  date: string
  start_time: string
  end_time: string
  status: string
}

interface Appointment {
  id: number
  slot_id: number
  date: string
  status: string
  slot?: Slot
}

const Appointment = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
    fetchAvailableSlots()
  }, [])

  const [availableSlots, setAvailableSlots] = useState<Slot[]>([])
  const [availableDates, setAvailableDates] = useState<string[]>([])
  const [availableTimes, setAvailableTimes] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [selectedDate, setSelectedDate] = useState<string>("")
  const [selectedTime, setSelectedTime] = useState<string>("")
  // Therapist is automatically assigned
  const [selectedSlotId, setSelectedSlotId] = useState<number | null>(null)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [currentAppointment, setCurrentAppointment] = useState<Appointment | null>(null)
  const [isRescheduling, setIsRescheduling] = useState(false)

  // Fetch available slots from the backend
  const fetchAvailableSlots = async () => {
    setLoading(true)
    setError(null)
    try {
      // Using fetchWithAuth even though this might be a public endpoint
      // This ensures consistent error handling and token refresh if needed
      const response = await fetchWithAuth("http://localhost:5030/api/slot/get")

      if (!response.ok) {
        throw new Error("Failed to fetch available slots")
      }

      const data: Slot[] = await response.json()
      setAvailableSlots(data)

      // Extract unique dates from slots
      const uniqueDates = [...new Set(data.map((slot) => slot.date))]
      setAvailableDates(uniqueDates)
    } catch (err) {
      setError("Error fetching available slots. Please try again later.")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  // Update available times when a date is selected
  useEffect(() => {
    if (selectedDate) {
      const slotsForDate = availableSlots.filter((slot) => slot.date === selectedDate && slot.status === "available")

      // Extract times from slots for the selected date
      const times = slotsForDate.map((slot) => `${slot.start_time} - ${slot.end_time}`)
      setAvailableTimes(times)
    } else {
      setAvailableTimes([])
    }
  }, [selectedDate, availableSlots])

  // Find slot ID when time is selected
  useEffect(() => {
    if (selectedDate && selectedTime) {
      const [startTime, endTime] = selectedTime.split(" - ")
      const slot = availableSlots.find(
        (slot) =>
          slot.date === selectedDate &&
          slot.start_time === startTime &&
          slot.end_time === endTime &&
          slot.status === "available",
      )

      if (slot) {
        setSelectedSlotId(slot.id)
      } else {
        setSelectedSlotId(null)
      }
    }
  }, [selectedDate, selectedTime, availableSlots])

  // Book an appointment
  const handleBookAppointment = async () => {
    if (!selectedDate || !selectedTime || !selectedSlotId) {
      setError("Please select all required fields")
      return
    }

    setLoading(true)
    setError(null)

    try {
      // First book the slot
      const [startTime, endTime] = selectedTime.split(" - ")
      const slotResponse = await fetchWithAuth("http://localhost:5030/api/slot/book", {
        method: "POST",
        body: JSON.stringify({
          date: selectedDate,
          startTime: startTime,
          endTime: endTime,
        }),
      })

      if (!slotResponse.ok) {
        throw new Error("Failed to book slot")
      }

      const slotId = await slotResponse.json()

      // Then book the appointment
      const appointmentResponse = await fetchWithAuth("http://localhost:5030/api/appointment/book", {
        method: "POST",
        body: JSON.stringify({
          slot_id: slotId || selectedSlotId,
          date: selectedDate,
        }),
      })

      if (!appointmentResponse.ok) {
        throw new Error("Failed to book appointment")
      }

      const appointmentData = await appointmentResponse.json()
      setCurrentAppointment(appointmentData.appointment)
      setShowConfirmation(true)

      // Refresh available slots
      fetchAvailableSlots()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error booking appointment. Please try again later.")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  // Cancel an appointment
  const handleCancelAppointment = async () => {
    if (!currentAppointment) return

    setLoading(true)
    setError(null)

    try {
      const response = await fetchWithAuth(`http://localhost:5030/api/appointment/cancel/${currentAppointment.id}`, {
        method: "PUT",
      })

      if (!response.ok) {
        throw new Error("Failed to cancel appointment")
      }

      setShowConfirmation(false)
      setSelectedDate("")
      setSelectedTime("")
      setCurrentAppointment(null)

      // Refresh available slots
      fetchAvailableSlots()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error canceling appointment. Please try again later.")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  // Start rescheduling process
  const startRescheduling = () => {
    setIsRescheduling(true)
    setShowConfirmation(false)
  }

  // Reschedule an appointment
  const handleRescheduleAppointment = async () => {
    if (!currentAppointment || !selectedDate || !selectedTime || !selectedSlotId) {
      setError("Please select all required fields")
      return
    }

    setLoading(true)
    setError(null)

    try {
      const [startTime, endTime] = selectedTime.split(" - ")

      // First book the new slot
      const slotResponse = await fetchWithAuth("http://localhost:5030/api/slot/book", {
        method: "POST",
        body: JSON.stringify({
          date: selectedDate,
          startTime: startTime,
          endTime: endTime,
        }),
      })

      if (!slotResponse.ok) {
        throw new Error("Failed to book new slot")
      }

      const newSlotId = await slotResponse.json()

      // Then reschedule the appointment
      const response = await fetchWithAuth(
        `http://localhost:5030/api/appointment/reschedule/${currentAppointment.id}`,
        {
          method: "PUT",
          body: JSON.stringify({
            new_slot_id: newSlotId || selectedSlotId,
            new_date: selectedDate,
          }),
        },
      )

      if (!response.ok) {
        throw new Error("Failed to reschedule appointment")
      }

      // Update the current appointment
      const updatedAppointment = {
        ...currentAppointment,
        slot_id: newSlotId || selectedSlotId,
        date: selectedDate,
        status: "rescheduled",
      }

      setCurrentAppointment(updatedAppointment)
      setShowConfirmation(true)
      setIsRescheduling(false)

      // Refresh available slots
      fetchAvailableSlots()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error rescheduling appointment. Please try again later.")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  // Fetch user's appointments
  const fetchUserAppointments = async () => {
    try {
      const response = await fetchWithAuth("http://localhost:5030/api/appointment/get")

      if (!response.ok) {
        throw new Error("Failed to fetch appointments")
      }

      const appointments = await response.json()
      // You can use this data to show user's existing appointments
      console.log("User appointments:", appointments)

      return appointments
    } catch (err) {
      console.error("Error fetching user appointments:", err)
      return []
    }
  }

  // Generate half-hour time slots between 9am and 4pm
  const generateTimeSlots = () => {
    const slots = []
    const startHour = 9
    const endHour = 16 // 4pm

    for (let hour = startHour; hour < endHour; hour++) {
      // Add the hour slot (e.g., 9:00 AM - 9:30 AM)
      slots.push(`${hour}:00 - ${hour}:30`)

      // Add the half-hour slot (e.g., 9:30 AM - 10:00 AM)
      if (hour < endHour - 1) {
        slots.push(`${hour}:30 - ${hour + 1}:00`)
      }
    }

    return slots
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow pt-16">
        {/* Hero Section */}
        <Hero
          title="Book Your Appointment"
          description="Schedule a session with one of our qualified mental health professionals. Whether you need ongoing therapy or a one-time consultation, we're here to support you."
        />

        {/* Booking Form */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md p-8">
              <h2 className="text-2xl font-bold mb-6">
                {isRescheduling ? "Reschedule Your Appointment" : "Schedule Your Appointment"}
              </h2>

              {loading && (
                <div className="flex justify-center items-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-mindbloom-purple"></div>
                </div>
              )}

              {error && <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-800 mb-6">{error}</div>}

              {showConfirmation ? (
                <div className="space-y-6">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-green-800">
                    <h3 className="text-lg font-medium mb-2">Appointment Confirmed!</h3>
                    <p>
                      Your appointment has been scheduled on {currentAppointment?.date} at {selectedTime}.
                    </p>
                    <p className="mt-2 text-sm text-green-700">
                      Status: <span className="font-semibold capitalize">{currentAppointment?.status || "booked"}</span>
                    </p>
                  </div>

                  <div className="bg-mindbloom-purple/5 rounded-lg p-4">
                    <h3 className="text-lg font-medium mb-2">What to Expect</h3>
                    <p className="text-gray-700 mb-4">
                      You'll receive a confirmation email with details about your appointment and how to prepare. Your
                      therapist will meet you via video call at the scheduled time.
                    </p>
                    <p className="text-gray-700">
                      If you need to reschedule or cancel, please do so at least 24 hours in advance.
                    </p>
                  </div>

                  <div className="flex justify-center space-x-4">
                    <Button variant="outline" className="flex items-center gap-2" onClick={startRescheduling}>
                      <RefreshCw className="h-4 w-4" />
                      Reschedule
                    </Button>
                    <Button className="flex items-center gap-2" onClick={handleCancelAppointment}>
                      <XCircle className="h-4 w-4" />
                      Cancel
                    </Button>
                    <Button variant="gradient" to="/home">
                      Return to Dashboard
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Select a Date</label>
                    <div className="relative">
                      <select
                        value={selectedDate}
                        onChange={(e) => {
                          setSelectedDate(e.target.value)
                          setSelectedTime("")
                        }}
                        className="w-full p-3 pl-10 border border-gray-300 rounded-md focus:ring-mindbloom-purple focus:border-mindbloom-purple"
                        disabled={loading}
                      >
                        <option value="">Choose a date</option>
                        {availableDates.map((date) => (
                          <option key={date} value={date}>
                            {new Date(date).toLocaleDateString("en-US", {
                              weekday: "long",
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </option>
                        ))}
                      </select>
                      <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Select a Time</label>
                    <div className="relative">
                      <select
                        value={selectedTime}
                        onChange={(e) => setSelectedTime(e.target.value)}
                        className="w-full p-3 pl-10 border border-gray-300 rounded-md focus:ring-mindbloom-purple focus:border-mindbloom-purple"
                        disabled={!selectedDate || loading}
                      >
                        <option value="">Choose a time</option>
                        {availableTimes.length > 0 ? (
                          availableTimes.map((time) => (
                            <option key={time} value={time}>
                              {time}
                            </option>
                          ))
                        ) : (
                          <option value="" disabled>
                            No available times for selected date
                          </option>
                        )}
                      </select>
                      <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    </div>
                  </div>

                  <div className="pt-4">
                    <Button
                      variant="gradient"
                      className="w-full"
                      onClick={isRescheduling ? handleRescheduleAppointment : handleBookAppointment}
                      disabled={!selectedDate || !selectedTime || loading}
                    >
                      {loading ? (
                        <span className="flex items-center justify-center">
                          <span className="animate-spin mr-2 h-4 w-4 border-b-2 border-white rounded-full"></span>
                          {isRescheduling ? "Rescheduling..." : "Booking..."}
                        </span>
                      ) : isRescheduling ? (
                        "Reschedule Appointment"
                      ) : (
                        "Book Appointment"
                      )}
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default Appointment