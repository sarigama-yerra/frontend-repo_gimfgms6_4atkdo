import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'

function ArticlePage() {
  const { slug } = useParams()
  const [article, setArticle] = useState(null)
  const [comments, setComments] = useState([])
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')

  useEffect(() => {
    const load = async () => {
      const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
      const [aRes, cRes] = await Promise.all([
        fetch(`${baseUrl}/api/articles/${slug}`),
        fetch(`${baseUrl}/api/comments/${slug}`)
      ])
      if (aRes.ok) setArticle(await aRes.json())
      if (cRes.ok) setComments(await cRes.json())
    }
    load()
  }, [slug])

  const submitComment = async (e) => {
    e.preventDefault()
    const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
    const res = await fetch(`${baseUrl}/api/comments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ article_slug: slug, name, message })
    })
    if (res.ok) {
      setComments(prev => [{ article_slug: slug, name, message, likes: 0 }, ...prev])
      setName('')
      setMessage('')
    }
  }

  if (!article) return <div className="max-w-3xl mx-auto p-4 text-slate-300">Loading...</div>

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <Link to="/" className="text-blue-400 hover:underline">← Back</Link>
      <h1 className="mt-4 text-3xl md:text-4xl font-bold text-white">{article.title}</h1>
      <div className="mt-2 text-slate-400 text-sm">
        {article.category} • {article.published_at ? new Date(article.published_at).toLocaleString() : ''}
      </div>
      {article.cover_image && (
        <img src={article.cover_image} alt="cover" className="mt-6 rounded-xl border border-slate-700" />
      )}
      <p className="mt-6 text-slate-200 leading-7">{article.summary}</p>
      <div className="prose prose-invert mt-4" dangerouslySetInnerHTML={{ __html: article.content }} />

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-white mb-4">Comments</h2>
        <form onSubmit={submitComment} className="space-y-3 bg-slate-800/40 border border-slate-700 rounded-lg p-4">
          <div className="flex gap-3">
            <input value={name} onChange={e=>setName(e.target.value)} placeholder="Your name" className="flex-1 bg-slate-900 border border-slate-700 rounded px-3 py-2 text-slate-100" />
          </div>
          <textarea value={message} onChange={e=>setMessage(e.target.value)} placeholder="Add a comment" className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-2 text-slate-100" rows={3} />
          <button className="bg-blue-600 hover:bg-blue-500 text-white font-medium px-4 py-2 rounded">Post Comment</button>
        </form>
        <ul className="mt-6 space-y-4">
          {comments.map((c, idx) => (
            <li key={idx} className="bg-slate-800/40 border border-slate-700 rounded p-4">
              <div className="text-sm text-slate-400">{c.name}</div>
              <div className="mt-1 text-slate-200">{c.message}</div>
            </li>
          ))}
          {comments.length === 0 && <p className="text-slate-400">No comments yet.</p>}
        </ul>
      </section>
    </div>
  )
}

export default ArticlePage
