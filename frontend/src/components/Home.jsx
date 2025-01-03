import { useState, useEffect, useRef } from "react";
import axios from "axios";

const Home = () => {
  const [message, setMessage] = useState("");
  const [audioFiles, setAudioFiles] = useState([]);
  const [categories, setCategories] = useState([]); // State for categories
  const [selectedCategory, setSelectedCategory] = useState("All"); // State for selected category
  const [playingIndex, setPlayingIndex] = useState(null); // New state for playing index
  const [links, setLinks] = useState([]);

  const audioRefs = useRef([]);

  useEffect(() => {
    // Fetch message
    axios
      // .get("http://127.0.0.1:8000/api/message/")

      .get("http://172.16.11.199:8000/api/message/")
      .then((response) => {
        setMessage(response.data.message);
      })
      .catch((error) => {
        console.error("Error fetching message:", error);
      });

    // Fetch categories
    axios
      .get("http://172.16.11.199:8000/api/categories/")
      .then((response) => {
        setCategories([{ name: "All" }, ...response.data]); // Include "All" as a default option
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });

    // Fetch audio files
    fetchAudioFiles();

    // Fetch links
    axios
      .get("http://172.16.11.199:8000/api/links/")
      .then((response) => {
        setLinks(response.data);
      })
      .catch((error) => {
        console.error("Error fetching links:", error);
      });
  }, []);

  const fetchAudioFiles = (category = null) => {
    let url = "http://172.16.11.199:8000/api/audio/";
    if (category && category !== "All") {
      url += `?category=${category}`;
    }

    axios
      .get(url)
      .then((response) => {
        setAudioFiles(response.data);
        audioRefs.current = response.data.map(() => null); // Initialize refs
      })
      .catch((error) => {
        console.error("Error fetching audio files:", error);
      });
  };

  const handleAudioPlayPause = (index) => {
    // Pause any currently playing audio
    if (playingIndex !== null && playingIndex !== index) {
      const currentPlayingAudio = audioRefs.current[playingIndex];
      if (currentPlayingAudio) {
        currentPlayingAudio.pause();
        currentPlayingAudio.currentTime = 0; // Reset to the start
      }
    }

    // Handle play/pause for the clicked audio
    const clickedAudio = audioRefs.current[index];
    if (clickedAudio) {
      if (clickedAudio.paused) {
        clickedAudio.play();
        setPlayingIndex(index); // Set the new playing index
      } else {
        clickedAudio.pause();
        setPlayingIndex(null); // Reset the playing index
      }
    }
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    fetchAudioFiles(category);
  };

  return (
    <div>
      <p className="home-message">{message}</p>

      {/* Category Filter */}
      <div className="category-filter">
        <select
          value={selectedCategory}
          onChange={(e) => handleCategoryChange(e.target.value)}
        >
          {categories.map((category, index) => (
            <option key={index} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      {/* Audio Files */}
      <ul className="image-list">
        {audioFiles.map((audio, index) => (
          <li key={index}>
            <div
              className={`image-container ${
                playingIndex === index ? "playing" : ""
              }`}
              onClick={() => handleAudioPlayPause(index)}
            >
              <img src={audio.image_url} alt={audio.title} />
              <div className={`overlay ${playingIndex === index ? "active" : ""}`}>
                <h3>{audio.title}</h3>
                <div className="description-container">
                  <p>{audio.description}</p>
                </div>
              </div>
            </div>
            {/* Hidden audio element */}
            <audio
              ref={(el) => (audioRefs.current[index] = el)}
              src={audio.audio_url}
            />
            <a
              href={audio.audio_url}
              download={audio.title}
              className="download-button"
            >
              Download
            </a>
          </li>
        ))}
      </ul>

      {/* Display Links */}
      <ul className="links-container">
        {links.map((link, index) => (
          <li key={index}>
            <a href={link.url}>{link.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
