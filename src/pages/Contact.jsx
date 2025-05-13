import { useState } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const validatePhone = (phone) => {
    const regex = /^[6-9]\d{9}$/;
    return regex.test(phone);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validatePhone(formData.phone)) {
      toast.error("Please enter a valid 10-digit Indian phone number.");
      return;
    }

    setLoading(true);

    try {
      await axios.post(`${BASE_URL}/api/contact/submit`, formData);
      toast.success("Message sent successfully!");
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (error) {
      console.error(error);
      toast.error("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-teal-50 to-blue-50 dark:from-gray-800 dark:to-gray-900 py-20 text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800 dark:text-white">Contact Us</h1>
          <p className="text-xl max-w-3xl mx-auto mb-8 text-gray-600 dark:text-gray-300">
            Have questions? Get in touch with our team today.
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-16 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Contact Info */}
            <div className="lg:w-1/2">
              <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">Get in Touch</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-8">
                Our team is ready to assist you with any questions about our services or your career journey.
              </p>

              <div className="space-y-6">
                {/* <div className="flex items-start">
                  <div className="bg-teal-100 dark:bg-teal-800 p-3 rounded-full mr-4">
                    <svg className="w-6 h-6 text-teal-600 dark:text-teal-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Phone</h3>
                    <p className="text-gray-600 dark:text-gray-300">+91 98765 43210</p>
                  </div>
                </div> */}

                <div className="flex items-start">
                  <div className="bg-blue-100 dark:bg-blue-800 p-3 rounded-full mr-4">
                    <svg className="w-6 h-6 text-blue-600 dark:text-blue-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Email</h3>
                    <p className="text-gray-600 dark:text-gray-300">consultancyaspire5@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-purple-100 dark:bg-purple-800 p-3 rounded-full mr-4">
                    <svg className="w-6 h-6 text-purple-600 dark:text-purple-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Address</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      ©2020-05B, Sanow Nagar,<br />
                      HUDA Complex Area,<br />
                      Hyderabad, Telangana 590035
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:w-1/2">
              <form onSubmit={handleSubmit} className="bg-gray-50 dark:bg-gray-800 p-8 rounded-xl">
                <h3 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Send us a message</h3>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 rounded-lg"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 rounded-lg"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 rounded-lg"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Message</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows="4"
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 rounded-lg"
                      required
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className={`w-full bg-teal-600 text-white font-bold py-3 px-4 rounded-lg mt-4 shadow-md transition duration-200 ${
                      loading ? "opacity-50 cursor-not-allowed" : "hover:bg-teal-700"
                    }`}
                  >
                    {loading ? "Sending..." : "Send Message"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Contact;
