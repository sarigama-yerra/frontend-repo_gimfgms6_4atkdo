import { useEffect, useState } from 'react'
import ArticleCard from './ArticleCard'

function ArticleList({ category }) {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
        const url = new URL('/api/articles', baseUrl)
        if (category && category !== 'all') url.searchParams.set('category', category)
        const res = await fetch(url)
        const data = await res.json()
        setArticles(data)
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    fetchArticles()
  }, [category])

  if (loading) return <p className="text-slate-300">Loading articles...</p>

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {articles.map(a => (
        <ArticleCard key={a.slug} article={a} />
      ))}
      {articles.length === 0 && (
        <div className="col-span-full text-slate-400">No articles yet.</div>
      )}
    </div>
  )
}

export default ArticleList
