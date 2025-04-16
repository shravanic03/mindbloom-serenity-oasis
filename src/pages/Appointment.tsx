
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Button from "@/components/Button";

const Appointment = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [selectedTherapist, setSelectedTherapist] = useState<string>("");
  const [showConfirmation, setShowConfirmation] = useState(false);

 

  const availableDates = [
    "2025-04-15",
    "2025-04-16",
    "2025-04-17",
    "2025-04-18",
    "2025-04-19",
  ];

  const availableTimes = [
    "09:00 AM",
    "10:00 AM",
    "11:00 AM",
    "02:00 PM",
    "03:00 PM",
    "04:00 PM",
  ];

  const handleBookAppointment = () => {
    if (selectedDate && selectedTime && selectedTherapist) {
      setShowConfirmation(true);
    }
  };

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
              <h2 className="text-2xl font-bold mb-6">Schedule Your Appointment</h2>
              
              {showConfirmation ? (
                <div className="space-y-6">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-green-800">
                    <h3 className="text-lg font-medium mb-2">Appointment Confirmed!</h3>
                    <p>
                      Your appointment has been scheduled on {selectedDate} at {selectedTime}.
                    </p>
                  </div>
                  
                  <div className="bg-mindbloom-purple/5 rounded-lg p-4">
                    <h3 className="text-lg font-medium mb-2">What to Expect</h3>
                    <p className="text-gray-700 mb-4">
                      You'll receive a confirmation email with details about your appointment and how to prepare.
                      Your therapist will meet you via video call at the scheduled time.
                    </p>
                    <p className="text-gray-700">
                      If you need to reschedule or cancel, please do so at least 24 hours in advance.
                    </p>
                  </div>
                  
                  <div className="flex justify-center">
                    <Button variant="gradient" to="/home">
                      Return to Dashboard
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Select a Date
                    </label>
                    <select
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-mindbloom-purple focus:border-mindbloom-purple"
                    >
                      <option value="">Choose a date</option>
                      {availableDates.map((date) => (
                        <option key={date} value={date}>
                          {new Date(date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Select a Time
                    </label>
                    <select
                      value={selectedTime}
                      onChange={(e) => setSelectedTime(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-mindbloom-purple focus:border-mindbloom-purple"
                    >
                      <option value="">Choose a time</option>
                      {availableTimes.map((time) => (
                        <option key={time} value={time}>
                          {time}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                 
                  
                  <div className="pt-4">
                    <Button
                      variant="gradient"
                      className="w-full"
                      onClick={handleBookAppointment}
                      disabled={!selectedDate || !selectedTime || !selectedTherapist}
                    >
                      Book Appointment
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
  );
};

export default Appointment;
