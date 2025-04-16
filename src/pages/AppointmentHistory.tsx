"use client"

import { useState, useEffect } from "react"
import { format, isPast, isFuture, isToday } from "date-fns"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { fetchWithAuth } from "../utils/auth-utils"
import { Calendar, Clock, CheckCircle, XCircle, AlertCircle, RefreshCw } from "lucide-react"
import Button from "@/components/Button"

interface Appointment {
  id: number
  slot_id: number
  date: string
  status: string
  slot?: {
    start_time: string
    end_time: string
  }
}

const AppointmentHistory = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchAppointments()
  }, [])

  const fetchAppointments = async () => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetchWithAuth("http://localhost:5030/api/appointment")

      if (!response.ok) {
        throw new Error("Failed to fetch appointments")
      }

      const data = await response.json()
      setAppointments(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred while fetching appointments")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  // Group appointments by status
  const getUpcomingAppointments = () => {
    return appointments.filter((appointment) => {
      const appointmentDate = new Date(appointment.date)
      return (
        (appointment.status === "booked" || appointment.status === "rescheduled") &&
        (isFuture(appointmentDate) || isToday(appointmentDate))
      )
    })
  }

  const getCurrentAppointments = () => {
    return appointments.filter((appointment) => {
      const appointmentDate = new Date(appointment.date)
      return (appointment.status === "booked" || appointment.status === "rescheduled") && isToday(appointmentDate)
    })
  }

  const getPastAppointments = () => {
    return appointments.filter((appointment) => {
      const appointmentDate = new Date(appointment.date)
      return (
        appointment.status === "completed" ||
        appointment.status === "canceled" ||
        (isPast(appointmentDate) && !isToday(appointmentDate))
      )
    })
  }

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case "booked":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            <CheckCircle className="w-3 h-3 mr-1" />
            Booked
          </span>
        )
      case "completed":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <CheckCircle className="w-3 h-3 mr-1" />
            Completed
          </span>
        )
      case "canceled":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            <XCircle className="w-3 h-3 mr-1" />
            Canceled
          </span>
        )
      case "rescheduled":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            <RefreshCw className="w-3 h-3 mr-1" />
            Rescheduled
          </span>
        )
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            <AlertCircle className="w-3 h-3 mr-1" />
            {status}
          </span>
        )
    }
  }

  const renderAppointmentCard = (appointment: Appointment) => {
    const appointmentDate = new Date(appointment.date)
    const formattedDate = format(appointmentDate, "EEEE, MMMM d, yyyy")
    const timeSlot = appointment.slot
      ? `${appointment.slot.start_time} - ${appointment.slot.end_time}`
      : "Time not specified"

    return (
      <div
        key={appointment.id}
        className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 hover:shadow-md transition-shadow"
      >
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-medium text-gray-900">Therapy Session</h3>
            <div className="mt-2 space-y-1">
              <div className="flex items-center text-sm text-gray-600">
                <Calendar className="w-4 h-4 mr-2 text-mindbloom-purple" />
                {formattedDate}
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Clock className="w-4 h-4 mr-2 text-mindbloom-purple" />
                {timeSlot}
              </div>
            </div>
          </div>
          <div>{getStatusBadge(appointment.status)}</div>
        </div>

        {(appointment.status === "booked" || appointment.status === "rescheduled") &&
          (isFuture(appointmentDate) || isToday(appointmentDate)) && (
            <div className="mt-4 flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                to={`/appointment?reschedule=${appointment.id}`}
                className="flex-1 text-xs"
              >
                Reschedule
              </Button>
              <Button size="sm" className="flex-1 text-xs">
                Cancel
              </Button>
            </div>
          )}
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow pt-20 pb-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-2">Your Appointments</h1>
            <p className="text-gray-600 mb-8">View and manage all your therapy appointments</p>

            {loading && (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-mindbloom-purple"></div>
              </div>
            )}

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg mb-8">
                <p className="font-medium">Error</p>
                <p>{error}</p>
                <Button variant="outline" size="sm" className="mt-2" onClick={fetchAppointments}>
                  Try Again
                </Button>
              </div>
            )}

            {!loading && !error && appointments.length === 0 && (
              <div className="bg-gray-50 border border-gray-100 rounded-lg p-8 text-center">
                <Calendar className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Appointments Found</h3>
                <p className="text-gray-600 mb-6">You don't have any appointments scheduled yet.</p>
                <Button variant="gradient" to="/appointment">
                  Book Your First Appointment
                </Button>
              </div>
            )}

            {!loading && !error && appointments.length > 0 && (
              <div className="space-y-8">
                {/* Current Appointments */}
                {getCurrentAppointments().length > 0 && (
                  <div>
                    <h2 className="text-xl font-semibold mb-4 text-gray-900">Today's Appointments</h2>
                    <div className="grid gap-4 md:grid-cols-2">
                      {getCurrentAppointments().map(renderAppointmentCard)}
                    </div>
                  </div>
                )}

                {/* Upcoming Appointments */}
                {getUpcomingAppointments().length > 0 && (
                  <div>
                    <h2 className="text-xl font-semibold mb-4 text-gray-900">Upcoming Appointments</h2>
                    <div className="grid gap-4 md:grid-cols-2">
                      {getUpcomingAppointments().map(renderAppointmentCard)}
                    </div>
                  </div>
                )}

                {/* Past Appointments */}
                {getPastAppointments().length > 0 && (
                  <div>
                    <h2 className="text-xl font-semibold mb-4 text-gray-900">Past Appointments</h2>
                    <div className="grid gap-4 md:grid-cols-2">{getPastAppointments().map(renderAppointmentCard)}</div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default AppointmentHistory