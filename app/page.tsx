// app/page.tsx
export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md text-center px-6">
        <div className="mx-auto w-20 h-20 bg-indigo-600 rounded-3xl flex items-center justify-center mb-6">
          <span className="text-white text-4xl">🔐</span>
        </div>
        
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          SecureLogin
        </h1>
        
        <p className="text-xl text-gray-600 mb-8">
          Learn Next.js while building a production-ready secure authentication system.
        </p>

        <div className="space-y-4">
          <a
            href="/login"
            className="block w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-4 rounded-2xl text-lg transition"
          >
            Go to Login Page
          </a>

          <p className="text-sm text-gray-500">
            We will add registration, OAuth, 2FA, JWT and more step by step.
          </p>
        </div>
      </div>
    </div>
  );
}