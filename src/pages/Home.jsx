import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      

      {/* Main Content */}
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-teal-50 to-blue-50 py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800">Aspire Career Consultancy</h1>
            <h2 className="text-2xl md:text-3xl font-semibold mb-8 text-teal-600">Unlocking Opportunities, One Career at a Time</h2>
            <p className="text-xl max-w-3xl mx-auto mb-8 text-gray-600">
              At Aspire Career Consultancy, we aim to empower individuals on their professional journeys. Our team of experts provides career advice and connects you with opportunities that align with your aspirations.
            </p>
            <div className="flex justify-center space-x-4">
              <Link to="/register" className="px-8 py-3 bg-orange-500 text-white font-bold rounded-full hover:bg-orange-600 transition shadow-md">
                Get Started
              </Link>
              <Link to="/services" className="px-8 py-3 border border-teal-500 text-teal-600 font-bold rounded-full hover:bg-teal-50 transition">
                Learn More
              </Link>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Our Services</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Repeatable Feature Cards */}
              {[
                {
                  title: "Quick Registration",
                  desc: "Simple registration process to start your career journey quickly.",
                  iconColor: "bg-teal-100 text-teal-600",
                  svgPath: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                },
                {
                  title: "Job Posting",
                  desc: "Efficient job posting and management for employers.",
                  iconColor: "bg-blue-100 text-blue-600",
                  svgPath: "M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                },
                {
                  title: "Application Tracking",
                  desc: "Streamlined tracking of candidate applications.",
                  iconColor: "bg-purple-100 text-purple-600",
                  svgPath: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                },
                {
                  title: "Instant Response",
                  desc: "Real-time communication between employers and candidates.",
                  iconColor: "bg-orange-100 text-orange-600",
                  svgPath: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                }
              ].map(({ title, desc, iconColor, svgPath }) => (
                <div key={title} className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition hover:border-teal-200">
                  <div className={`w-12 h-12 ${iconColor} rounded-full flex items-center justify-center mb-4`}>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={svgPath}></path>
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-800">{title}</h3>
                  <p className="text-gray-600">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="py-16 bg-gradient-to-br from-blue-50 to-teal-50">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row items-center">
              <div className="lg:w-1/2 mb-8 lg:mb-0 lg:pr-12">
                <h2 className="text-3xl font-bold mb-6 text-gray-800">About Us</h2>
                <p className="text-gray-700 mb-6">
                  We are here to help you grow. Our mission is to empower individuals on their professional journeys through expert advice and opportunity matching.
                </p>
                <div className="space-y-6">
                  <div className="bg-white p-5 rounded-lg shadow-sm">
                    <h3 className="text-xl font-bold text-teal-600 mb-2">Our Mission</h3>
                    <p className="text-gray-600">
                      To help everyone find a fulfilling career path through expert advice, skill development, and networking.
                    </p>
                  </div>
                  <div className="bg-white p-5 rounded-lg shadow-sm">
                    <h3 className="text-xl font-bold text-teal-600 mb-2">Our Vision</h3>
                    <p className="text-gray-600">
                      Empowering individuals to achieve professional dreams through personalized guidance and resources.
                    </p>
                  </div>
                </div>
              </div>
              <div className="lg:w-1/2 bg-white h-64 lg:h-96 rounded-lg shadow-md overflow-hidden flex items-center justify-center bg-gradient-to-r from-teal-100 to-blue-100">
                <svg className="w-32 h-32 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                </svg>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-8 text-gray-800">Ready to Transform Your Career?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
              Join thousands who've found their dream careers through our consultancy.
            </p>
            <Link to="/register" className="inline-block px-8 py-3 bg-orange-500 text-white font-bold rounded-full hover:bg-orange-600 transition shadow-md">
              Start Your Journey Today
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      
    </div>
  );
}

export default Home;
