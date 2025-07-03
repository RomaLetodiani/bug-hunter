import React, { useState } from 'react';

// Navbar Component
export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full bg-gray-900 bg-opacity-95 backdrop-blur-sm z-50 py-4 px-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-br from-teal-400 to-emerald-500 rounded-lg flex items-center justify-center">
            <span className="text-black font-bold text-lg">G</span>
          </div>
          <span className="text-xl font-semibold">GameTherapy</span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <a href="#media" className="text-gray-300 hover:text-teal-400 transition-colors">Media</a>
          <a href="#episodes" className="text-gray-300 hover:text-teal-400 transition-colors">Episodes</a>
          <a href="#about" className="text-gray-300 hover:text-teal-400 transition-colors">About</a>
          <a href="#live" className="text-gray-300 hover:text-teal-400 transition-colors">Live Stream</a>
        </div>

        {/* Join Now Button */}
        <button className="hidden md:block bg-teal-500 hover:bg-teal-600 text-white px-6 py-2 rounded-lg transition-colors">
          Join Now
        </button>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden mt-4 py-4 border-t border-gray-700">
          <div className="flex flex-col space-y-4 px-6">
            <a href="#media" className="text-gray-300 hover:text-teal-400">Media</a>
            <a href="#episodes" className="text-gray-300 hover:text-teal-400">Episodes</a>
            <a href="#about" className="text-gray-300 hover:text-teal-400">About</a>
            <a href="#live" className="text-gray-300 hover:text-teal-400">Live Stream</a>
            <button className="bg-teal-500 text-white px-6 py-2 rounded-lg w-fit">Join Now</button>
          </div>
        </div>
      )}
    </nav>
  );
};

// Hero Component
export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gray-900 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg" 
          alt="Gaming Setup Background"
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-transparent to-gray-900"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 pt-20">
        {/* Logo */}
        <div className="flex items-center justify-center mb-8">
          <div className="w-24 h-24 bg-gradient-to-br from-teal-400 to-emerald-500 rounded-2xl flex items-center justify-center mb-4">
            <span className="text-black font-bold text-4xl">G</span>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-6xl md:text-8xl font-bold mb-6 tracking-tight">
          <span className="text-white">Game</span>
          <span className="text-teal-400">Therapy</span>
        </h1>

        {/* Tagline */}
        <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-2xl mx-auto">
          Therapy for gamers, one level at a time
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <button className="bg-teal-500 hover:bg-teal-600 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all transform hover:scale-105 flex items-center space-x-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
            </svg>
            <span>Listen Now</span>
          </button>
          
          <button className="border border-teal-500 text-teal-400 hover:bg-teal-500 hover:text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all flex items-center space-x-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
            <span>YouTube</span>
          </button>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          <button className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-3 rounded-lg transition-colors flex items-center justify-center space-x-2">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
            </svg>
            <span className="text-sm">All Episodes</span>
          </button>
          
          <button className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-3 rounded-lg transition-colors flex items-center justify-center space-x-2">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
            <span className="text-sm">Meet Streamers</span>
          </button>
          
          <button className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-3 rounded-lg transition-colors flex items-center justify-center space-x-2">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 8a6 6 0 01-7.743 5.743L10 14l-2.257.743A6 6 0 0118 8zM2 8a8 8 0 1016 0 8 8 0 00-16 0zm8-6a6 6 0 00-4.472 10.024L6 12l.528-.026A6 6 0 0010 2z" clipRule="evenodd" />
            </svg>
            <span className="text-sm">Gaming Memes</span>
          </button>
          
          <button className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-3 rounded-lg transition-colors flex items-center justify-center space-x-2">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
            </svg>
            <span className="text-sm">Gaming Events</span>
          </button>
        </div>
      </div>
    </section>
  );
};

