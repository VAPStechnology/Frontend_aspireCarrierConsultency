import React from 'react'

function Footer() {
  return (
    <div>
        <footer className="bg-gray-800 text-white pt-12 pb-6">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4 text-teal-300">What We Do</h3>
              <ul className="space-y-2 text-gray-300">
                <li className="hover:text-white transition">Career Counseling</li>
                <li className="hover:text-white transition">Job Placement</li>
                <li className="hover:text-white transition">Resume Building</li>
                <li className="hover:text-white transition">Interview Prep</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4 text-teal-300">Our Partners</h3>
              <ul className="space-y-2 text-gray-300">
                <li className="hover:text-white transition">Top Employers</li>
                <li className="hover:text-white transition">Universities</li>
                <li className="hover:text-white transition">Industry Leaders</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4 text-teal-300">Our Team</h3>
              <ul className="space-y-2 text-gray-300">
                <li className="hover:text-white transition">Career Experts</li>
                <li className="hover:text-white transition">HR Professionals</li>
                <li className="hover:text-white transition">Coaches</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4 text-teal-300">Contact Us</h3>
              <p className="mb-2 text-gray-300">consultancyaspirecareer@gmail.com</p>
              <address className="text-gray-300 not-italic">
                ©2020-05B, Sanow Nagar,<br />
                HUDA Complex Area,<br />
                Hyderabad, Telangana 590035
              </address>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
            <p>© {new Date().getFullYear()} Aspire Career Consultancy. All rights reserved.</p>
          </div>
        </div>
      </footer>
      
    </div>
  )
}

export default Footer
