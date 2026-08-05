import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Truck, CheckCircle2, ArrowLeft } from 'lucide-react';
import type { CartItem } from '../types/product';

interface CheckoutProps {
  cart: CartItem[];
  onClearCart: () => void;
}

export const Checkout: React.FC<CheckoutProps> = ({ cart, onClearCart }) => {
  const navigate = useNavigate();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const shipping = subtotal > 0 ? 10.0 : 0;
  const total = subtotal + shipping;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    onClearCart();
  };

  if (isSubmitted) {
    return (
      <div className="max-w-md mx-auto my-20 p-8 bg-neutral-900 border border-neutral-800 rounded-2xl text-center space-y-4">
        <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto" />
        <h2 className="text-2xl font-bold text-white">¡Compra confirmada!</h2>
        <p className="text-sm text-neutral-400">
          Hemos recibido tu pedido. En breve recibirás los detalles en tu correo electrónico.
        </p>
        <button
          onClick={() => navigate('/')}
          className="w-full bg-white text-black font-bold py-3 rounded-lg hover:bg-neutral-200 transition-colors text-sm"
        >
          Volver a la tienda
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <button
        onClick={() => navigate('/')}
        className="flex items-center gap-2 text-sm text-neutral-400 hover:text-white mb-8 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Seguir comprando
      </button>

      <h1 className="text-3xl font-black text-white mb-8 tracking-wider">
        FACTURACIÓN Y PAGO
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Formulario */}
        <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-8">
          {/* Datos de Envío */}
          <div className="bg-neutral-900 p-6 rounded-xl border border-neutral-800 space-y-4">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Truck className="w-5 h-5 text-neutral-400" /> Datos de Envío
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                required
                type="text"
                placeholder="Nombre"
                className="bg-neutral-800 border border-neutral-700 rounded-lg p-3 text-sm text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <input
                required
                type="text"
                placeholder="Apellido"
                className="bg-neutral-800 border border-neutral-700 rounded-lg p-3 text-sm text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <input
                required
                type="email"
                placeholder="Correo electrónico"
                className="sm:col-span-2 bg-neutral-800 border border-neutral-700 rounded-lg p-3 text-sm text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <input
                required
                type="text"
                placeholder="Dirección de residencia"
                className="sm:col-span-2 bg-neutral-800 border border-neutral-700 rounded-lg p-3 text-sm text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <input
                required
                type="text"
                placeholder="Ciudad"
                className="bg-neutral-800 border border-neutral-700 rounded-lg p-3 text-sm text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <input
                required
                type="text"
                placeholder="Teléfono de contacto"
                className="bg-neutral-800 border border-neutral-700 rounded-lg p-3 text-sm text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-white"
              />
            </div>
          </div>

          {/* Método de Pago */}
          <div className="bg-neutral-900 p-6 rounded-xl border border-neutral-800 space-y-4">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-neutral-400" /> Detalle de Pago
            </h2>
            <div className="space-y-4">
              <input
                required
                type="text"
                placeholder="Número de tarjeta"
                className="w-full bg-neutral-800 border border-neutral-700 rounded-lg p-3 text-sm text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <div className="grid grid-cols-2 gap-4">
                <input
                  required
                  type="text"
                  placeholder="MM/AA"
                  className="bg-neutral-800 border border-neutral-700 rounded-lg p-3 text-sm text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-white"
                />
                <input
                  required
                  type="text"
                  placeholder="CVC"
                  className="bg-neutral-800 border border-neutral-700 rounded-lg p-3 text-sm text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-white"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-white text-black font-bold py-4 rounded-xl hover:bg-neutral-200 transition-colors uppercase tracking-wider text-sm"
          >
            Pagar ${total.toFixed(2)}
          </button>
        </form>

        {/* Resumen del pedido */}
        <div className="bg-neutral-900 p-6 rounded-xl border border-neutral-800 h-fit space-y-4">
          <h2 className="text-lg font-bold text-white border-b border-neutral-800 pb-3">
            Resumen de la orden
          </h2>
          <div className="space-y-3 max-h-60 overflow-y-auto">
            {cart.map(({ product, quantity }) => (
              <div key={product.id} className="flex justify-between items-center text-sm">
                <div>
                  <p className="font-medium text-white">{product.name}</p>
                  <p className="text-xs text-neutral-400">Cant: {quantity}</p>
                </div>
                <span className="font-semibold text-white">
                  ${(product.price * quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>
          <div className="border-t border-neutral-800 pt-3 space-y-2 text-sm">
            <div className="flex justify-between text-neutral-400">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-neutral-400">
              <span>Envío</span>
              <span>${shipping.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold text-base text-white border-t border-neutral-800 pt-2">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};