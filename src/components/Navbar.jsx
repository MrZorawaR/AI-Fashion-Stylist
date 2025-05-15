import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Scissors } from 'lucide-react';

function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-5">
      <div className="container flex h-16 items-center">
        <Link to="/" className="flex items-center space-x-2">
          <Scissors className="h-6 w-6 text-[#D81B60]" />
          <span className="text-xl font-bold text-[#D81B60]">AI Fashion Stylist</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link to="/" className="text-sm font-medium text-[#D81B60] hover:text-[#AD1457] transition-colors">
            Home
          </Link>
          <Link to="/analysis" className="text-sm font-medium text-[#D81B60] hover:text-[#AD1457] transition-colors">
            Style Analysis
          </Link>
          <Link to="/about" className="text-sm font-medium text-[#D81B60] hover:text-[#AD1457] transition-colors">
            About
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;