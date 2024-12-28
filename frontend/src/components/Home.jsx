import { useState, useEffect } from "react";
import axios from "axios";

const Home = () => {
    const [message, setMessage] = useState('')
    const [audioFiles, setAudioFiles] = useState([])
  useEffect(() => {
    axios
    .get('http://127.0.0.1:8000/api/message/')
    .then((response) => {
      setMessage(response.data.message)
    });

    axios
    .get('http://127.0.0.1:8000/api/audio/')
    .then((response) => {
        setAudioFiles(response.data)
    });
  }, []);

  const handleAudioPlayPause = (audioElement) => {
    if (audioElement.paused) {
        audioElement.play();
    } else {
        audioElement.pause();
    }
};

return (
    <div>
        <h1>Home</h1>
        <p>{message}</p>
        <ul>
            {audioFiles.map((audio, index) => (
                <li key={index}>
                    <p>{audio.title}</p>
                    <img
                        src={audio.image_url}
                        alt={audio.title}
                        style={{ cursor: "pointer", width: "100px" }}
                        onClick={() => {
                            const audioElement = document.getElementById(`audio-${index}`);
                            handleAudioPlayPause(audioElement);
                        }}
                    />
                    <audio id={`audio-${index}`} src={audio.audio_url} />
                </li>
            ))}
        </ul>
    </div>
);

}

export default Home;
