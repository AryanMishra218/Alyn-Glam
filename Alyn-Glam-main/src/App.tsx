import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import CategoryPage from './pages/CategoryPage';
import CartPage from './pages/CartPage';
import LoginPage from './pages/LoginPage';
import { CartProvider } from './contexts/CartContext';
import { ThemeProvider } from './contexts/ThemeContext';

type Page = 'home' | 'category' | 'product' | 'cart' | 'login';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  const navigateTo = (page: Page, data?: any) => {
    setCurrentPage(page);
    if (page === 'category' && data) {
      setSelectedCategory(data);
    }
    if (page === 'product' && data) {
      setSelectedProduct(data);
    }
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'category':
        return <CategoryPage category={selectedCategory} onNavigate={navigateTo} />;
      case 'product':
        return <ProductPage product={selectedProduct} onNavigate={navigateTo} />;
      case 'cart':
        return <CartPage onNavigate={navigateTo} />;
      case 'login':
        return <LoginPage onNavigate={navigateTo} />;
      default:
        return <HomePage onNavigate={navigateTo} />;
    }
  };

  return (
    <ThemeProvider>
      <CartProvider>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
          <Header onNavigate={navigateTo} />
          <main>
            {renderCurrentPage()}
          </main>
          <Footer />
        </div>
      </CartProvider>
    </ThemeProvider>
  );
}

export default App;