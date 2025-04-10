
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import ResourceCard from "@/components/ResourceCard";

const BookRecommendations = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const books = [
    {
      title: "The Comfort Book",
      author: "Matt Haig",
      description: "A collection of notes, lists, and stories written over a span of several years that originally served as gentle reminders to the author's future self that things are not always as dark as they may seem.",
      image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80",
      symptoms: ["Anxiety", "Depression", "Overwhelm"],
    },
    {
      title: "Reasons to Stay Alive",
      author: "Matt Haig",
      description: "A moving, funny, and joyous exploration of how to live better, love better, and feel more alive. Haig's bestseller is a memoir about his struggle with depression and how he overcame it.",
      image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80",
      symptoms: ["Depression", "Suicidal Thoughts", "Anxiety"],
    },
    {
      title: "Maybe You Should Talk to Someone",
      author: "Lori Gottlieb",
      description: "A therapist, her therapist, and our lives revealed. This book offers a rare and entertaining backstage pass into the world of therapy, illuminating what it means to be human.",
      image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80",
      symptoms: ["Life Transitions", "Relationship Issues", "Self-Discovery"],
    },
    {
      title: "Atomic Habits",
      author: "James Clear",
      description: "An easy and proven way to build good habits and break bad ones. This book provides practical strategies that will teach you how to form good habits, break bad ones, and master small behaviors that lead to remarkable results.",
      image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=912&q=80",
      symptoms: ["Procrastination", "Motivation Issues", "Unhealthy Patterns"],
    },
    {
      title: "Lost Connections",
      author: "Johann Hari",
      description: "Uncovering the real causes of depression and the unexpected solutions. The book argues that depression and anxiety are largely caused by key problems with the way we live today.",
      image: "https://images.unsplash.com/photo-1491841550275-ad7854e35ca6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
      symptoms: ["Depression", "Anxiety", "Social Disconnection"],
    },
    {
      title: "Mindfulness: A Practical Guide",
      author: "Mark Williams & Danny Penman",
      description: "A practical guide to finding peace in a frantic world. The book contains simple practices that can be incorporated into daily life to help break the cycle of anxiety, stress, and mental exhaustion.",
      image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=499&q=80",
      symptoms: ["Stress", "Anxiety", "Rumination"],
    },
  ];

  const categories = [
    { id: "anxiety", name: "Anxiety" },
    { id: "depression", name: "Depression" },
    { id: "stress", name: "Stress Management" },
    { id: "mindfulness", name: "Mindfulness & Meditation" },
    { id: "relationships", name: "Relationships" },
    { id: "self-help", name: "Self-Help" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-16">
        <Hero
          title="Book Recommendations"
          description="Discover books that can provide insights, comfort, and practical strategies for various mental health challenges. Reading can be a powerful tool for understanding yourself and others better."
        />
        
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="mb-8 overflow-x-auto">
              <div className="flex space-x-2 pb-2">
                <button className="bg-mindbloom-purple text-white px-4 py-2 rounded-full text-sm">
                  All Books
                </button>
                {categories.map((category) => (
                  <button
                    key={category.id}
                    className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-full text-sm whitespace-nowrap"
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {books.map((book, index) => (
                <ResourceCard
                  key={index}
                  title={`${book.title} by ${book.author}`}
                  description={book.description}
                  image={book.image}
                  symptoms={book.symptoms}
                />
              ))}
            </div>
          </div>
        </section>
        
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl font-bold mb-6">How Reading Can Support Mental Health</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  Reading can be more than just a pleasant pastime. Research has shown that regular reading can reduce stress, improve cognitive function, and even increase empathy.
                </p>
                <p>
                  When we read about characters facing challenges similar to our own, we can gain new perspectives and feel less alone. Self-help and psychology books can provide practical tools and frameworks for understanding and managing our mental health.
                </p>
                <p>
                  We recommend setting aside just 15-30 minutes each day for reading. Choose books that resonate with your current experiences or interests, and don't be afraid to put down a book that isn't serving you.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default BookRecommendations;
