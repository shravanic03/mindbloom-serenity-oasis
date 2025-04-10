
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Button from "@/components/Button";
import { MessageSquare, Check } from "lucide-react";

const Feedback = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [feedbackType, setFeedbackType] = useState("general");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate submission process
    setTimeout(() => {
      setSubmitted(true);
      setIsLoading(false);
    }, 1500);
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        
        <main className="flex-grow pt-16">
          <div className="container mx-auto px-4 py-16">
            <div className="max-w-lg mx-auto bg-white rounded-xl shadow-md p-8 text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check className="h-10 w-10 text-green-600" />
              </div>
              <h1 className="text-2xl font-bold mb-4">Thank You for Your Feedback!</h1>
              <p className="text-gray-600 mb-8">
                We appreciate you taking the time to share your thoughts with us.
                Your feedback helps us improve our services and better support your mental health journey.
              </p>
              <Button variant="gradient" to="/home" className="mx-auto">
                Return to Home
              </Button>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-16">
        <Hero
          title="Share Your Feedback"
          description="Your thoughts and experiences matter to us. Help us improve our platform and services by sharing your feedback."
        />
        
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-1">
                  <div className="bg-mindbloom-purple/10 p-6 rounded-xl">
                    <MessageSquare className="h-10 w-10 text-mindbloom-purple mb-4" />
                    <h2 className="text-xl font-semibold mb-3">Why Your Feedback Matters</h2>
                    <p className="text-gray-600 mb-6">
                      Your insights help us create a better experience for everyone in our community.
                      We use your feedback to improve our resources, services, and overall approach.
                    </p>
                    <div className="border-t border-mindbloom-purple/20 pt-4">
                      <p className="text-sm text-gray-600">
                        Your privacy is important to us. We'll never share your personal information without your consent.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="md:col-span-2">
                  <div className="bg-white p-6 rounded-xl shadow-md">
                    <h2 className="text-xl font-semibold mb-6">Feedback Form</h2>
                    
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                            Your Name
                          </label>
                          <input
                            id="name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-md focus:ring-mindbloom-purple focus:border-mindbloom-purple"
                            placeholder="Enter your name"
                            required
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            Your Email
                          </label>
                          <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-md focus:ring-mindbloom-purple focus:border-mindbloom-purple"
                            placeholder="Enter your email"
                            required
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label htmlFor="feedbackType" className="block text-sm font-medium text-gray-700 mb-1">
                          Feedback Type
                        </label>
                        <select
                          id="feedbackType"
                          value={feedbackType}
                          onChange={(e) => setFeedbackType(e.target.value)}
                          className="w-full p-3 border border-gray-300 rounded-md focus:ring-mindbloom-purple focus:border-mindbloom-purple"
                          required
                        >
                          <option value="general">General Feedback</option>
                          <option value="suggestion">Suggestion</option>
                          <option value="resources">Resource Recommendations</option>
                          <option value="therapist">Therapist Experience</option>
                          <option value="technical">Technical Issue</option>
                        </select>
                      </div>
                      
                      <div>
                        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                          Your Message
                        </label>
                        <textarea
                          id="message"
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          className="w-full p-3 border border-gray-300 rounded-md focus:ring-mindbloom-purple focus:border-mindbloom-purple resize-none"
                          placeholder="Share your thoughts, ideas, or experiences..."
                          rows={6}
                          required
                        />
                      </div>
                      
                      <div className="flex items-start">
                        <input
                          id="consent"
                          type="checkbox"
                          className="h-4 w-4 text-mindbloom-purple border-gray-300 rounded focus:ring-mindbloom-purple mt-1"
                          required
                        />
                        <label htmlFor="consent" className="ml-2 text-sm text-gray-600">
                          I consent to having my feedback reviewed by the MindBloom team. They may contact me for follow-up if needed.
                        </label>
                      </div>
                      
                      <Button 
                        variant="gradient" 
                        type="submit"
                        disabled={isLoading}
                      >
                        {isLoading ? "Submitting..." : "Submit Feedback"}
                      </Button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Feedback;
