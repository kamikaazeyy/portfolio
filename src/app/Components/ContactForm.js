import { useState } from 'react';

export default function ContactForm() {
  const [formStatus, setFormStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    try {
      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbywETVl6nfVENm82tKF3L9lv7u5SkeYXbWdjDG7iuKJYhjE6M2td6rT3XqPcWR4Tooxtg/exec",
        { method: "POST", body: formData }
      );
      const data = await response.json();
      console.log(data);
      e.target.reset();
      setFormStatus('Message sent successfully!');
    } catch (error) {
      console.error("Error submitting form:", error);
      setFormStatus('Failed to send message. Please try again.');
    }
  };

  return (
    <section className="py-10">
      <h2 className="text-2xl sm:text-3xl py-1 font-orbitron text-center dark:text-white animate-fadeInBottom">Contact me</h2>
      <div className="mt-10 w-full max-w-md mx-auto">
        <form className="shadow-lg p-6 rounded-xl bg-white dark:bg-gray-800 animate-fadeInBottom" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
            <input type="text" id="name-input" className="w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" placeholder="Your Name" name="Name" required />
          </div>
          <div className="mb-4">
            <label htmlFor="email-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
            <input type="email" id="email-input" className="w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" placeholder="Your Email" name="Email" required />
          </div>
          <div className="mb-6">
            <label htmlFor="message-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Message</label>
            <textarea id="message-input" className="w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" rows="4" placeholder="Your Message" name="Message" required></textarea>
          </div>
          <button type="submit" className="w-full bg-gradient-to-r from-cyan-500 to-red-500 text-white px-4 py-2 rounded-md hover:from-cyan-600 hover:to-red-600 transition duration-300">Submit</button>
        </form>
        {formStatus && <p className="mt-4 text-center text-green-600 dark:text-green-400">{formStatus}</p>}
      </div>
    </section>
  );
}