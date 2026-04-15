// app/login/page.tsx
'use client';

import { useState } from 'react';
import { findUserByEmail, registerTestUser, verifyPassword } from '@/lib/users';

registerTestUser();

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handleLogin(formData: FormData) {
    setLoading(true);
    setError('');

    const formEmail = formData.get('email') as string;
    const formPassword = formData.get('password') as string;

    // Find user
    const user = await findUserByEmail(formEmail);

    if (!user) {
      setError('No account found with this email.');
      setLoading(false);
      return;
    }

    // Verify password
    const isValid = await verifyPassword(formPassword, user.password);

    if (isValid) {
      setSuccess(true);
      setError('');
      alert(`Welcome back, ${user.email}! 🎉 (Login successful)`);
    } else {
      setError('Invalid password. Please try again.');
    }

    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-8">
        <div className="text-center mb-8">
          <div className="mx-auto w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center mb-4">
            <span className="text-white text-3xl font-bold">🔐</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Welcome Back</h1>
          <p className="text-gray-600 mt-2">Sign in to your account</p>
        </div>

        {success && (
          <div className="mb-6 p-4 bg-green-100 text-green-700 rounded-2xl text-center">
            Login successful! Welcome back.
          </div>
        )}

        <form action={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="w-4 h-4" />
              Remember me
            </label>
            <a href="#" className="text-indigo-600 hover:underline">Forgot password?</a>
          </div>

          {error && (
            <div className="p-3 bg-red-100 text-red-700 rounded-2xl text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-semibold py-3.5 rounded-2xl transition flex items-center justify-center"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span>
                Signing in...
              </span>
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        <div className="my-6 flex items-center gap-3">
          <div className="flex-1 h-px bg-gray-200"></div>
          <span className="text-gray-400 text-sm">OR</span>
          <div className="flex-1 h-px bg-gray-200"></div>
        </div>

        <button
          type="button"
          className="w-full flex items-center justify-center gap-3 border border-gray-300 hover:bg-gray-50 py-3.5 rounded-2xl font-medium text-gray-700"
        >
          <img 
            src="https://www.google.com/favicon.ico" 
            alt="Google" 
            className="w-5 h-5"
          />
          Continue with Google
        </button>

        <p className="text-center text-sm text-gray-600 mt-8">
          Don&apos;t have an account?{" "}
          <a href="#" className="text-indigo-600 hover:underline font-medium">Sign up</a>
        </p>
      </div>
    </div>
  );
}