import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, ChevronUp, X } from "lucide-react";
import { navItems } from "./NavigationData";
import { useAuth } from "@/context/AuthProvider";

const MobileNavigation = ({ isOpen, onClose }) => {
  const [openMenuIndex, setOpenMenuIndex] = useState(null);
  const [openSubMenuIndex, setOpenSubMenuIndex] = useState(null);
  const { user } = useAuth();

  const toggleMenu = (index) => {
    setOpenMenuIndex(openMenuIndex === index ? null : index);
    setOpenSubMenuIndex(null); // Reset sub-sub-menu when toggling main menu
  };

  const toggleSubMenu = (subIndex) => {
    setOpenSubMenuIndex(openSubMenuIndex === subIndex ? null : subIndex);
  };

  return (
    <div
      className={`fixed inset-0 bg-[#220536]/95 backdrop-blur-xl z-50 transition-transform duration-300 lg:hidden ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="flex flex-col h-full">
        {/* Close Button */}
        <div className="flex justify-end p-4">
          <button
            onClick={onClose}
            className="p-2 text-white hover:text-[#9326E0] hover:bg-white/5 rounded-lg"
            aria-label="Close menu"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Menu Items */}
        <div className="flex-1 overflow-y-auto px-4 py-6">
          {navItems.map((item, index) => (
            <div key={index} className="mb-2">
              <div
                className="flex items-center justify-between px-4 py-3 text-white hover:text-[#9326E0] hover:bg-[#2d0a4a] rounded-lg cursor-pointer transition-all duration-200"
                onClick={() => toggleMenu(index)}
              >
                <span className="text-base font-medium">{item.title}</span>
                {item.items?.length > 0 && (
                  <span>
                    {openMenuIndex === index ? (
                      <ChevronUp className="w-5 h-5" />
                    ) : (
                      <ChevronDown className="w-5 h-5" />
                    )}
                  </span>
                )}
              </div>

              {/* Sub-menu */}
              {openMenuIndex === index && item.items?.length > 0 && (
                <div className="ml-4 mt-2 space-y-2">
                  {item.items.map((subItem, subIndex) => (
                    <div key={subIndex} className="relative">
                      <div
                        className="flex items-center justify-between px-4 py-2 text-white hover:text-[#9326E0] hover:bg-[#3a0e5a] rounded-lg transition-all duration-200"
                        onClick={() => toggleSubMenu(subIndex)}
                      >
                        <Link
                          to={subItem.href}
                          className="text-sm font-medium w-full"
                          onClick={onClose}
                        >
                          {subItem.title}
                        </Link>
                        {subItem.titleSubItems?.length > 0 && (
                          <span>
                            {openSubMenuIndex === subIndex ? (
                              <ChevronUp className="w-4 h-4" />
                            ) : (
                              <ChevronDown className="w-4 h-4" />
                            )}
                          </span>
                        )}
                      </div>

                      {/* Sub-sub-menu */}
                      {openSubMenuIndex === subIndex &&
                        subItem.titleSubItems?.length > 0 && (
                          <div className="ml-4 mt-2 space-y-2">
                            {subItem.titleSubItems.map((subSubItem, subSubIndex) => (
                              <Link
                                key={subSubIndex}
                                to={subSubItem.href}
                                className="block px-4 py-2 text-white hover:text-[#9326E0] hover:bg-[#3a0e5a] rounded-lg transition-all duration-200 text-sm"
                                onClick={onClose}
                              >
                                {subSubItem.subTitles}
                              </Link>
                            ))}
                          </div>
                        )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Mobile CTA Buttons */}
        <div className="px-4 py-6 border-t border-[#9326E0]/20">
          {user ? (
            <Link
              to="/login"
              className="block w-full bg-gradient-to-r from-[#204d74] to-[#9326E0] text-white px-4 py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-[#9326E0]/25 transition-all duration-300 text-center text-sm mb-3"
              onClick={onClose}
            >
              Logout
            </Link>
          ) : (
            <Link
              to="/login"
              className="block w-full bg-gradient-to-r from-[#204d74] to-[#9326E0] text-white px-4 py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-[#9326E0]/25 transition-all duration-300 text-center text-sm mb-3"
              onClick={onClose}
            >
              Login
            </Link>
          )}
          <Link
            to="/donate"
            className="block w-full bg-gradient-to-r from-[#9326E0] to-[#8c38c7] text-white px-4 py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-[#9326E0]/25 transition-all duration-300 text-center text-sm"
            onClick={onClose}
          >
            Donate
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MobileNavigation;