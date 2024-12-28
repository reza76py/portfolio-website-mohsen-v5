// import { useState, useEffect } from "react";
// import axios from "axios";

// const Home = () => {
//     const [message, setMessage] = useState('')
//     const [audioFiles, setAudioFiles] = useState([])
//   useEffect(() => {
//     axios
//     .get('http://127.0.0.1:8000/api/message/')
//     .then((response) => {
//       setMessage(response.data.message)
//     });

//     axios
//     .get('http://127.0.0.1:8000/api/audio/')
//     .then((response) => {
//         setAudioFiles(response.data)
//     });
//   }, []);

//   const handleAudioPlayPause = (audioElement) => {
//     if (audioElement.paused) {
//         audioElement.play();
//     } else {
//         audioElement.pause();
//     }
// };

// return (
//     <div>
//         <h1>Home</h1>
//         <p>{message}</p>
//         <ul>
//             {audioFiles.map((audio, index) => (
//                 <li key={index}>
//                     <p>{audio.title}</p>
//                     <img
//                         src={audio.image_url}
//                         alt={audio.title}
//                         style={{ cursor: "pointer", width: "100px" }}
//                         onClick={() => {
//                             const audioElement = document.getElementById(`audio-${index}`);
//                             handleAudioPlayPause(audioElement);
//                         }}
//                     />
//                     <audio id={`audio-${index}`} src={audio.audio_url} />
//                 </li>
//             ))}
//         </ul>
//     </div>
// );

// }

// export default Home;












// import { useState, useEffect } from "react";
// import axios from "axios";

// const Home = () => {
//   const [message, setMessage] = useState("");
//   const [audioFiles, setAudioFiles] = useState([]);

//   useEffect(() => {
//     axios.get("http://127.0.0.1:8000/api/message/").then((response) => {
//       setMessage(response.data.message);
//     });

//     axios.get("http://127.0.0.1:8000/api/audio/").then((response) => {
//       setAudioFiles(response.data);
//     });
//   }, []);

//   return (
//     <div>
//       <h1>Home</h1>
//       <p>{message}</p>
//       <ul style={{ listStyleType: "none", padding: 0 }}>
//         {audioFiles.map((audio, index) => (
//           <li key={index} style={{ margin: "20px" }}>
//             <div className="image-container">
//               <img src={audio.image_url} alt={audio.title} />
//               <div className="overlay">
//                 <h3>{audio.title}</h3>
//                 <p>{audio.description}</p>
//               </div>
//             </div>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Home;








import { useState, useEffect, useRef } from "react";
import axios from "axios";

const Home = () => {
  const [message, setMessage] = useState("");
  const [audioFiles, setAudioFiles] = useState([]);
  const audioRefs = useRef([]); // Use refs to manage audio elements

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
      <h1>Home</h1>
      <p>{message}</p>
      <ul style={{ listStyleType: "none", padding: 0 }}>
        {audioFiles.map((audio, index) => (
          <li key={index} style={{ margin: "20px" }}>
            <div
              className="image-container"
              onClick={() => handleAudioPlayPause(index)} // Play/pause audio on image click
            >
              <img src={audio.image_url} alt={audio.title} />
              <div className="overlay">
                <h3>{audio.title}</h3>
                <p>{audio.description}</p>
              </div>
            </div>
            {/* Hidden audio element */}
            <audio ref={(el) => (audioRefs.current[index] = el)} src={audio.audio_url} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
