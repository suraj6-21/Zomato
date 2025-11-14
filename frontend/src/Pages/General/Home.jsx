import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Home.css";

const demoData = [
  {
    _id: "demo-1",
    name: "fish",
    video: "https://www.pexels.com/download/video/9984058/",
    description: "Chopsticks Picking Up Chicken Fillet from Bowl",
    foodPartner: "demo-partner",
  },
  {
    _id: "demo-2",
    name: "fish",
    video: "https://www.pexels.com/download/video/32848584/",
    description: "Delicious Fluffy Pancakes with Syrup",
    foodPartner: "demo-partner",
  },
  {
    _id: "demo-3",
    name: "fish",
    video: "https://www.pexels.com/download/video/4551939/",
    description: "A man cooking food on a large bbq grill",
    foodPartner: "demo-partner",
  },
  {
    _id: "demo-4",
    name: "fish",
    video: "https://www.pexels.com/download/video/34355143/",
    description: "Juicy Chicken Barbecue on Flames",
    foodPartner: "demo-partner",
  },
  {
    _id: "demo-5",
    name: "fish",
    video: "https://www.pexels.com/download/video/4253149/",
    description: "JA person stirring noodles in a pan on a stove",
    foodPartner: "demo-partner",
  },
  {
    _id: "demo-6",
    name: "fish",
    video: "https://www.pexels.com/download/video/12920455/",
    description: "Close up of Cooking Steak on Grill Pan",
    foodPartner: "demo-partner",
  },
  {
    _id: "demo-7",
    name: "fish",
    video: "https://www.pexels.com/download/video/4058071/",
    description: "Using Fork To Eat Spaghetti Bolognese",
    foodPartner: "demo-partner",
  },
  {
    _id: "demo-8",
    name: "fish",
    video: "https://www.pexels.com/download/video/11131969/",
    description: "Close-up of Cooking Meat in Frying Pan",
    foodPartner: "demo-partner",
  },
  {
    _id: "demo-9",
    name: "fish",
    video: "https://www.pexels.com/download/video/30627970/",
    description: "Sliced Neapolitan Margherita Pizza on Wooden Board",
    foodPartner: "demo-partner",
  },
  {
    _id: "demo-10",
    name: "fish",
    video: "https://www.pexels.com/download/video/9484987/",
    description: "Chicken Barbecue and Broccoli on a Rice Bowl",
    foodPartner: "demo-partner",
  },
];

const Home = () => {
  const [videos, setVideos] = useState([]);
  const videoRefs = useRef(new Map());
  const navigate = useNavigate();

  const setVideoRef = (id) => (el) => {
    if (el) videoRefs.current.set(id, el);
  };

  useEffect(() => {
    axios
    // .get("http://localhost:3000/api/food/", { withCredentials: true })
      .get("http://localhost:000/api/food/", { withCredentials: true })
      .then((response) => {
        console.log("Fetched food data:", response.data);

        if (
          response.data &&
          Array.isArray(response.data.foodItems) &&
          response.data.foodItems.length > 0
        ) {
          setVideos(response.data.foodItems);
        } else {
          console.warn("API returned empty list. Using demo data.");
          setVideos(demoData);
        }
      })
      .catch((error) => {
        console.error("Error fetching food data:", error);
        setVideos(demoData); // fallback when API fails
      });
  }, []);

  // 👇 PLAY/PAUSE VIDEO WHEN IN VIEW
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target;

          if (entry.isIntersecting) {
            video.play();      // ▶️ Play when visible
          } else {
            video.pause();     // ⏸ Pause when hidden
            video.currentTime = 0; // optional: reset to start
          }
        });
      },
      { threshold: 0.65 } // play only when 65% visible
    );

    // attach observer to each video
    videoRefs.current.forEach((video) => {
      if (video) observer.observe(video);
    });

    return () => observer.disconnect();
  }, [videos]);


  return (
    <div className="feed-container">
      {videos.map((video) => (
        <div key={video._id} className="reel-container">
          <video
            className="reel-video"
            ref={setVideoRef(video._id)}
            src={video.video}
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
          />

          <div className="reel-overlay">
            <div className="reel-content">
              <p className="description">{video.description}</p>

              <button
                className="store-button"
                onClick={() => navigate(`/food-partner/${video.foodPartner}`)}
              >
                Visit Store 🛍️
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Home;
