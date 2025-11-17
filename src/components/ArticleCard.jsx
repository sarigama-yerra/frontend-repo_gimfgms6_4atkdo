import { Link } from 'react-router-dom'

function ArticleCard({ article }) {
  return (
    <Link to={`/article/${article.slug}`} className="group block bg-slate-800/40 hover:bg-slate-800/60 transition rounded-xl overflow-hidden border border-slate-700/50">
      {article.cover_image && (
        <div className="aspect-[16/9] overflow-hidden">
          <img src={article.cover_image} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition" />
        </div>
      )}
      <div className="p-4">
        <div className="flex items-center gap-2 text-xs text-blue-300">
          <span className="uppercase tracking-wide">{article.category}</span>
          <span>•</span>
          <span>{article.published_at ? new Date(article.published_at).toLocaleDateString() : ''}</span>
        </div>
        <h3 className="mt-2 text-lg font-semibold text-white group-hover:text-blue-300 transition line-clamp-2">{article.title}</h3>
        <p className="mt-2 text-slate-300/80 line-clamp-3">{article.summary}</p>
      </div>
    </Link>
  )
}

export default ArticleCard
