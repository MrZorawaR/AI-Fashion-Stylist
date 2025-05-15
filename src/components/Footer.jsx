import { Link } from 'react-router-dom';
import { Scissors, Instagram, Twitter, Facebook } from 'lucide-react';

function Footer() {
  return (
    <footer className="w-full border-t bg-[#FCE4EC] animate-fade-in">
      <div className="container px-10 py-5">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 animate-slide-in-up">
          <div className="space-y-3 transition-all duration-700">
            <div className="flex items-center space-x-2">
              <Scissors className="h-5 w-5 text-[#D81B60]" />
              <span className="text-lg font-bold text-[#D81B60]">AI Fashion Stylist</span>
            </div>
            <p className="text-sm text-neutral-600">
              Get personalized fashion recommendations based on your body type.
            </p>
          </div>

          <div className="transition-opacity duration-700 delay-100">
            <h4 className="text-sm font-semibold mb-4 text-[#D81B60]">Pages</h4>
            <ul className="space-y-2">
              {['/', '/analysis', '/history'].map((path, i) => {
                const label = ['Home', 'Style Analysis', 'History'][i];
                return (
                  <li key={path}>
                    <Link
                      to={path}
                      className="text-sm text-neutral-600 hover:text-[#D81B60] transition-colors"
                    >
                      {label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="transition-opacity duration-700 delay-150">
            <h4 className="text-sm font-semibold mb-4 text-[#D81B60]">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/privacy" className="text-sm text-neutral-600 hover:text-[#D81B60] transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-sm text-neutral-600 hover:text-[#D81B60] transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          <div className="transition-transform duration-700 delay-200">
            <h4 className="text-sm font-semibold mb-4 text-[#D81B60]">Connect</h4>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-neutral-600 hover:text-[#D81B60] transition-colors transform hover:scale-110"
              >
                <Instagram className="h-6 w-6" />
                <span className="sr-only">Instagram</span>
              </a>
              <a
                href="#"
                className="text-neutral-600 hover:text-[#D81B60] transition-colors transform hover:scale-110"
              >
                <Facebook className="h-6 w-6" />
                <span className="sr-only">Facebook</span>
              </a>
              <a
                href="#"
                className="text-neutral-600 hover:text-[#D81B60] transition-colors transform hover:scale-110"
              >
                <Twitter className="h-6 w-6" />
                <span className="sr-only">Twitter</span>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t text-center text-sm text-neutral-600 animate-fade-in-up">
          &copy; {new Date().getFullYear()} AI Fashion Stylist. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
