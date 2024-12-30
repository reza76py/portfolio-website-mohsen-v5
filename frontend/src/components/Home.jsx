import { useState, useEffect, useRef } from "react";
import axios from "axios";

const Home = () => {
  const [message, setMessage] = useState("");
  const [audioFiles, setAudioFiles] = useState([]);
  const audioRefs = useRef([]);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/message/").then((response) => {
      setMessage(response.data.message);
    });

    axios.get("http://127.0.0.1:8000/api/audio/").then((response) => {
      setAudioFiles(response.data);
      audioRefs.current = response.data.map(() => null); // Initialize refs
    });
  }, []);

  const handleAudioPlayPause = (index) => {
    const currentAudio = audioRefs.current[index];
    if (currentAudio) {
      if (currentAudio.paused) {
        currentAudio.play();
      } else {
        currentAudio.pause();
      }
    }
  };

  return (
    <div>
      
      <p>{message}</p>
      <ul className="image-list">
        {audioFiles.map((audio, index) => (
          <li key={index}>
            <div
              className="image-container"
              onClick={() => handleAudioPlayPause(index)}
            >
              <img src={audio.image_url} alt={audio.title} />
              <div className="overlay">
                <h3>{audio.title}</h3>
                <p>{audio.description}</p>
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
