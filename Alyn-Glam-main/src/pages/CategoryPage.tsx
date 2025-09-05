import React, { useState } from 'react';
import { Filter, Grid, List, Star, ChevronDown } from 'lucide-react';

interface CategoryPageProps {
  category: string;
  onNavigate: (page: string, data?: any) => void;
}

const CategoryPage: React.FC<CategoryPageProps> = ({ category, onNavigate }) => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('popularity');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({
    priceRange: '',
    brand: '',
    rating: ''
  });

  const products = [
    {
      id: '1',
      name: 'Rose Gold Lipstick Set',
      price: 1299,
      originalPrice: 1690,
      image: 'https://images.pexels.com/photos/2113855/pexels-photo-2113855.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=2',
      rating: 4.8,
      reviews: 156,
      category: 'Makeup',
      brand: 'Alyn Beauty',
      discount: 23
    },
    {
      id: '2',
      name: 'Vitamin C Serum',
      price: 899,
      originalPrice: 1199,
      image: 'https://images.pexels.com/photos/6621496/pexels-photo-6621496.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=2',
      rating: 4.9,
      reviews: 203,
      category: 'Skincare',
      brand: 'Glow Labs',
      discount: 25
    },
    {
      id: '3',
      name: 'Designer Silk Dress',
      price: 2999,
      originalPrice: 3999,
      image: 'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=2',
      rating: 4.7,
      reviews: 89,
      category: 'Clothing',
      brand: 'Elite Fashion',
      discount: 25
    },
    {
      id: '4',
      name: 'Luxury Body Cream',
      price: 799,
      originalPrice: 1099,
      image: 'https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=2',
      rating: 4.6,
      reviews: 127,
      category: 'Body Care',
      brand: 'Pure Essence',
      discount: 27
    },
    {
      id: '5',
      name: 'Matte Foundation',
      price: 1199,
      originalPrice: 1599,
      image: 'https://images.pexels.com/photos/3762879/pexels-photo-3762879.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=2',
      rating: 4.7,
      reviews: 312,
      category: 'Makeup',
      brand: 'Perfect Base',
      discount: 25
    },
    {
      id: '6',
      name: 'Casual Cotton T-Shirt',
      price: 599,
      originalPrice: 899,
      image: 'https://images.pexels.com/photos/1381556/pexels-photo-1381556.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=2',
      rating: 4.5,
      reviews: 178,
      category: 'Clothing',
      brand: 'Comfort Wear',
      discount: 33
    }
  ];

  const filteredProducts = products.filter(product => 
    category === 'home' || category === '' || 
    product.category.toLowerCase().includes(category.toLowerCase()) ||
    category.toLowerCase().includes(product.category.toLowerCase())
  );

  const sortOptions = [
    { value: 'popularity', label: 'Popularity' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'rating', label: 'Customer Rating' },
    { value: 'newest', label: 'Newest First' }
  ];

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 mb-8">
          <button onClick={() => onNavigate('home')} className="hover:text-rose-600">
            Home
          </button>
          <span>/</span>
          <span className="text-gray-900 dark:text-white capitalize">{category}</span>
        </div>

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 capitalize">
              {category}
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              {filteredProducts.length} products found
            </p>
          </div>

          {/* Controls */}
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            {/* Sort */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 pr-8 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-400"
              >
                {sortOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-600 dark:text-gray-400 pointer-events-none" />
            </div>

            {/* View Mode */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-colors duration-200 ${
                  viewMode === 'grid'
                    ? 'bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-colors duration-200 ${
                  viewMode === 'list'
                    ? 'bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>

            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
            >
              <Filter className="w-4 h-4" />
              <span>Filters</span>
            </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          {showFilters && (
            <div className="lg:w-64 bg-white dark:bg-gray-800 p-6 rounded-2xl h-fit">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
                Filters
              </h3>

              {/* Price Range */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
                  Price Range
                </h4>
                <div className="space-y-2">
                  {['Under ₹500', '₹500 - ₹1000', '₹1000 - ₹2000', 'Above ₹2000'].map((range) => (
                    <label key={range} className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="priceRange"
                        value={range}
                        className="text-rose-600 focus:ring-rose-400"
                        onChange={(e) => setSelectedFilters({...selectedFilters, priceRange: e.target.value})}
                      />
                      <span className="text-sm text-gray-700 dark:text-gray-300">{range}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Brand */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
                  Brand
                </h4>
                <div className="space-y-2">
                  {['Alyn Beauty', 'Glow Labs', 'Elite Fashion', 'Pure Essence'].map((brand) => (
                    <label key={brand} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        value={brand}
                        className="text-rose-600 focus:ring-rose-400"
                      />
                      <span className="text-sm text-gray-700 dark:text-gray-300">{brand}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Rating */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
                  Customer Rating
                </h4>
                <div className="space-y-2">
                  {[4, 3, 2].map((rating) => (
                    <label key={rating} className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="rating"
                        value={rating}
                        className="text-rose-600 focus:ring-rose-400"
                      />
                      <div className="flex items-center space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < rating
                                ? 'text-yellow-400 fill-current'
                                : 'text-gray-300 dark:text-gray-600'
                            }`}
                          />
                        ))}
                        <span className="text-sm text-gray-700 dark:text-gray-300 ml-1">
                          & above
                        </span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Products Grid/List */}
          <div className="flex-1">
            <div className={`grid gap-6 ${
              viewMode === 'grid' 
                ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
                : 'grid-cols-1'
            }`}>
              {sortedProducts.map((product) => (
                <div
                  key={product.id}
                  onClick={() => onNavigate('product', product)}
                  className={`group cursor-pointer bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 ${
                    viewMode === 'list' ? 'flex' : ''
                  }`}
                >
                  <div className={`${viewMode === 'list' ? 'w-48' : 'aspect-square'} overflow-hidden relative`}>
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    {product.discount && (
                      <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                        {product.discount}% OFF
                      </div>
                    )}
                  </div>
                  
                  <div className={`p-6 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                    <div className="text-sm text-rose-600 dark:text-rose-400 font-medium mb-2">
                      {product.brand}
                    </div>
                    
                    <h3 className={`font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors duration-200 ${
                      viewMode === 'list' ? 'text-xl' : 'text-lg'
                    }`}>
                      {product.name}
                    </h3>
                    
                    <div className="flex items-center mb-3">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(product.rating)
                                ? 'text-yellow-400 fill-current'
                                : 'text-gray-300 dark:text-gray-600'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                        ({product.reviews})
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <span className={`font-bold text-gray-900 dark:text-white ${
                        viewMode === 'list' ? 'text-2xl' : 'text-xl'
                      }`}>
                        ₹{product.price}
                      </span>
                      <span className="text-gray-500 dark:text-gray-400 line-through text-sm">
                        ₹{product.originalPrice}
                      </span>
                    </div>

                    {viewMode === 'list' && (
                      <div className="mt-4">
                        <p className="text-gray-600 dark:text-gray-400 text-sm">
                          Premium quality product with excellent reviews. Perfect for daily use and special occasions.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {sortedProducts.length === 0 && (
              <div className="text-center py-16">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  No products found
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Try adjusting your filters or search terms
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;