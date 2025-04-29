import { Link } from "react-router-dom";

function Services() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-teal-50 to-blue-50 py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800">Our Services</h1>
          <p className="text-xl max-w-3xl mx-auto mb-8 text-gray-600">
            Comprehensive career solutions tailored to your professional needs
          </p>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Service 1 */}
            <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 hover:border-teal-200">
              <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">Job Placement</h3>
              <p className="text-gray-600 mb-4">
                Connect with top employers and find your dream job through our extensive network.
              </p>
              <Link to="/contact" className="text-teal-600 hover:text-teal-700 font-medium transition-colors">
                Learn more →
              </Link>
            </div>

            {/* Service 2 */}
            <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 hover:border-teal-200">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">Career Counseling</h3>
              <p className="text-gray-600 mb-4">
                Personalized guidance to help you make informed career decisions and achieve your goals.
              </p>
              <Link to="/contact" className="text-teal-600 hover:text-teal-700 font-medium transition-colors">
                Learn more →
              </Link>
            </div>

            {/* Service 3 */}
            <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 hover:border-teal-200">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">Resume Building</h3>
              <p className="text-gray-600 mb-4">
                Professionally crafted resumes that highlight your skills and attract employers.
              </p>
              <Link to="/contact" className="text-teal-600 hover:text-teal-700 font-medium transition-colors">
                Learn more →
              </Link>
            </div>

            {/* Service 4 */}
            <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 hover:border-teal-200">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">Interview Preparation</h3>
              <p className="text-gray-600 mb-4">
                Mock interviews and coaching to boost your confidence and performance.
              </p>
              <Link to="/contact" className="text-teal-600 hover:text-teal-700 font-medium transition-colors">
                Learn more →
              </Link>
            </div>

            {/* Service 5 */}
            <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 hover:border-teal-200">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">Skill Development</h3>
              <p className="text-gray-600 mb-4">
                Training programs to enhance your professional skills and marketability.
              </p>
              <Link to="/contact" className="text-teal-600 hover:text-teal-700 font-medium transition-colors">
                Learn more →
              </Link>
            </div>

            {/* Service 6 */}
            <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 hover:border-teal-200">
              <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">Networking Opportunities</h3>
              <p className="text-gray-600 mb-4">
                Connect with professionals and expand your career network.
              </p>
              <Link to="/contact" className="text-teal-600 hover:text-teal-700 font-medium transition-colors">
                Learn more →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-teal-50 to-blue-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8 text-gray-800">Ready to advance your career?</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Our experts are here to guide you every step of the way.
          </p>
          <Link 
            to="/contact" 
            className="inline-block px-8 py-3 bg-teal-600 text-white font-bold rounded-full hover:bg-teal-700 transition-colors duration-200 shadow-md"
          >
            Contact Us Today
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Services;