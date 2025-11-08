import { useState } from 'react';
import { BackgroundGradient } from './background-gradient';

export default function ContactForm() {
  const [formStatus, setFormStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    try {
      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbzZUz-RGAVQaQdu66l8gq3mpOdguxOQN_dbY3EC4G5lZ4jjGgbwixhr3cusUsoDyr7p_g/exec",
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
      <h2 className="text-2xl sm:text-3xl py-1 font-orbitron text-center text-white animate-fadeInBottom">Contact me</h2>
      <div className="flex justify-center mt-10">
        <BackgroundGradient className="w-full  mx-auto">
          <form
            className="p-6 rounded-2xl bg-[#15161c] dark:bg-gray-800 shadow-lg animate-fadeInBottom"
            onSubmit={handleSubmit}
            style={{
              width: "100%",
              maxWidth: "400px"
            }}
            autoComplete="off"
          >
            {/* Autofill color override for Chrome etc */}
            <style jsx global>{`
              input:-webkit-autofill, textarea:-webkit-autofill {
                -webkit-box-shadow: 0 0 0 100px #374151 inset !important;
                -webkit-text-fill-color: #f3f4f6 !important;
              }
            `}</style>
            <div className="mb-4">
              <label htmlFor="name-input" className="block mb-2 text-sm font-medium text-gray-200 dark:text-white">Name</label>
              <input
                type="text"
                id="name-input"
                className="w-full p-2 text-gray-50 border border-gray-600 rounded-lg bg-gray-700 text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-100 placeholder:text-gray-400 transition duration-200"
                placeholder="Your Name"
                name="Name"
                autoComplete="name"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email-input" className="block mb-2 text-sm font-medium text-gray-200 dark:text-white">Email</label>
              <input
                type="email"
                id="email-input"
                className="w-full p-2 text-gray-50 border border-gray-600 rounded-lg bg-gray-700 text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-100 placeholder:text-gray-400 transition duration-200"
                placeholder="Your Email"
                name="Email"
                autoComplete="email"
                required
              />
            </div>
            <div className="mb-6">
              <label htmlFor="message-input" className="block mb-2 text-sm font-medium text-gray-200 dark:text-white">Message</label>
              <textarea
                id="message-input"
                className="w-full p-2 text-gray-50 border border-gray-600 rounded-lg bg-gray-700 text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-100 placeholder:text-gray-400 transition duration-200"
                rows="4"
                placeholder="Your Message"
                name="Message"
                autoComplete="off"
                required
              ></textarea>
            </div>
            <button type="submit" className="w-full bg-gradient-to-r from-cyan-500 to-red-500 text-white px-4 py-2 rounded-md hover:from-cyan-600 hover:to-red-600 transition duration-300">
              Submit
            </button>
          </form>
          {formStatus && <p className="mt-4 text-center text-green-600 dark:text-green-400">{formStatus}</p>}
        </BackgroundGradient>
      </div>
    </section>
  );
}
