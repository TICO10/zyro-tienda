import React from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import type { CartItem } from '../types/product';
import { useNavigate } from 'react-router-dom';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
}) => {
  if (!isOpen) return null;

  const total = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const navigate = useNavigate();

const handleProceedToCheckout = () => {
  onClose();
  navigate('/checkout');
};

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Fondo oscuro traslúcido */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-neutral-900 text-white shadow-xl flex flex-col border-l border-neutral-800">
          
          {/* Header del Carrito */}
          <div className="p-6 flex items-center justify-between border-b border-neutral-800">
            <div className="flex items-center gap-3">
              <ShoppingBag className="w-5 h-5" />
              <h2 className="text-lg font-bold tracking-wide">TU CARRITO</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Lista de Productos */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {cart.length === 0 ? (
              <div className="text-center py-20 text-neutral-500">
                <ShoppingBag className="w-12 h-12 mx-auto mb-3 stroke-1" />
                <p className="text-sm">Tu carrito está vacío</p>
              </div>
            ) : (
              cart.map(({ product, quantity }) => (
                <div
                  key={product.id}
                  className="flex gap-4 p-3 bg-neutral-950/50 rounded-lg border border-neutral-800"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-20 h-20 object-cover rounded-md bg-neutral-900"
                  />
                  
                  <div className="flex-1 flex flex-col justify-between">
                    <div className="flex justify-between items-start gap-2">
                      <div>
                        <h4 className="text-sm font-semibold text-white leading-tight">
                          {product.name}
                        </h4>
                        <span className="text-xs text-neutral-400">
                          ${product.price.toFixed(2)}
                        </span>
                      </div>
                      <button
                        onClick={() => onRemoveItem(product.id)}
                        className="text-neutral-500 hover:text-red-400 transition-colors"
                        aria-label="Eliminar producto"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Selector de cantidad en el carrito */}
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center bg-neutral-800 border border-neutral-700 rounded-md">
                        <button
                          onClick={() => onUpdateQuantity(product.id, -1)}
                          className="p-1 text-neutral-400 hover:text-white"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-semibold">
                          {quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(product.id, 1)}
                          className="p-1 text-neutral-400 hover:text-white"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="text-sm font-bold text-white">
                        ${(product.price * quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Resumen y Botón de Pago */}
          {cart.length > 0 && (
            <div className="p-6 border-t border-neutral-800 bg-neutral-900/90 space-y-4">
              <div className="flex justify-between text-base font-bold text-white">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <button
                onClick={handleProceedToCheckout}
                className="w-full bg-white hover:bg-neutral-200 text-black font-bold py-3 px-4 rounded-lg transition-colors text-sm uppercase tracking-wider"
              >
                Finalizar Compra
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};