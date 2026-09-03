import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ProductCategory } from './components/productCategory/ProductCategory';
import { ProductCard } from './components/ProductCard';
import { CartDrawer } from './components/CartDrawer';
import { Checkout } from './pages/Checkout';
import { AuthPage } from './pages/AuthPage';
import { PRODUCTS } from './data/products';
import type { CartItem, Product } from './types/product';

function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(''); // Estado de la búsqueda
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const handleAddToCart = (product: Product, quantity: number) => {
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex((item) => item.product.id === product.id);
      if (existingIndex > -1) {
        const updatedCart = [...prevCart];
        updatedCart[existingIndex].quantity += quantity;
        return updatedCart;
      }
      return [...prevCart, { product, quantity }];
    });
  };

  const handleUpdateQuantity = (productId: string, delta: number) => {
    setCart((prevCart) =>
      prevCart
        .map((item) => {
          if (item.product.id === productId) {
            const newQuantity = item.quantity + delta;
            return newQuantity > 0 ? { ...item, quantity: newQuantity } : null;
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null)
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.product.id !== productId));
  };

  const handleClearCart = () => setCart([]);

  const totalCartItems = cart.reduce((total, item) => total + item.quantity, 0);

  // Filtrado de productos por nombre o categoría
  const filteredProducts = PRODUCTS.filter((product) => {
    const query = searchTerm.toLowerCase().trim();
    const nameMatch = product.name.toLowerCase().includes(query);
    const categoryMatch = product.category.toLowerCase().includes(query);
    const typeMatch = product.type.id.toLowerCase().includes(query);
    const matchesSearch = nameMatch || categoryMatch || typeMatch;
    const matchesType = selectedType ? product.type.id === selectedType : true;

    return matchesSearch && matchesType;
  });

  return (
    <div className="min-h-screen text-neutral-100 font-sans flex flex-col justify-between">
      <Header 
      cartCount={totalCartItems} onOpenCart={() => setIsCartOpen(true)} searchTerm={searchTerm} onSearchChange={setSearchTerm} />

      <main className="flex-grow">
        <Routes>
          {/* Ruta principal: Catálogo */}
          <Route
            path="/"
            element={
              <div className="max-w-7xl mx-auto px-6 py-12">
                {/* Si no se encuentran prendas */}
                {filteredProducts.length === 0 ? (
                  <div className="text-center py-20 bg-neutral-900/50 rounded-xl border border-neutral-800">
                    <p className="text-neutral-400 text-lg">
                      No se encontraron prendas que coincidan con <span className="text-white font-semibold">"{searchTerm}"</span>.
                    </p>
                    <button 
                      onClick={() => setSearchTerm('')}
                      className="mt-4 text-sm text-neutral-300 underline hover:text-white"
                    >
                      Limpiar búsqueda
                    </button>
                  </div>
                ) : (
                  <div className="space-y-12">
                  <section className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                      <ProductCategory
                        product={PRODUCTS}
                        selectedTypeId={selectedType}
                        onSelectType={setSelectedType}
                      />
                  </section>
                  <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {filteredProducts.map((product) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        onAddToCart={handleAddToCart}
                      />
                    ))}
                  </section>
                  </div>
                )}
              </div>
            }
          />

          {/* Ruta de Facturación y Pago */}
          <Route
            path="/checkout"
            element={<Checkout cart={cart} onClearCart={handleClearCart} />}
          />
          <Route path="/auth" element={<AuthPage />} />
        </Routes>
      </main>

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
      />

      <Footer />
    </div>
  );
}

export default App;