import React, { useState } from 'react';
import { Plus, Minus, ShoppingCart } from 'lucide-react';
import type { Product } from '../types/product';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product, quantity: number) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);

  const handleIncrement = () => setQuantity((prev) => prev + 1);
  const handleDecrement = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const handleAdd = () => {
    onAddToCart(product, quantity);
    setQuantity(1); // Reiniciar la cantidad
  };

  return (
    <div className="bg-neutral-900 rounded-xl overflow-hidden border border-neutral-800 flex flex-col hover:border-neutral-700 transition-all group">
      {/* Imagen del Producto */}
      <div className="relative aspect-square overflow-hidden bg-neutral-950">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <span className="absolute top-3 left-3 bg-neutral-900/90 text-xs text-neutral-300 px-2.5 py-1 rounded-full border border-neutral-700">
          {product.category}
        </span>
      </div>

      {/* Info del Producto */}
      <div className="p-5 flex flex-col flex-grow justify-between">
        <div>
          <h3 className="font-semibold text-lg text-white group-hover:text-neutral-200 transition-colors">
            {product.name}
          </h3>
          <p className="text-neutral-400 text-xs mt-1 line-clamp-2">
            {product.description}
          </p>
        </div>

        <div className="mt-4 pt-4 border-t border-neutral-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs text-neutral-500 uppercase font-medium">Precio</span>
            <span className="text-xl font-extrabold text-white">
              ${product.price.toFixed(2)}
            </span>
          </div>

          {/* Selector de Cantidad + Botón */}
          <div className="flex items-center gap-2">
            {/* Controles de cantidad */}
            <div className="flex items-center bg-neutral-800 border border-neutral-700 rounded-lg overflow-hidden">
              <button
                onClick={handleDecrement}
                className="px-2.5 py-2 text-neutral-400 hover:text-white hover:bg-neutral-700 transition-colors"
                aria-label="Disminuir cantidad"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="px-3 text-sm font-semibold text-white">
                {quantity}
              </span>
              <button
                onClick={handleIncrement}
                className="px-2.5 py-2 text-neutral-400 hover:text-white hover:bg-neutral-700 transition-colors"
                aria-label="Aumentar cantidad"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Botón Agregar al Carrito */}
            <button
              onClick={handleAdd}
              className="flex-1 bg-white hover:bg-neutral-200 text-black font-semibold py-2 px-3 rounded-lg flex items-center justify-center gap-2 text-sm transition-colors"
            >
              <ShoppingCart className="w-4 h-4" />
              Agregar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};