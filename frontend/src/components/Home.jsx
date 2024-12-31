// import { useState, useEffect, useRef } from "react";
// import axios from "axios";

// const Home = () => {
//   const [message, setMessage] = useState("");
//   const [audioFiles, setAudioFiles] = useState([]);
//   const [playingIndex, setPlayingIndex] = useState(null); // New state for playing index
//   const [links, setLinks] = useState([]);

//   const audioRefs = useRef([]);

//   useEffect(() => {
//     axios.get("http://127.0.0.1:8000/api/message/").then((response) => {
//       setMessage(response.data.message);
//     });

//     axios.get("http://127.0.0.1:8000/api/audio/").then((response) => {
//       setAudioFiles(response.data);
//       audioRefs.current = response.data.map(() => null); // Initialize refs
//     });

//     axios.get("http://127.0.0.1:8000/api/links/").then((response) => {
//       setLinks(response.data);
//     });


//   }, []);

//   const handleAudioPlayPause = (index) => {
//     // Pause any currently playing audio
//     if (playingIndex !== null && playingIndex !== index) {
//       const currentPlayingAudio = audioRefs.current[playingIndex];
//       if (currentPlayingAudio) {
//         currentPlayingAudio.pause();
//         currentPlayingAudio.currentTime = 0; // Reset to the start
//       }
//     }
  
//     // Handle play/pause for the clicked audio
//     const clickedAudio = audioRefs.current[index];
//     if (clickedAudio) {
//       if (clickedAudio.paused) {
//         clickedAudio.play();
//         setPlayingIndex(index); // Set the new playing index
//       } else {
//         clickedAudio.pause();
//         setPlayingIndex(null); // Reset the playing index
//       }
//     }
//   };

//   return (
//     <div>
      
//       <p className="home-message">{message}</p>
//       <ul className="image-list">
//         {audioFiles.map((audio, index) => (
//           <li key={index}>
//             <div
//               className={"image-container ${playingIndex === index ? 'playing' : ''}"}
//               onClick={() => handleAudioPlayPause(index)}
//             >
//               <img src={audio.image_url} alt={audio.title} />
//               <div className={`overlay ${playingIndex === index ? "active" : ""}`}>
//                 <h3>{audio.title}</h3>
//                 <div className="description-container">
//                   <p>{audio.description}</p>
//                 </div>
//               </div>
//             </div>
//             {/* Hidden audio element */}
//             <audio
//               ref={(el) => (audioRefs.current[index] = el)}
//               src={audio.audio_url}
//             />
//           </li>
//         ))}
//       </ul>
//       <p>{links}</p>
//     </div>
//   );
// };

// export default Home;






import { useState, useEffect, useRef } from "react";
import axios from "axios";

const Home = () => {
  const [message, setMessage] = useState("");
  const [audioFiles, setAudioFiles] = useState([]);
  const [playingIndex, setPlayingIndex] = useState(null); // New state for playing index
  const [links, setLinks] = useState([]);

  const audioRefs = useRef([]);

  useEffect(() => {
    // Fetch message
    axios
      .get("http://127.0.0.1:8000/api/message/")
      .then((response) => {
        setMessage(response.data.message);
      })
      .catch((error) => {
        console.error("Error fetching message:", error);
      });

    // Fetch audio files
    axios
      .get("http://127.0.0.1:8000/api/audio/")
      .then((response) => {
        setAudioFiles(response.data);
        audioRefs.current = response.data.map(() => null); // Initialize refs
      })
      .catch((error) => {
        console.error("Error fetching audio files:", error);
      });

    // Fetch links
    axios
      .get("http://127.0.0.1:8000/api/links/")
      .then((response) => {
        setLinks(response.data);
      })
      .catch((error) => {
        console.error("Error fetching links:", error);
      });
  }, []);

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
              className={`image-container ${playingIndex === index ? "playing" : ""}`}
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
