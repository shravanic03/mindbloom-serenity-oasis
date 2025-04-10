
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import { Users, Heart, Star, MessageCircle } from "lucide-react";

const AboutUs = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const teamMembers = [
    {
      name: "Dr. Emma Wilson",
      role: "Clinical Psychologist & Founder",
      bio: "With over 15 years of experience in clinical psychology, Dr. Wilson founded MindBloom to make mental health resources more accessible to everyone.",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=464&q=80"
    },
    {
      name: "Michael Chen",
      role: "Therapist & Content Director",
      bio: "Michael specializes in anxiety and depression treatment, bringing his expertise to curate resources that genuinely help those struggling with mental health challenges.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80"
    },
    {
      name: "Dr. Sarah Johnson",
      role: "Psychiatrist",
      bio: "Dr. Johnson believes in a holistic approach to mental wellness, combining traditional psychiatric practices with mindfulness and creative therapies.",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=461&q=80"
    },
    {
      name: "David Rodriguez",
      role: "Wellness Coach",
      bio: "David's background in behavioral psychology and mindfulness coaching helps clients develop sustainable practices for long-term mental health.",
      image: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80"
    },
  ];

  const values = [
    {
      title: "Compassion",
      description: "We approach every individual with genuine care and understanding, recognizing each person's unique journey.",
      icon: Heart,
    },
    {
      title: "Excellence",
      description: "We are committed to providing the highest quality resources and support based on evidence-based practices.",
      icon: Star,
    },
    {
      title: "Accessibility",
      description: "We believe everyone deserves access to mental health resources regardless of their circumstances.",
      icon: Users,
    },
    {
      title: "Community",
      description: "We foster a supportive environment where people feel connected and understood in their mental health journey.",
      icon: MessageCircle,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-16">
        {/* Hero Section */}
        <Hero
          title="Our Mission & Vision"
          description="At MindBloom, we're dedicated to making mental health support accessible, engaging, and effective for everyone. We believe in the power of community, education, and professional guidance to transform lives."
        />
        
        {/* Our Story */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold mb-6 text-center">Our Story</h2>
              <div className="space-y-6 text-gray-700">
                <p>
                  MindBloom began in 2019 when our founder, Dr. Emma Wilson, recognized that despite growing awareness of mental health issues, many people still struggled to find accessible resources and support.
                </p>
                <p>
                  Having worked as a clinical psychologist for over a decade, Dr. Wilson saw firsthand how the right guidance, community support, and educational resources could transform people's mental health journeys. She envisioned a platform that would combine these elements in an approachable, stigma-free digital environment.
                </p>
                <p>
                  Today, MindBloom has grown into a comprehensive mental wellness platform serving thousands of users worldwide. Our team of mental health professionals, content creators, and technology specialists work together to provide evidence-based resources in an engaging, accessible format.
                </p>
                <p>
                  We believe that mental health care should be personalized, proactive, and integrated into everyday life. Through MindBloom, we're working to make that vision a reality for people everywhere.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Our Values */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-sm text-center">
                  <div className="bg-purple-pink-gradient w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <value.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Our Team */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">Meet Our Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.map((member, index) => (
                <div key={index} className="bg-white rounded-xl overflow-hidden shadow-md hover-scale">
                  <div className="aspect-square overflow-hidden">
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold">{member.name}</h3>
                    <p className="text-mindbloom-purple text-sm mb-3">{member.role}</p>
                    <p className="text-gray-600 text-sm">{member.bio}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default AboutUs;
