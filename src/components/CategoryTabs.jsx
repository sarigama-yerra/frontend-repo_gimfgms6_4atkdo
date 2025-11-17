import { useEffect, useState } from 'react'

function CategoryTabs({ value, onChange }) {
  const [cats, setCats] = useState([{ name: 'All', slug: 'all' }])

  useEffect(() => {
    const fetchCats = async () => {
      try {
        const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
        const res = await fetch(`${baseUrl}/api/categories`)
        const data = await res.json()
        setCats([{ name: 'All', slug: 'all' }, ...data])
      } catch (e) {
        console.error(e)
      }
    }
    fetchCats()
  }, [])

  return (
    <div className="flex flex-wrap gap-2">
      {cats.map(c => (
        <button
          key={c.slug}
          onClick={() => onChange(c.slug)}
          className={`px-3 py-1.5 rounded-full border text-sm transition ${value === c.slug ? 'bg-blue-600 text-white border-blue-600' : 'bg-slate-800/50 text-slate-200 border-slate-700 hover:border-slate-500'}`}
        >
          {c.name}
        </button>
      ))}
    </div>
  )
}

export default CategoryTabs
