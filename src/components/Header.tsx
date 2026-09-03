import React from 'react';
import { Search, User, ShoppingBag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  cartCount?: number;
  onOpenCart?: () => void; // Prop para abrir el panel
  searchTerm: string; // Nuevo: texto de búsqueda recibido desde App
  onSearchChange: (value: string) => void; // Nuevo: función para actualizar la búsqueda
}

export const Header: React.FC<HeaderProps> = ({ cartCount = 0, onOpenCart, searchTerm, onSearchChange }) => {

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const navigate = useNavigate();

  const handleProceedToRegister = () => {
      navigate('/auth');
};

  return (
    <header className="sticky top-0 z-40 bg-neutral-900/80 backdrop-blur-md border-b border-neutral-800 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        
        <a href="/" className="text-2xl font-extrabold tracking-wider text-white">
          ZYRO<span className="text-neutral-500">BRAND</span>
        </a>

        <form onSubmit={handleSearch} className="flex-1 max-w-md mx-4 relative">
          <input
            type="text"
            placeholder="Buscar prendas..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full bg-neutral-800 text-sm text-white placeholder-neutral-400 rounded-full py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-neutral-500 transition-all border border-neutral-700"
          />
          <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-2.5" />
        </form>

        <div className="flex items-center gap-6">
          <button 
            className="flex items-center gap-2 text-sm font-medium hover:text-neutral-300 transition-colors"
            onClick={handleProceedToRegister}
          >
            <User className="w-5 h-5" />
            <span className="hidden sm:inline">Iniciar Sesión</span>
          </button>

          <button 
            className="relative p-2 hover:bg-neutral-800 rounded-full transition-colors"
            onClick={onOpenCart} // Evento click conectado
            aria-label="Carrito de compras"
          >
            <ShoppingBag className="w-6 h-6 text-white" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-white text-black text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
        </div>

      </div>
    </header>
  );
};