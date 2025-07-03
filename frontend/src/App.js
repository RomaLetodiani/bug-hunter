import React from 'react';
import './App.css';
import { 
  Navbar, 
  Hero, 
  AboutPodcast, 
  MeetHosts, 
  LatestEpisodes, 
  ListenEverywhere, 
  Footer 
} from './components';

function App() {
  return (
    <div className="App">
      <div className="min-h-screen bg-gray-900 text-white">
        <Navbar />
        <Hero />
        <AboutPodcast />
        <MeetHosts />
        <LatestEpisodes />
        <ListenEverywhere />
        <Footer />
      </div>
    </div>
  );
}

export default App;