function About() {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-teal-50 to-blue-50 py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800">About Us</h1>
            <p className="text-xl max-w-3xl mx-auto mb-8 text-gray-600">
              Empowering careers and transforming lives through expert guidance
            </p>
          </div>
        </section>
  
        {/* About Content */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              <div className="lg:w-1/2">
                <div className="bg-gradient-to-r from-teal-100 to-blue-100 rounded-xl p-1">
                  <div className="bg-white rounded-lg overflow-hidden h-96 flex items-center justify-center">
                    <div className="text-center p-6">
                      <svg className="w-32 h-32 text-teal-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                      </svg>
                      <h3 className="text-2xl font-bold text-gray-800 mt-4">Aspire Career Consultancy</h3>
                    </div>
                  </div>
                </div>
              </div>
              <div className="lg:w-1/2">
                <h2 className="text-3xl font-bold mb-6 text-gray-800">Our Story</h2>
                <p className="text-gray-600 mb-6">
                  Founded in 2020, Aspire Career Consultancy has helped thousands of professionals achieve their career goals. 
                  What began as a small team of passionate career advisors has grown into a trusted consultancy serving clients nationwide.
                </p>
                <p className="text-gray-600 mb-8">
                  We believe that everyone deserves access to quality career guidance and opportunities. 
                  Our team combines industry expertise with personalized attention to help you navigate your professional journey.
                </p>
                
                <div className="space-y-6">
                  <div className="p-6 bg-gray-50 rounded-lg">
                    <h3 className="text-xl font-bold text-teal-600 mb-2">Our Mission</h3>
                    <p className="text-gray-600">
                      To empower individuals with the tools, knowledge, and connections needed to build fulfilling careers.
                    </p>
                  </div>
                  
                  <div className="p-6 bg-gray-50 rounded-lg">
                    <h3 className="text-xl font-bold text-teal-600 mb-2">Our Vision</h3>
                    <p className="text-gray-600">
                      A world where everyone has equal access to career opportunities and professional growth.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
  
        {/* Team Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Meet Our Team</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Team Member 1 */}
              <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-teal-100 flex items-center justify-center">
                  <svg className="w-16 h-16 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-1 text-gray-800">Sarah Johnson</h3>
                <p className="text-teal-600 font-medium mb-3">Career Advisor</p>
                <p className="text-gray-600">
                  10+ years experience in HR and career counseling across multiple industries.
                </p>
              </div>
  
              {/* Team Member 2 */}
              <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-blue-100 flex items-center justify-center">
                  <svg className="w-16 h-16 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-1 text-gray-800">Michael Chen</h3>
                <p className="text-teal-600 font-medium mb-3">Resume Specialist</p>
                <p className="text-gray-600">
                  Expert in crafting resumes that get noticed by top employers.
                </p>
              </div>
  
              {/* Team Member 3 */}
              <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-purple-100 flex items-center justify-center">
                  <svg className="w-16 h-16 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-1 text-gray-800">Priya Patel</h3>
                <p className="text-teal-600 font-medium mb-3">Interview Coach</p>
                <p className="text-gray-600">
                  Helps candidates build confidence and master interview techniques.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
  
  export default About;