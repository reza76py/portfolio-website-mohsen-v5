import { useState, useEffect, useRef } from "react";
import axios from "axios";

const Home = () => {
  const [message, setMessage] = useState("");
  const [audioFiles, setAudioFiles] = useState([]);
  const [playingIndex, setPlayingIndex] = useState(null); // New state for playing index

  const audioRefs = useRef([]);

  useEffect(() => {
    axios.get("http://172.16.11.199:8000/api/message/").then((response) => {
      setMessage(response.data.message);
    });

    axios.get("http://172.16.11.199:8000/api/audio/").then((response) => {
      setAudioFiles(response.data);
      audioRefs.current = response.data.map(() => null); // Initialize refs
    });
  }, []);

  // const handleAudioPlayPause = (index) => {
  //   const currentAudio = audioRefs.current[index];
  //   if (currentAudio) {
  //     if (currentAudio.paused) {
  //       currentAudio.play();
  //       setPlayingIndex(index); // Set the playing index
  //     } else {
  //       currentAudio.pause();
  //       setPlayingIndex(null); // Reset the playing index
  //     }
  //   }
  // };
  

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
  




  return (
    <div>
      
      <p className="home-message">{message}</p>
      <ul className="image-list">
        {audioFiles.map((audio, index) => (
          <li key={index}>
            <div
              className={"image-container ${playingIndex === index ? 'playing' : ''}"}
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
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
