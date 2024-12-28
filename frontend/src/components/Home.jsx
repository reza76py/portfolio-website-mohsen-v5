import { useState, useEffect } from "react";
import axios from "axios";

const Home = () => {
    const [message, setMessage] = useState('')
  useEffect(() => {
    axios
    .get('http://127.0.0.1:8000/api/message/')
    .then((response) => {
      setMessage(response.data.message)

    });
  }, []);

  return (
    <div>
      <h1>Home</h1>
      <p>{message}</p>
    </div>
  )

}

export default Home;
