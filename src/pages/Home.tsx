
import { useEffect } from "react";
import { Calendar, MessageSquare, BookOpen, Heart } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Button from "@/components/Button";

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const quickActions = [
    {
      title: "Book a Session",
      description: "Schedule time with a licensed therapist",
      icon: Calendar,
      link: "/appointment",
    },
    {
      title: "Chat Support",
      description: "Get immediate help from our AI assistant",
      icon: MessageSquare,
      link: "/chatbot",
    },
    {
      title: "Resources",
      description: "Explore books, movies, and songs for mental health",
      icon: BookOpen,
      link: "/books",
    },
    {
      title: "Daily Check-in",
      description: "Track your mood and mental wellbeing",
      icon: Heart,
      link: "#",
    },
  ];

  const moodTips = [
    {
      mood: "Feeling Anxious",
      tip: "Practice 4-7-8 breathing: Inhale for 4 seconds, hold for 7, exhale for 8.",
    },
    {
      mood: "Feeling Sad",
      tip: "Try to get outside for a 10-minute walk; nature and movement can help lift your mood.",
    },
    {
      mood: "Feeling Overwhelmed",
      tip: "Break tasks into smaller steps and focus on just one thing at a time.",
    },
    {
      mood: "Feeling Lonely",
      tip: "Reach out to one person today, even with a simple message or call.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Welcome to MindBloom</h1>
            <p className="text-gray-600">Your personal space for mental wellbeing.</p>
          </div>
          
          {/* Quick Actions */}
          <section className="mb-12">
            <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {quickActions.map((action, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-sm hover-scale">
                  <div className="flex items-start space-x-4">
                    <div className="bg-mindbloom-purple/10 p-3 rounded-full">
                      <action.icon className="h-6 w-6 text-mindbloom-purple" />
                    </div>
                    <div>
                      <h3 className="font-medium">{action.title}</h3>
                      <p className="text-sm text-gray-600 mb-3">{action.description}</p>
                      <Button variant="ghost" size="sm" to={action.link}>
                        Go →
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
          
          {/* Daily Wellness */}
          <section className="mb-12">
            <h2 className="text-xl font-semibold mb-4">Today's Wellness Tip</h2>
            <div className="bg-mindbloom-pink-light/30 p-6 rounded-xl border border-mindbloom-pink/10">
              <h3 className="text-lg font-medium mb-2">Mindful Moment</h3>
              <p className="text-gray-700 mb-4">
                Take a 5-minute break today to simply sit and observe your breath. 
                Notice the sensations of breathing without trying to change anything.
                This small practice can help center your mind and reduce stress.
              </p>
              <div className="text-sm text-mindbloom-pink">
                <span className="font-medium">Remember:</span> Small acts of self-care add up to significant wellbeing over time.
              </div>
            </div>
          </section>
          
          {/* Mood Support */}
          <section className="mb-12">
            <h2 className="text-xl font-semibold mb-4">Mood Support</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {moodTips.map((item, index) => (
                <div key={index} className="bg-white p-5 rounded-xl shadow-sm">
                  <h3 className="font-medium text-mindbloom-purple mb-2">{item.mood}</h3>
                  <p className="text-sm text-gray-600">{item.tip}</p>
                </div>
              ))}
            </div>
          </section>
          
          {/* Recent Resources */}
          <section>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Recommended For You</h2>
              <Button variant="link" to="/books">View All</Button>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="bg-mindbloom-purple/5 p-4 rounded-lg">
                  <span className="text-sm font-medium text-mindbloom-purple block mb-2">Book</span>
                  <h3 className="font-medium mb-1">The Comfort Book</h3>
                  <p className="text-sm text-gray-600 mb-3">by Matt Haig</p>
                  <Button variant="outline" size="sm" to="/books">
                    Learn More
                  </Button>
                </div>
                
                <div className="bg-mindbloom-pink/5 p-4 rounded-lg">
                  <span className="text-sm font-medium text-mindbloom-pink block mb-2">Movie</span>
                  <h3 className="font-medium mb-1">Inside Out</h3>
                  <p className="text-sm text-gray-600 mb-3">Understanding Emotions</p>
                  <Button variant="outline" size="sm" to="/movies">
                    Learn More
                  </Button>
                </div>
                
                <div className="bg-mindbloom-purple/5 p-4 rounded-lg">
                  <span className="text-sm font-medium text-mindbloom-purple block mb-2">Song</span>
                  <h3 className="font-medium mb-1">Weightless</h3>
                  <p className="text-sm text-gray-600 mb-3">by Marconi Union</p>
                  <Button variant="outline" size="sm" to="/songs">
                    Learn More
                  </Button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Home;
