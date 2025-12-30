import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import DesktopNavigation from "./navigation/DesktopNavigation";
import MobileNavigation from "./navigation/MobileNavigation";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthProvider";

interface NavigationProps {
  alwaysShowBg?: boolean;
}

const Navigation = ({ alwaysShowBg = false }: NavigationProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth(); // Use AuthProvider context

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      setScrolled(isScrolled);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const handleLogout = async () => {
  try {
    await logout();
    toast.success("Logged out successfully!");
    navigate("/login"); // Redirect to login page after logout
  } catch (err: any) {
    console.error("Logout error:", err);
    toast.error("Failed to log out");
  }
};

  return (
    <>
      <nav
        className={`bg-[#220536]/95 backdrop-blur-xl border-b border-[#9326E0]/20 shadow-xl fixed top-0 left-0 right-0 z-50 transition-all duration-500`}
      >
        <div className="container mx-auto px-4 lg:px-6">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center space-x-3 group transition-transform duration-300 hover:scale-105"
            >
              <img
                src="https://www.worldspaceweek.org/wp-content/uploads/WSW-Social-Web-logo-300x69.png"
                alt="World Space Week Logo"
                className="h-10 lg:h-12 w-auto object-contain"
                style={{ maxWidth: "180px" }}
              />
            </Link>

            {/* Desktop Navigation */}
            <DesktopNavigation />

            {/* Desktop CTA Buttons */}
            <div className="hidden lg:flex items-center space-x-4">
              {user ? (
                <button
                  onClick={handleLogout}
                  className="bg-gradient-to-r from-[#204d74] to-[#9326E0] text-white px-6 py-2.5 rounded-xl font-semibold hover:shadow-lg hover:shadow-[#9326E0]/25 transition-all duration-300 transform hover:scale-105"
                >
                  Logout
                </button>
              ) : (
                <Link
                  to="/login"
                  className="bg-gradient-to-r from-[#204d74] to-[#9326E0] text-white px-6 py-2.5 rounded-xl font-semibold hover:shadow-lg hover:shadow-[#9326E0]/25 transition-all duration-300 transform hover:scale-105"
                >
                  Login
                </Link>
              )}
              <Link
                to="/donate"
                className="bg-gradient-to-r from-[#9326E0] to-[#8c38c7] text-white px-6 py-2.5 rounded-xl font-semibold hover:shadow-lg hover:shadow-[#9326E0]/25 transition-all duration-300 transform hover:scale-105"
              >
                Donate
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 text-white hover:text-[#9326E0] transition-colors duration-300 hover:bg-white/5 rounded-lg"
              aria-label="Toggle menu"
            >
              <div className="relative w-6 h-6">
                <Menu
                  className={`absolute inset-0 w-6 h-6 transition-all duration-300 ${
                    isOpen ? "opacity-0 rotate-180" : "opacity-100 rotate-0"
                  }`}
                />
                <X
                  className={`absolute inset-0 w-6 h-6 transition-all duration-300 ${
                    isOpen ? "opacity-100 rotate-0" : "opacity-0 -rotate-180"
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <MobileNavigation isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};

export default Navigation;