// About Podcast Component
export const AboutPodcast = () => {
  return (
    <section id="about" className="py-20 px-4 bg-gray-900">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-teal-400">
            About the Podcast
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            GameTherapy is where gamers come to decompress, learn and connect. We 
            explore every aspect of gaming culture - from in-depth game reviews 
            to mental health in gaming communities to breakthrough gaming moments.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Gaming Deep Dives */}
          <div className="bg-gray-800 rounded-xl p-8 text-center hover:bg-gray-750 transition-colors">
            <div className="w-16 h-16 bg-teal-500 rounded-lg flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-4 text-white">Gaming Deep Dives</h3>
            <p className="text-gray-400">
              Explore cutting-edge game mechanics, 
              development insights and tips as we 
              dive deep into the games that shape our 
              world.
            </p>
          </div>

          {/* Mental Health Focus */}
          <div className="bg-gray-800 rounded-xl p-8 text-center hover:bg-gray-750 transition-colors">
            <div className="w-16 h-16 bg-teal-500 rounded-lg flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-4 text-white">Mental Health Focus</h3>
            <p className="text-gray-400">
              Addressing burnout, stress and the 
              psychological aspects of being a 
              gamer in today's competitive gaming 
              landscape.
            </p>
          </div>

          {/* Gaming Culture */}
          <div className="bg-gray-800 rounded-xl p-8 text-center hover:bg-gray-750 transition-colors">
            <div className="w-16 h-16 bg-teal-500 rounded-lg flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-4 text-white">Gaming Culture</h3>
            <p className="text-gray-400">
              Real talk about gaming work, team 
              dynamics, competitive gaming and building 
              sustainable careers in the gaming 
              industry.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

// Meet Hosts Component
export const MeetHosts = () => {
  const hosts = [
    {
      name: "Alex Chen",
      title: "Pro Gamer & Mental Health Advocate",
      description: "Former competitive esports player with 10+ years experience in CS:GO and League of Legends. Now focuses on mental health in gaming.",
      image: "https://images.pexels.com/photos/9072311/pexels-photo-9072311.jpeg",
      linkedin: "#"
    },
    {
      name: "Maya Rodriguez", 
      title: "Gaming Content Creator & Wellness Coach",
      description: "Popular Twitch streamer and content creator specializing in healthy gaming habits and community building.",
      image: "https://images.pexels.com/photos/31987226/pexels-photo-31987226.jpeg",
      linkedin: "#"
    }
  ];

  return (
    <section className="py-20 px-4 bg-gray-850">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Meet Your Hosts
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
          {hosts.map((host, index) => (
            <div key={index} className="text-center">
              <div className="relative mb-6">
                <img 
                  src={host.image}
                  alt={host.name}
                  className="w-48 h-48 rounded-full mx-auto object-cover border-4 border-teal-500"
                />
              </div>
              <h3 className="text-2xl font-bold mb-2 text-white">{host.name}</h3>
              <p className="text-teal-400 font-semibold mb-4">{host.title}</p>
              <p className="text-gray-400 mb-6 leading-relaxed">{host.description}</p>
              <a 
                href={host.linkedin}
                className="inline-flex items-center space-x-2 text-teal-400 hover:text-teal-300 transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                <span>LinkedIn</span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Latest Episodes Component
export const LatestEpisodes = () => {
  const episodes = [
    {
      title: "GameTherapy #50 - Esports Mental Health with Dr. Sarah Kim",
      description: "In this episode, we discuss the mental health challenges facing professional esports players and strategies for managing performance anxiety.",
      thumbnail: "https://images.pexels.com/photos/13929795/pexels-photo-13929795.jpeg",
      views: "45K views",
      timeAgo: "2 days ago"
    },
    {
      title: "GameTherapy #49 - The Future of Gaming: VR and Mental Wellness",
      description: "Exploring how virtual reality gaming affects our mental state and the therapeutic potential of immersive gaming experiences.",
      thumbnail: "https://images.pexels.com/photos/7862495/pexels-photo-7862495.jpeg", 
      views: "67K views",
      timeAgo: "1 week ago"
    },
    {
      title: "GameTherapy #48 - Building Healthy Gaming Communities",
      description: "Discussion with community managers about creating positive, inclusive gaming environments that support mental health.",
      thumbnail: "https://images.pexels.com/photos/32772105/pexels-photo-32772105.jpeg",
      views: "38K views", 
      timeAgo: "2 weeks ago"
    },
    {
      title: "GameTherapy #47 - From Gaming Addiction to Gaming Balance",
      description: "Personal stories and expert advice on recognizing gaming addiction and developing a healthier relationship with gaming.",
      thumbnail: "https://images.unsplash.com/photo-1614179924047-e1ab49a0a0cf",
      views: "92K views",
      timeAgo: "3 weeks ago"
    }
  ];

  return (
    <section id="episodes" className="py-20 px-4 bg-gray-900">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-teal-400">
            Latest Episodes
          </h2>
          <p className="text-xl text-gray-300">
            Fresh conversations about gaming, culture, and mental health in gaming.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {episodes.map((episode, index) => (
            <div key={index} className="bg-gray-800 rounded-xl overflow-hidden hover:bg-gray-750 transition-colors group cursor-pointer">
              <div className="relative">
                <img 
                  src={episode.thumbnail}
                  alt={episode.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                <div className="absolute top-4 left-4 bg-teal-500 text-white px-3 py-1 rounded-lg text-sm font-semibold">
                  GameTherapy
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-3 text-white line-clamp-2">
                  {episode.title}
                </h3>
                <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                  {episode.description}
                </p>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>{episode.views}</span>
                  <span>{episode.timeAgo}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <button className="bg-teal-500 hover:bg-teal-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
            View All Episodes
          </button>
        </div>
      </div>
    </section>
  );
};

// Listen Everywhere Component  
export const ListenEverywhere = () => {
  const platforms = [
    { name: "YouTube", color: "bg-red-600", icon: "M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" },
    { name: "Spotify", color: "bg-green-500", icon: "M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.42 1.56-.299.421-1.02.599-1.559.3z" },
    { name: "Apple Podcasts", color: "bg-purple-600", icon: "M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987s11.987-5.367 11.987-11.987C24.004 5.367 18.637.001 12.017.001zM8.218 20.273c-1.431 0-2.593-1.162-2.593-2.593s1.162-2.593 2.593-2.593 2.593 1.162 2.593 2.593-1.162 2.593-2.593 2.593zm7.899-6.273c0 3.440-2.796 6.236-6.236 6.236s-6.236-2.796-6.236-6.236 2.796-6.236 6.236-6.236 6.236 2.796 6.236 6.236z" },
    { name: "Discord", color: "bg-indigo-600", icon: "M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419-.0189 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1568 2.4189Z" },
    { name: "Twitch", color: "bg-purple-500", icon: "M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714Z" },
    { name: "SoundCloud", color: "bg-orange-500", icon: "M1.175 13.016c-.107 0-.175.068-.175.175v2.883c0 .107.068.175.175.175s.175-.068.175-.175v-2.883c0-.107-.068-.175-.175-.175zm1.718-.175c-.117 0-.214.097-.214.214v3.251c0 .117.097.214.214.214s.214-.097.214-.214v-3.251c0-.117-.097-.214-.214-.214zm1.718-.097c-.127 0-.233.106-.233.233v3.465c0 .127.106.233.233.233s.233-.106.233-.233v-3.465c0-.127-.106-.233-.233-.233z" }
  ];

  return (
    <section className="py-20 px-4 bg-gray-850">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-teal-400">
            Listen Everywhere
          </h2>
          <p className="text-xl text-gray-300">
            Choose your preferred platform and never miss an episode.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {platforms.map((platform, index) => (
            <a 
              key={index}
              href="#"
              className={`${platform.color} hover:opacity-90 text-white p-6 rounded-xl transition-all transform hover:scale-105 flex flex-col items-center justify-center space-y-3 h-32`}
            >
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d={platform.icon} />
              </svg>
              <span className="font-semibold text-center">{platform.name}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

// Footer Component
export const Footer = () => {
  return (
    <footer className="bg-gray-900 py-12 px-4 border-t border-gray-800">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2 mb-6 md:mb-0">
            <div className="w-8 h-8 bg-gradient-to-br from-teal-400 to-emerald-500 rounded-lg flex items-center justify-center">
              <span className="text-black font-bold text-lg">G</span>
            </div>
            <span className="text-xl font-semibold text-white">GameTherapy</span>
          </div>

          {/* Social Links */}
          <div className="flex items-center space-x-6 mb-6 md:mb-0">
            <a href="#" className="text-gray-400 hover:text-teal-400 transition-colors">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </a>
            <a href="#" className="text-gray-400 hover:text-teal-400 transition-colors">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419-.0189 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1568 2.4189Z"/>
              </svg>
            </a>
            <a href="#" className="text-gray-400 hover:text-teal-400 transition-colors">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
              </svg>
            </a>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 mt-8 text-center">
          <p className="text-gray-400 text-sm">
            © 2025 GameTherapy. All rights reserved. Therapy for gamers, one bug at a time.
          </p>
        </div>
      </div>
    </footer>
  );
};