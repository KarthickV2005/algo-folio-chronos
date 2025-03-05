
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 px-4 md:px-8 py-4 transition-all duration-300",
        scrolled ? "bg-white/80 backdrop-blur-xl shadow-sm" : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link 
          to="/" 
          className="flex items-center space-x-2 transition-opacity duration-300 hover:opacity-80"
        >
          <div className="w-8 h-8 rounded-md bg-gradient-to-tr from-blue-600 to-blue-400 flex items-center justify-center">
            <div className="w-3 h-3 bg-white rounded-sm transform rotate-45"></div>
          </div>
          <span className="text-lg font-medium">AlgoTrade</span>
        </Link>

        <div className="hidden md:flex items-center space-x-8">
          <div className="flex items-center space-x-6">
            <NavLink href="#features">Features</NavLink>
            <NavLink href="#how-it-works">How it Works</NavLink>
            <NavLink href="#pricing">Pricing</NavLink>
          </div>

          <div className="flex items-center space-x-4">
            <Button variant="outline" className="h-9 px-4">Sign In</Button>
            <Button className="h-9 px-4 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white border-0">Sign Up</Button>
          </div>
        </div>

        <button 
          className="md:hidden" 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile menu */}
      <div 
        className={cn(
          "fixed inset-x-0 top-[64px] p-4 bg-white/95 backdrop-blur-xl border-b z-40 md:hidden shadow-lg",
          "transition-all duration-300 ease-in-out transform",
          mobileMenuOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0 pointer-events-none"
        )}
      >
        <div className="flex flex-col space-y-4 mb-6">
          <MobileNavLink href="#features" onClick={() => setMobileMenuOpen(false)}>Features</MobileNavLink>
          <MobileNavLink href="#how-it-works" onClick={() => setMobileMenuOpen(false)}>How it Works</MobileNavLink>
          <MobileNavLink href="#pricing" onClick={() => setMobileMenuOpen(false)}>Pricing</MobileNavLink>
        </div>
        <div className="flex flex-col space-y-3">
          <Button variant="outline" className="w-full justify-center">Sign In</Button>
          <Button className="w-full justify-center bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white border-0">Sign Up</Button>
        </div>
      </div>
    </nav>
  );
};

// Helper components for nav links
const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a 
    href={href} 
    className="relative text-foreground/90 hover:text-foreground transition-colors duration-200 text-sm font-medium py-1"
  >
    {children}
    <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full" />
  </a>
);

const MobileNavLink = ({ href, onClick, children }: { 
  href: string; 
  onClick?: () => void;
  children: React.ReactNode 
}) => (
  <a 
    href={href} 
    onClick={onClick}
    className="w-full text-foreground/90 hover:text-foreground py-2 px-2 transition-colors duration-200 text-base font-medium"
  >
    {children}
  </a>
);

export default Navbar;
