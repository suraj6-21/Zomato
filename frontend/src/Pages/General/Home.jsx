import React from 'react';
import './Home.css'; 

// Mock Data (Replace with your API data later)
const VIDEO_DATA = [
  {
    id: 1,
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-girl-in-neon-sign-1232-large.mp4",
    description: "Check out this amazing neon vibe! 🌟 It's perfect for night shoots and creates a cool atmosphere. #neon #vibes",
    storeLink: "/store/neon-vibes"
  },
  {
    id: 2,
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-tree-with-yellow-flowers-1173-large.mp4",
    description: "Spring is here and the flowers are blooming. 🌸 This is a very long description to test the truncation feature. It should cut off after two lines so it doesn't block the video view.",
    storeLink: "/store/spring-collection"
  },
  {
    id: 3,
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-serving-dinner-to-guests-at-a-restaurant-435-large.mp4",
    description: "Delicious food served fresh daily! 🍔🍟 Come visit us.",
    storeLink: "/store/burger-joint"
  }
];

const VideoCard = ({ data }) => {
  return (
    <div className="reel-container">
      {/* The Background Video */}
      <video 
        className="reel-video"
        src={data.videoUrl}
        autoPlay 
        loop 
        muted 
        playsInline // Important for mobile
      />

      {/* The Overlay Content */}
      <div className="reel-overlay">
        <div className="reel-content">
          <p className="description">{data.description}</p>
          <button 
            className="store-button"
            onClick={() => alert(`Navigating to: ${data.storeLink}`)}
          >
            Visit Store 🛍️
          </button>
        </div>
      </div>
    </div>
  );
};

const Home = () => {
  return (
    <div className="feed-container">
      {VIDEO_DATA.map((video) => (
        <VideoCard key={video.id} data={video} />
      ))}
    </div>
  );
};

export default Home;