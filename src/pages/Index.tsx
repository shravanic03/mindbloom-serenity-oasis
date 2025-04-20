import { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Calendar,
  MessageSquare,
  Book,
  Film,
  Music,
  Heart,
} from "lucide-react";
import Hero from "@/components/Hero";
import FeatureCard from "@/components/FeatureCard";
import Button from "@/components/Button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Index = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const features = [
    {
      title: "Book Appointments",
      description:
        "Schedule sessions with licensed therapists who care about your wellbeing.",
      icon: Calendar,
    },
    {
      title: "Chat Support",
      description:
        "Get immediate support through our AI-powered mental health chatbot.",
      icon: MessageSquare,
    },
    {
      title: "Personalized Resources",
      description:
        "Discover books, movies, and songs tailored to your mental health journey.",
      icon: Heart,
    },
  ];

  const resources = [
    {
      title: "Books for Mental Health",
      description:
        "Discover literature that promotes mental wellbeing and provides helpful insights.",
      icon: Book,
      path: "/books",
    },
    {
      title: "Therapeutic Movies",
      description:
        "Find films that inspire, comfort, and provide perspective on mental health challenges.",
      icon: Film,
      path: "/movies",
    },
    {
      title: "Mindful Music",
      description:
        "Explore songs and playlists curated to support various emotional states.",
      icon: Music,
      path: "/songs",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow pt-16">
        {/* Hero Section */}
        <Hero
          title="Your Journey to Mental Wellness Starts Here"
          description="PMHS provides supportive resources, professional guidance, and a caring community to help you flourish mentally and emotionally."
          primaryButtonText="Book an Appointment"
          primaryButtonLink="/appointment"
          secondaryButtonText="Try Our Chatbot"
          secondaryButtonLink="/chatbot"
        />

        {/* Features Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">How We Support You</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                PMHS offers various services designed to support your mental
                health journey, no matter where you are on your path to
                wellness.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <FeatureCard
                  key={index}
                  title={feature.title}
                  description={feature.description}
                  icon={feature.icon}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Resources Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Explore Our Resources</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Discover curated recommendations for books, movies, and songs
                that support mental health and wellbeing.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {resources.map((resource, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl p-8 shadow-md hover-scale"
                >
                  <div className="w-16 h-16 rounded-full bg-PMHS-purple flex items-center justify-center mb-6 mx-auto">
                    <resource.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-center">
                    {resource.title}
                  </h3>
                  <p className="text-gray-600 text-center mb-6">
                    {resource.description}
                  </p>
                  <div className="text-center">
                    <Button variant="outline" to={resource.path}>
                      Explore
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-purple-pink-gradient text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Begin Your Journey?
            </h2>
            <p className="text-white/90 max-w-2xl mx-auto mb-8">
              Take the first step toward better mental health today. Our
              supportive community and resources are here to help you thrive.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button
                variant="default"
                size="lg"
                className="bg-white text-PMHS-purple hover:bg-white/90"
                to="/signup"
              >
                Sign Up For Free
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white/10"
                to="/about"
              >
                Learn More About Us
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
