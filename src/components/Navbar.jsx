import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <header className="sticky top-0 z-40 backdrop-blur bg-slate-900/80 border-b border-slate-800">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img src="/flame-icon.svg" alt="Logo" className="h-8 w-8" />
          <span className="text-white font-bold text-xl">Daily Pulse</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-slate-300">
          <a href="#" className="hover:text-white">Subscribe</a>
          <a href="#" className="hover:text-white">Newsletter</a>
          <a href="#" className="hover:text-white">About</a>
        </nav>
      </div>
    </header>
  )
}

export default Navbar
