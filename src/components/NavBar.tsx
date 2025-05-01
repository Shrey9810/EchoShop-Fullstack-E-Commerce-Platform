
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ShoppingCart, User, Search, Menu, X } from "lucide-react";

const NavBar: React.FC = () => {
  const { items } = useCart();
  const { isAuthenticated, logout, user } = useAuth();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const cartItemsCount = items.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Close mobile menu when location changes
    setIsMobileMenuOpen(false);
  }, [location]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsSearchOpen(false);
      setSearchQuery("");
      // Navigate to search results page
      window.location.href = `/shop?search=${encodeURIComponent(
        searchQuery.trim()
      )}`;
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    if (!isSearchOpen) {
      setTimeout(() => {
        document.getElementById("search-input")?.focus();
      }, 100);
    }
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <header
      className={`sticky top-0 z-50 bg-white ${
        isScrolled ? "shadow-md" : "shadow-sm"
      } transition-shadow`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="font-bold text-xl text-brand-purple">
            EchoShop
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6">
            <Link
              to="/"
              className={`text-gray-700 hover:text-brand-purple ${
                location.pathname === "/" ? "font-medium text-brand-purple" : ""
              }`}
            >
              Home
            </Link>
            <Link
              to="/shop"
              className={`text-gray-700 hover:text-brand-purple ${
                location.pathname === "/shop" ? "font-medium text-brand-purple" : ""
              }`}
            >
              Shop
            </Link>
            <Link
              to="/categories"
              className={`text-gray-700 hover:text-brand-purple ${
                location.pathname === "/categories" ? "font-medium text-brand-purple" : ""
              }`}
            >
              Categories
            </Link>
            <Link
              to="/about"
              className={`text-gray-700 hover:text-brand-purple ${
                location.pathname === "/about" ? "font-medium text-brand-purple" : ""
              }`}
            >
              About
            </Link>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleSearch}
              aria-label="Search"
            >
              <Search className="h-5 w-5" />
            </Button>

            <Link to="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {cartItemsCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-brand-purple text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                    {cartItemsCount}
                  </span>
                )}
              </Button>
            </Link>

            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative">
                    <User className="h-5 w-5" />
                    <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white"></span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    <div className="flex flex-col">
                      <span>{user?.name}</span>
                      <span className="text-xs font-normal text-gray-500">
                        {user?.email}
                      </span>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/account" className="cursor-pointer w-full">
                      Account
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/orders" className="cursor-pointer w-full">
                      Orders
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button
                variant="default"
                size="sm"
                className="bg-brand-purple hover:bg-brand-purple-dark"
                asChild
              >
                <Link to="/login">Login</Link>
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden space-x-2">
            <Link to="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {cartItemsCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-brand-purple text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                    {cartItemsCount}
                  </span>
                )}
              </Button>
            </Link>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMobileMenu}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Full-screen Search */}
      {isSearchOpen && (
        <div className="fixed inset-0 bg-white bg-opacity-95 z-50 flex items-start pt-24 px-4">
          <div className="container mx-auto max-w-2xl">
            <form onSubmit={handleSearch}>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  id="search-input"
                  type="text"
                  placeholder="Search for products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-purple"
                />
                <button
                  type="button"
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                  onClick={toggleSearch}
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <button type="submit" className="sr-only">
                Search
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="container mx-auto px-4 py-3">
            <nav className="flex flex-col space-y-3">
              <Link
                to="/"
                className={`px-3 py-2 rounded-md ${
                  location.pathname === "/"
                    ? "bg-brand-purple-light text-brand-purple font-medium"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                Home
              </Link>
              <Link
                to="/shop"
                className={`px-3 py-2 rounded-md ${
                  location.pathname === "/shop"
                    ? "bg-brand-purple-light text-brand-purple font-medium"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                Shop
              </Link>
              <Link
                to="/categories"
                className={`px-3 py-2 rounded-md ${
                  location.pathname === "/categories"
                    ? "bg-brand-purple-light text-brand-purple font-medium"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                Categories
              </Link>
              <Link
                to="/about"
                className={`px-3 py-2 rounded-md ${
                  location.pathname === "/about"
                    ? "bg-brand-purple-light text-brand-purple font-medium"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                About
              </Link>

              <div className="pt-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search products..."
                    className="w-full pl-9 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-brand-purple"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleSearch(e as any);
                      }
                    }}
                  />
                </div>
              </div>

              {isAuthenticated ? (
                <>
                  <Link
                    to="/account"
                    className="px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100"
                  >
                    My Account
                  </Link>
                  <Link
                    to="/orders"
                    className="px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100"
                  >
                    My Orders
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="px-3 py-2 rounded-md text-left text-red-600 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <div className="flex flex-col space-y-2">
                  <Button asChild className="bg-brand-purple hover:bg-brand-purple-dark">
                    <Link to="/login">Login</Link>
                  </Button>
                  <Button asChild variant="outline">
                    <Link to="/register">Register</Link>
                  </Button>
                </div>
              )}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default NavBar;
