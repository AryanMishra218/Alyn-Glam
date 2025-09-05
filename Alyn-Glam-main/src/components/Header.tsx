import React, { useState } from 'react';
import { Search, ShoppingBag, User, Menu, X, Moon, Sun, Heart } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useTheme } from '../contexts/ThemeContext';

interface HeaderProps {
  onNavigate: (page: string, data?: any) => void;
}

const Header: React.FC<HeaderProps> = ({ onNavigate }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { getTotalItems } = useCart();
  const { theme, toggleTheme } = useTheme();

  const categories = [
    {
      name: 'Clothing',
      subcategories: ['Men', 'Women', 'Kids']
    },
    {
      name: 'Makeup',
      subcategories: ['Face', 'Eyes', 'Lips', 'Nails']
    },
    {
      name: 'Skincare',
      subcategories: ['Cleanser', 'Moisturizer', 'Serum', 'Sunscreen']
    },
    {
      name: 'Body Care',
      subcategories: ['Shower Gel', 'Body Lotion', 'Hair Care']
    }
  ];

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-50 transition-colors duration-300">
      {/* Top Bar */}
      <div className="bg-rose-100 dark:bg-rose-900/20 text-center py-2 text-sm text-rose-800 dark:text-rose-200">
        Free shipping on orders above ₹999 | Use code: ALYN25 for 25% off
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div 
            className="cursor-pointer"
            onClick={() => onNavigate('home')}
          >
            <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-rose-400 to-pink-600 bg-clip-text text-transparent">
              Alyn Glam
            </h1>
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search for products, brands, and more..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-4 pr-12 py-3 border border-gray-300 dark:border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-rose-400 bg-gray-50 dark:bg-gray-700 dark:text-white transition-colors duration-300"
              />
              <button className="absolute right-4 top-1/2 transform -translate-y-1/2">
                <Search className="w-5 h-5 text-gray-400 dark:text-gray-300" />
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
            >
              {theme === 'light' ? (
                <Moon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              ) : (
                <Sun className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              )}
            </button>

            {/* Wishlist */}
            <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200">
              <Heart className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            </button>

            {/* Profile */}
            <button 
              onClick={() => onNavigate('login')}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
            >
              <User className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            </button>

            {/* Cart */}
            <button 
              onClick={() => onNavigate('cart')}
              className="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
            >
              <ShoppingBag className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              {getTotalItems() > 0 && (
                <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {getTotalItems()}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              ) : (
                <Menu className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              )}
            </button>
          </div>
        </div>

        {/* Navigation - Desktop */}
        <nav className="hidden md:block mt-4 border-t border-gray-200 dark:border-gray-700 pt-4">
          <div className="flex justify-center space-x-8">
            {categories.map((category) => (
              <div key={category.name} className="relative group">
                <button
                  onClick={() => onNavigate('category', category.name)}
                  className="text-gray-700 dark:text-gray-300 hover:text-rose-600 dark:hover:text-rose-400 font-medium transition-colors duration-200"
                >
                  {category.name}
                </button>
                
                {/* Dropdown */}
                <div className="absolute top-full left-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                  <div className="py-2">
                    {category.subcategories.map((sub) => (
                      <button
                        key={sub}
                        onClick={() => onNavigate('category', `${category.name}/${sub}`)}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                      >
                        {sub}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </nav>

        {/* Mobile Search */}
        <div className="md:hidden mt-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-4 pr-12 py-3 border border-gray-300 dark:border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-rose-400 bg-gray-50 dark:bg-gray-700 dark:text-white transition-colors duration-300"
            />
            <button className="absolute right-4 top-1/2 transform -translate-y-1/2">
              <Search className="w-5 h-5 text-gray-400 dark:text-gray-300" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
          <div className="py-4 px-4">
            {categories.map((category) => (
              <div key={category.name} className="mb-4">
                <button
                  onClick={() => {
                    onNavigate('category', category.name);
                    setIsMobileMenuOpen(false);
                  }}
                  className="text-gray-700 dark:text-gray-300 font-medium text-lg mb-2 block"
                >
                  {category.name}
                </button>
                <div className="ml-4 space-y-1">
                  {category.subcategories.map((sub) => (
                    <button
                      key={sub}
                      onClick={() => {
                        onNavigate('category', `${category.name}/${sub}`);
                        setIsMobileMenuOpen(false);
                      }}
                      className="block text-gray-600 dark:text-gray-400 text-sm hover:text-rose-600 dark:hover:text-rose-400 transition-colors duration-200"
                    >
                      {sub}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;