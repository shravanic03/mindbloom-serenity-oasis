import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { format, isToday } from "date-fns";
import Navbar from "@/components/Navbar";
import Button from "@/components/Button";
import {
  Calendar,
  Clock,
  User,
  Phone,
  CheckCircle,
  XCircle,
  LogOut,
} from "lucide-react";
import { fetchWithAuth } from "@/utils/auth-utils";

interface Appointment {
  id: number;
  student_id: number;
  slot_id: number;
  date: string;
  status: string;
  slot?: {
    start_time: string;
    end_time: string;
  };
  student?: {
    name: string;
    email: string;
    mobile: string;
  };
}

const CounsellorDashboard = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if admin is logged in
    const isAdmin = localStorage.getItem("adminAuth") === "true";
    if (!isAdmin) {
      navigate("/admin-login");
      return;
    }

    fetchTodaysAppointments();
  }, [navigate]);

  const fetchTodaysAppointments = async () => {
    setLoading(true);
    setError(null);

    try {
      // Fetch all appointments
      const response = await fetch(
        "https://phms-backend.onrender.com/api/appointment/getTodaysAppointments"
      );

      if (!response.ok) {
        throw new Error("Failed to fetch appointments");
      }

      const data = await response.json();

      setAppointments(data);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "An error occurred while fetching appointments"
      );
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkComplete = async (appointmentId: number) => {
    try {
      setLoading(true);
      setError(null);
      try {
        const response = await fetchWithAuth(
          `https://phms-backend.onrender.com/api/appointment/cancel/${appointmentId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              role: "admin",
              operation: "completed",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to cancel appointment");
        }
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Error canceling appointment. Please try again later."
        );
        console.error(err);
      } finally {
        setLoading(false);
      }

      setAppointments(
        appointments.map((appointment) =>
          appointment.id === appointmentId
            ? { ...appointment, status: "completed" }
            : appointment
        )
      );
    } catch (error) {
      console.error("Error marking appointment as complete:", error);
    }
  };

  const handleMarkCancelled = async (appointmentId: number) => {
    try {
      // In a real app, you would call an API to update the appointment status
      // For now, we'll just update the local state
      setLoading(true);
      setError(null);

      try {
        const response = await fetchWithAuth(
          `https://phms-backend.onrender.com/api/appointment/cancel/${appointmentId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              role: "admin",
              operation: "cancel",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to cancel appointment");
        }
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Error canceling appointment. Please try again later."
        );
        console.error(err);
      } finally {
        setLoading(false);
      }
      setAppointments(
        appointments.map((appointment) =>
          appointment.id === appointmentId
            ? { ...appointment, status: "canceled" }
            : appointment
        )
      );
    } catch (error) {
      console.error("Error marking appointment as cancelled:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow pt-20 pb-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-3xl font-bold mb-2">Counselor Dashboard</h1>
                <p className="text-gray-600">
                  Today's appointments:{" "}
                  {format(new Date(), "EEEE, MMMM d, yyyy")}
                </p>
              </div>
            </div>

            {loading && (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-PMHS-purple"></div>
              </div>
            )}

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg mb-8">
                <p className="font-medium">Error</p>
                <p>{error}</p>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-2"
                  onClick={fetchTodaysAppointments}
                >
                  Try Again
                </Button>
              </div>
            )}

            {!loading && !error && appointments.length === 0 && (
              <div className="bg-gray-50 border border-gray-100 rounded-lg p-8 text-center">
                <Calendar className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No Appointments Today
                </h3>
                <p className="text-gray-600">
                  You don't have any appointments scheduled for today.
                </p>
              </div>
            )}

            {!loading && !error && appointments.length > 0 && (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {appointments.map((appointment) => {
                  const timeSlot = appointment.slot
                    ? `${appointment.slot.start_time} - ${appointment.slot.end_time}`
                    : "Time not specified";

                  return (
                    <div
                      key={appointment.id}
                      className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="font-medium text-lg text-gray-900">
                          Appointment #{appointment.id}
                        </h3>
                        <span
                          className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                            appointment.status === "completed"
                              ? "bg-green-100 text-green-800"
                              : appointment.status === "canceled"
                              ? "bg-red-100 text-red-800"
                              : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {appointment.status}
                        </span>
                      </div>

                      <div className="space-y-3 mb-6">
                        <div className="flex items-center text-sm text-gray-600">
                          <Clock className="w-4 h-4 mr-2 text-PMHS-purple" />
                          {timeSlot}
                        </div>

                        {appointment.student && (
                          <>
                            <div className="flex items-center text-sm text-gray-600">
                              <User className="w-4 h-4 mr-2 text-PMHS-purple" />
                              {appointment.student.name}
                            </div>
                            <div className="flex items-center text-sm text-gray-600">
                              <Phone className="w-4 h-4 mr-2 text-PMHS-purple" />
                              {appointment.student.mobile}
                            </div>
                          </>
                        )}
                      </div>

                      {appointment.status !== "completed" &&
                        appointment.status !== "canceled" && (
                          <div className="flex space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="flex-1 flex items-center justify-center space-x-1"
                              onClick={() => handleMarkComplete(appointment.id)}
                            >
                              <CheckCircle className="w-4 h-4" />
                              <span>Complete</span>
                            </Button>
                            <Button
                              size="sm"
                              className="flex-1 flex items-center justify-center space-x-1"
                              onClick={() =>
                                handleMarkCancelled(appointment.id)
                              }
                            >
                              <XCircle className="w-4 h-4" />
                              <span>Cancel</span>
                            </Button>
                          </div>
                        )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default CounsellorDashboard;
