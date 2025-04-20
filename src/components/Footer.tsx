import { Link } from "react-router-dom";
import { Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-100 mt-12">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <span className="text-xl font-bold gradient-text">PMHS</span>
            </Link>
            <p className="text-sm text-gray-600">
              Your companion on the journey to better mental health and
              wellbeing.
            </p>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <Heart size={16} className="text-PMHS-pink" />
              <span>Made with care for your mind</span>
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-4">Pages</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/home"
                  className="text-sm text-gray-600 hover:text-PMHS-purple"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-sm text-gray-600 hover:text-PMHS-purple"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/appointment"
                  className="text-sm text-gray-600 hover:text-PMHS-purple"
                >
                  Book Appointment
                </Link>
              </li>
              <li>
                <Link
                  to="/chatbot"
                  className="text-sm text-gray-600 hover:text-PMHS-purple"
                >
                  Chatbot
                </Link>
              </li>
              <li>
                <Link
                  to="/feedback"
                  className="text-sm text-gray-600 hover:text-PMHS-purple"
                >
                  Feedback
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/books"
                  className="text-sm text-gray-600 hover:text-PMHS-purple"
                >
                  Book Recommendations
                </Link>
              </li>
              <li>
                <Link
                  to="/movies"
                  className="text-sm text-gray-600 hover:text-PMHS-purple"
                >
                  Movie Recommendations
                </Link>
              </li>
              <li>
                <Link
                  to="/songs"
                  className="text-sm text-gray-600 hover:text-PMHS-purple"
                >
                  Song Recommendations
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="text-sm text-gray-600">Email: help@PMHS.com</li>
              <li className="text-sm text-gray-600">Phone: (123) 456-7890</li>
              <li className="text-sm text-gray-600">Hours: Mon-Fri 9am-5pm</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-100 mt-8 pt-6 text-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} PMHS. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
