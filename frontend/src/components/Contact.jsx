import { useState } from "react";
import axios from "axios";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState({ type: "", message: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset status messages
    setStatus({ type: "", message: "" });

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/contact/", formData);
      setStatus({ type: "success", message: response.data.message });
      setFormData({ name: "", email: "", subject: "", message: "" }); // Clear form on success
    } catch (error) {
      if (error.response && error.response.data) {
        // Server-side error
        const errorMsg = error.response.data.non_field_errors || "Something went wrong.";
        setStatus({ type: "error", message: errorMsg });
      } else {
        // Network or other errors
        setStatus({ type: "error", message: "Unable to send your message. Please try again later." });
      }
    }
  };

  return (
    <div className="contact-container">
      <h1>Contact Mohsen</h1>
      <p>If you have any questions, requests, or inquiries, feel free to reach out using the form below.</p>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Enter your full name"
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="Enter your email address"
          />
        </div>

        <div className="form-group">
          <label htmlFor="subject">Subject:</label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            placeholder="Enter the subject (optional)"
          />
        </div>

        <div className="form-group">
          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            placeholder="Write your message here..."
            rows="5"
          ></textarea>
        </div>

        <button type="submit" className="submit-button">
          Send Message
        </button>
      </form>

      {status.type && (
        <p className={`status-message ${status.type}`}>
          {status.message}
        </p>
      )}
    </div>
  );
};

export default Contact;
