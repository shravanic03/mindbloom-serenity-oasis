
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import ResourceCard from "@/components/ResourceCard";

const SongRecommendations = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const songs = [
    {
      title: "Weightless",
      artist: "Marconi Union",
      description: "Specially designed in collaboration with sound therapists, this ambient track has been found to reduce anxiety by up to 65% according to scientific research.",
      image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
      symptoms: ["Anxiety", "Stress", "Insomnia"],
    },
    {
      title: "Lovely Day",
      artist: "Bill Withers",
      description: "This uplifting classic celebrates finding joy in simple everyday moments, making it a perfect mood-boosting song for those experiencing depression or low mood.",
      image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
      symptoms: ["Depression", "Low Mood", "Motivation"],
    },
    {
      title: "Breathin",
      artist: "Ariana Grande",
      description: "Written about the artist's own experience with anxiety and panic attacks, this song resonates with many who struggle with similar challenges.",
      image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
      symptoms: ["Anxiety", "Panic Attacks", "Overwhelm"],
    },
    {
      title: "Rise Up",
      artist: "Andra Day",
      description: "An anthem of resilience that can provide strength during challenging times, reminding listeners of their own inner power to overcome obstacles.",
      image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
      symptoms: ["Depression", "Resilience Building", "Trauma Recovery"],
    },
    {
      title: "The Middle",
      artist: "Jimmy Eat World",
      description: "A classic song about self-acceptance and perseverance that has helped many navigate the challenges of identity and self-doubt.",
      image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
      symptoms: ["Self-Esteem", "Identity Issues", "Teen Mental Health"],
    },
    {
      title: "I Am Light",
      artist: "India.Arie",
      description: "A beautiful meditation on the essence of self beyond our struggles and pain, helpful for building self-compassion and positive self-identity.",
      image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
      symptoms: ["Self-Compassion", "Identity", "Healing"],
    },
  ];

  const playlists = [
    { title: "Anxiety Relief", tracks: 15, time: "62 mins" },
    { title: "Sleep & Relaxation", tracks: 18, time: "74 mins" },
    { title: "Mood Boost", tracks: 20, time: "68 mins" },
    { title: "Mindful Moments", tracks: 12, time: "55 mins" },
  ];

  const categories = [
    { id: "anxiety", name: "Anxiety" },
    { id: "depression", name: "Depression" },
    { id: "sleep", name: "Sleep" },
    { id: "meditation", name: "Meditation" },
    { id: "motivation", name: "Motivation" },
    { id: "healing", name: "Healing" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-16">
        <Hero
          title="Song Recommendations"
          description="Music has a profound effect on our emotions and mental state. Explore songs and playlists curated to support various aspects of mental health and wellbeing."
        />
        
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="mb-8 overflow-x-auto">
              <div className="flex space-x-2 pb-2">
                <button className="bg-mindbloom-purple text-white px-4 py-2 rounded-full text-sm">
                  All Songs
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
              {songs.map((song, index) => (
                <ResourceCard
                  key={index}
                  title={`${song.title} by ${song.artist}`}
                  description={song.description}
                  image={song.image}
                  symptoms={song.symptoms}
                />
              ))}
            </div>
          </div>
        </section>
        
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-8">Curated Playlists</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {playlists.map((playlist, index) => (
                <div key={index} className="bg-white rounded-xl shadow-md p-6 hover-scale">
                  <div className="h-40 bg-purple-pink-gradient rounded-md mb-4 flex items-center justify-center">
                    <span className="text-white text-lg font-medium">{playlist.title}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">{playlist.title}</h3>
                      <p className="text-sm text-gray-500">{playlist.tracks} tracks · {playlist.time}</p>
                    </div>
                    <button className="bg-mindbloom-purple/10 text-mindbloom-purple p-2 rounded-full">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl font-bold mb-6">The Science of Music and Mental Health</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  Research has shown that music can have significant benefits for mental health. It can reduce stress hormones, lower blood pressure, and even alleviate pain.
                </p>
                <p>
                  Different types of music affect us in different ways. Slow, calming music around 60 beats per minute can help induce a relaxation response, while upbeat music can boost mood and energy levels.
                </p>
                <p>
                  Music therapy is a well-established field that uses these effects therapeutically. Even without formal therapy, creating personal playlists for different emotional needs can be a powerful self-care strategy.
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

export default SongRecommendations;
