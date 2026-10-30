import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.5 } },
};

const buttonVariants = {
  rest: { scale: 1 },
  hover: { scale: 0.98 },
  press: { scale: 0.95 },
};

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email.trim()) {
      setError('Email is required.');
      return;
    }
    if (!password) {
      setError('Password is required.');
      return;
    }

    setIsLoading(true);

    if (email.trim().toLowerCase() !== 'admin@lab.local' || password !== 'password') {
      setTimeout(() => {
        setIsLoading(false);
        setError('Invalid email or password.');
      }, 800);
      return;
    }

    setTimeout(() => {
      setIsLoading(false);
      localStorage.setItem('lab_session', 'demo-session');
      navigate('/dashboard', { replace: true });
    }, 800);
  };

  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={containerVariants}
      className="min-h-screen flex items-center justify-center bg-slate-50 px-4"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
              Sign in
            </h2>
            <p className="text-sm text-slate-500">
              Laboraty Laboratory Information System
            </p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label className="block text-xs font-medium text-slate-700 uppercase tracking-wider">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                disabled={isLoading}
                className="w-full px-3 py-2.5 text-sm text-slate-900 bg-white border border-slate-200 rounded-md focus:ring-1 focus:ring-sky-500 focus:border-sky-500 outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder="name@clinic.local"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-medium text-slate-700 uppercase tracking-wider">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                disabled={isLoading}
                className="w-full px-3 py-2.5 text-sm text-slate-900 bg-white border border-slate-200 rounded-md focus:ring-1 focus:ring-sky-500 focus:border-sky-500 outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {error && (
              <AnimatePresence>
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="text-sm text-rose-600 bg-rose-50 border border-rose-100 rounded-md px-3 py-2"
                  role="alert"
                >
                  {error}
                </motion.div>
              </AnimatePresence>
            )}

            <motion.button
              type="submit"
              disabled={isLoading || (!email.trim() && !password)}
              whileHover={buttonVariants.hover}
              whileTap={buttonVariants.press}
              className="w-full py-2.5 text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 focus:outline-none focus:ring-1 focus:ring-slate-900 disabled:bg-slate-300 disabled:cursor-not-allowed rounded-md transition-all"
            >
              {isLoading ? 'Signing in…' : 'Sign in'}
            </motion.button>
          </form>

          <div className="pt-4 text-center space-y-1">
            <p className="text-xs text-slate-500">
              Demo credentials:
            </p>
            <p className="text-xs font-medium text-slate-700 bg-slate-100 rounded px-2 py-1 inline-block">
              admin@lab.local / password
            </p>
            <p className="text-xs text-slate-400">
              Frontend demonstration only.
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
