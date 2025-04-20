import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import ResourceCard from "@/components/ResourceCard";

const MovieRecommendations = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const movies = [
    {
      title: "Inside Out",
      year: "2015",
      description:
        "A brilliant animated film that personifies the emotions inside a young girl's mind, helping viewers of all ages better understand their feelings and emotional processes.",
      image:
        "https://images.unsplash.com/photo-1616530940355-351fabd9524b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=435&q=80",
      symptoms: ["Emotional Understanding", "Depression", "Life Transitions"],
    },
    {
      title: "Good Will Hunting",
      year: "1997",
      description:
        "A touching story about a troubled young man's journey through therapy. The film beautifully portrays the therapeutic relationship and the process of healing from past trauma.",
      image:
        "https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=725&q=80",
      symptoms: ["Trauma", "Trust Issues", "Self-Worth"],
    },
    {
      title: "Silver Linings Playbook",
      year: "2012",
      description:
        "A raw and honest depiction of living with bipolar disorder and the journey of finding hope and connection after a mental health crisis.",
      image:
        "https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=725&q=80",
      symptoms: ["Bipolar Disorder", "Relationship Issues", "Recovery"],
    },
    {
      title: "The Perks of Being a Wallflower",
      year: "2012",
      description:
        "A coming-of-age story that sensitively deals with issues of trauma, mental health, and finding belonging. It resonates with those who have felt like outsiders.",
      image:
        "https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=725&q=80",
      symptoms: ["Trauma", "Social Anxiety", "Identity Issues"],
    },
    {
      title: "A Beautiful Mind",
      year: "2001",
      description:
        "Based on the life of John Nash, this film provides insight into the experience of living with schizophrenia while pursuing a meaningful life and career.",
      image:
        "https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=725&q=80",
      symptoms: ["Schizophrenia", "Delusions", "Recovery"],
    },
    {
      title: "It's Kind of a Funny Story",
      year: "2010",
      description:
        "An insightful and sometimes humorous look at a teenager's week in a psychiatric ward, highlighting the importance of reaching out for help during a mental health crisis.",
      image:
        "https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=725&q=80",
      symptoms: ["Depression", "Suicidal Thoughts", "Teen Mental Health"],
    },
  ];

  const categories = [
    { id: "anxiety", name: "Anxiety" },
    { id: "depression", name: "Depression" },
    { id: "trauma", name: "Trauma" },
    { id: "recovery", name: "Recovery" },
    { id: "family", name: "Family Issues" },
    { id: "identity", name: "Identity" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow pt-16">
        <Hero
          title="Movie Recommendations"
          description="Films can be powerful tools for understanding mental health challenges, fostering empathy, and providing comfort. Explore our curated list of movies that thoughtfully address various aspects of mental wellbeing."
        />

        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="mb-8 overflow-x-auto">
              <div className="flex space-x-2 pb-2">
                <button className="bg-PMHS-purple text-white px-4 py-2 rounded-full text-sm">
                  All Movies
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
              {movies.map((movie, index) => (
                <ResourceCard
                  key={index}
                  title={`${movie.title} (${movie.year})`}
                  description={movie.description}
                  image={movie.image}
                  symptoms={movie.symptoms}
                />
              ))}
            </div>
          </div>
        </section>

        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl font-bold mb-6">
                The Therapeutic Value of Cinema
              </h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  Movies can play a significant role in what therapists call
                  "bibliotherapy" - using stories to help process emotions and
                  experiences.
                </p>
                <p>
                  When we see characters facing challenges similar to our own,
                  it can help us feel less alone and provide new perspectives on
                  our situations. Films can also help us understand mental
                  health conditions we haven't personally experienced, fostering
                  empathy and reducing stigma.
                </p>
                <p>
                  For those experiencing mental health challenges, watching a
                  movie that resonates with your experience can be validating.
                  It can help articulate feelings that might be difficult to
                  express and provide hope by showing recovery journeys.
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

export default MovieRecommendations;
