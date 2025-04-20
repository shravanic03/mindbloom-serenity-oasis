"use client";

import type React from "react";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Lock } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Button from "@/components/Button";

// Admin credentials - in a real app, these would be environment variables or secured differently
// For demo purposes, we're hardcoding them here
const ADMIN_EMAIL = "admin@pmhs.com";
const ADMIN_NAME = "Admin";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Simple validation against hardcoded credentials
    if (email === ADMIN_EMAIL && name === ADMIN_NAME) {
      // Set admin cookie/localStorage
      localStorage.setItem("adminAuth", "true");

      // Redirect to counselor dashboard
      setTimeout(() => {
        setIsLoading(false);
        navigate("/counselor-dashboard");
      }, 100);
    } else {
      setTimeout(() => {
        setError("Invalid credentials. Please try again.");
        setIsLoading(false);
      }, 1000);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow pt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-md mx-auto">
            <div className="bg-white rounded-xl shadow-md p-8">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-PMHS-purple/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Lock className="h-8 w-8 text-PMHS-purple" />
                </div>
                <h1 className="text-2xl font-bold gradient-text">
                  Counselor Login
                </h1>
                <p className="text-gray-600 mt-2">
                  Access your counselor dashboard
                </p>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-6">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-PMHS-purple focus:border-PMHS-purple"
                    placeholder="Enter your email"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-PMHS-purple focus:border-PMHS-purple"
                    placeholder="Enter your name"
                    required
                  />
                </div>

                <Button
                  variant="gradient"
                  className="w-full"
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center">
                      <span className="animate-spin mr-2 h-4 w-4 border-b-2 border-white rounded-full"></span>
                      Logging in...
                    </span>
                  ) : (
                    "Login as Counselor"
                  )}
                </Button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                  Not a counselor?{" "}
                  <a href="/login" className="text-PMHS-purple hover:underline">
                    Go to student login
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AdminLogin;
