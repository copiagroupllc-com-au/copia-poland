import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0A0A0F] px-4 text-center">
      <div>
        <p className="text-[#6366F1] text-xs font-semibold tracking-widest uppercase mb-4">404</p>
        <h1 className="text-5xl font-bold text-white mb-4 font-display">Page Not Found</h1>
        <p className="text-gray-500 text-lg mb-8 max-w-md mx-auto">The page you're looking for doesn't exist or has been moved.</p>
        <Link to="/" className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#6366F1] text-white font-bold hover:bg-indigo-400 transition-colors">
          Back to Home
        </Link>
      </div>
    </div>
  );
}
