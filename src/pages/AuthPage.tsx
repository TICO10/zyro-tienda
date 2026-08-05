import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, Eye, EyeOff, Mail, User, Lock, ArrowLeft, ArrowRight } from 'lucide-react';

export function AuthPage() {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'info'; text: string } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [viewState, setViewState] = useState<'auth' | 'store'>('auth');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      if (activeTab === 'login') {
        setStatusMessage({ type: 'success', text: '¡Sesión iniciada con éxito! Redirigiendo...' });
      } else {
        setStatusMessage({ type: 'success', text: '¡Cuenta creada correctamente! Bienvenido a ZYROBRAND.' });
      }

      setTimeout(() => {
        setViewState('store');
      }, 1200);
    }, 800);
  };

  const handleForgotPassword = (e: React.MouseEvent) => {
    e.preventDefault();
    setStatusMessage({ type: 'info', text: 'Te hemos enviado un enlace de recuperación a tu correo.' });
  };

  if (viewState === 'store') {
    return (
      <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col justify-between font-sans">
        <header className="flex items-center justify-between border-b border-neutral-900 py-4 px-6 bg-neutral-950/80 backdrop-blur-md">
          <div className="text-2xl font-extrabold tracking-wider text-white">
            ZYRO<span className="text-neutral-500">BRAND</span>
          </div>
          <button 
            onClick={() => { setViewState('auth'); setStatusMessage(null); }}
            className="text-xs font-medium text-neutral-400 hover:text-white transition flex items-center gap-2 bg-neutral-900 hover:bg-neutral-800 px-4 py-2 rounded-full border border-neutral-800 cursor-pointer"
          >
            Cerrar Sesión
          </button>
        </header>

        <main className="flex-grow flex flex-col items-center justify-center p-6 text-center">
          <div className="max-w-md bg-neutral-900 border border-neutral-800 rounded-2xl p-8 shadow-2xl">
            <div className="w-16 h-16 bg-emerald-500/10 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-500/20">
              <CheckCircle className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">¡Bienvenido a ZYROBRAND!</h2>
            <p className="text-sm text-neutral-400 mb-6">
              Has ingresado correctamente como <span className="text-neutral-200 font-semibold">{email || 'usuario@ejemplo.com'}</span>.
            </p>
            <button
              onClick={() => setViewState('auth')}
              className="w-full bg-white text-black font-bold py-3 rounded-xl hover:bg-neutral-200 transition text-sm cursor-pointer"
            >
              Volver al inicio de sesión
            </button>
          </div>
        </main>

        <footer className="border-t border-neutral-900 py-6 text-center text-xs text-neutral-500">
          <p>&copy; 2026 ZYROBRAND. Todos los derechos reservados.</p>
        </footer>
      </div>
    );
  }

  return (
    
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col justify-between font-sans selection:bg-neutral-800 selection:text-white">
      <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2 text-sm text-neutral-400 hover:text-white mb-8 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Volver a la tienda
            </button>

      {/* Main Form Box */}
      <main className="flex-grow flex items-center justify-center p-4 sm:p-6 my-8">
        <div className="w-full max-w-md bg-neutral-900/90 border border-neutral-800 rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden backdrop-blur-xl">
        
          
          <div className="text-center mb-8">
            <h1 className="text-2xl font-extrabold text-white tracking-wide">Únete a la Comunidad</h1>
            <p className="text-xs text-neutral-400 mt-1">Accede a lanzamientos exclusivos y seguimiento de pedidos</p>
          </div>

          {/* Selector Tabs */}
          <div className="grid grid-cols-2 bg-neutral-950 p-1.5 rounded-xl border border-neutral-800 mb-6 text-sm font-semibold">
            <button 
              type="button"
              onClick={() => { setActiveTab('login'); setStatusMessage(null); }}
              className={`py-2.5 rounded-lg transition-all duration-200 cursor-pointer ${activeTab === 'login' ? 'text-white bg-neutral-800 shadow-sm' : 'text-neutral-400 hover:text-white'}`}
            >
              Iniciar Sesión
            </button>
            <button 
              type="button"
              onClick={() => { setActiveTab('register'); setStatusMessage(null); }}
              className={`py-2.5 rounded-lg transition-all duration-200 cursor-pointer ${activeTab === 'register' ? 'text-white bg-neutral-800 shadow-sm' : 'text-neutral-400 hover:text-white'}`}
            >
              Registrarse
            </button>
          </div>

          {/* Feedback message */}
          {statusMessage && (
            <div className={`mb-6 p-3.5 rounded-xl border text-xs flex items-center gap-3 transition-all ${
              statusMessage.type === 'success' 
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' 
                : 'bg-blue-500/10 border-blue-500/30 text-blue-400'
            }`}>
              <CheckCircle className="w-4 h-4 flex-shrink-0" />
              <span>{statusMessage.text}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {activeTab === 'register' && (
              <div>
                <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-2">Nombre Completo</label>
                <div className="relative">
                  <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-500" />
                  <input 
                    type="text" 
                    required 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Juan Pérez" 
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-neutral-400 transition"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-2">Correo Electrónico</label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-500" />
                <input 
                  type="email" 
                  required 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu@email.com" 
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-neutral-400 transition"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider">Contraseña</label>
                {activeTab === 'login' && (
                  <button 
                    type="button" 
                    onClick={handleForgotPassword} 
                    className="text-xs text-neutral-400 hover:text-white transition bg-transparent border-none cursor-pointer"
                  >
                    ¿Olvidaste tu contraseña?
                  </button>
                )}
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-500" />
                <input 
                  type={showPassword ? 'text' : 'password'} 
                  required 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••" 
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl py-2.5 pl-10 pr-10 text-sm text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-neutral-400 transition"
                />
                <button 
                  type="button" 
                  onClick={() => setShowPassword(!showPassword)} 
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-300 transition cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {activeTab === 'login' && (
              <div className="flex items-center gap-2 pt-1">
                <input 
                  type="checkbox" 
                  id="remember" 
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-neutral-800 bg-neutral-950 text-white accent-white cursor-pointer"
                />
                <label htmlFor="remember" className="text-xs text-neutral-400 cursor-pointer select-none">Recordar mi sesión</label>
              </div>
            )}

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-white text-black font-bold py-3 rounded-xl hover:bg-neutral-200 active:scale-[0.99] transition text-sm flex items-center justify-center gap-2 mt-2 cursor-pointer disabled:opacity-50"
            >
              <span>{isLoading ? 'Procesando...' : (activeTab === 'login' ? 'Ingresar' : 'Crear Cuenta')}</span>
              {!isLoading && <ArrowRight className="w-4 h-4" />}
            </button>
          </form>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-neutral-900 py-6 text-center text-xs text-neutral-500">
        <p>&copy; 2026 ZYROBRAND. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}

export default AuthPage;