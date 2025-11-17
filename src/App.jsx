import { useEffect, useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import ArticleList from './components/ArticleList'
import CategoryTabs from './components/CategoryTabs'
import ArticlePage from './components/ArticlePage'

function Home() {
  const [category, setCategory] = useState('all')
  return (
    <div>
      <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white">Daily Pulse</h1>
            <p className="mt-2 text-slate-300">Fresh headlines across technology, business, sports and more.</p>
          </div>
          <CategoryTabs value={category} onChange={setCategory} />
          <div className="mt-6">
            <ArticleList category={category} />
          </div>
        </div>
      </div>
    </div>
  )
}

function App() {
  const navigate = useNavigate()

  // On first load, bootstrap sample data
  useEffect(() => {
    const run = async () => {
      try {
        const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
        await fetch(`${baseUrl}/api/bootstrap`, { method: 'POST' })
      } catch (e) {
        // ignore
      }
    }
    run()
  }, [])

  return (
    <div className="min-h-screen bg-slate-900">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/article/:slug" element={<ArticlePage />} />
      </Routes>
    </div>
  )
}

export default App
