import { Link, useParams } from 'react-router-dom'
import { useArticles } from './ArticlesContext.tsx'

function ArticleDetail() {
  const { id } = useParams<'id'>()
  const { articles, loading, error, likeArticle, toggleFavourite } = useArticles()

  if (loading) {
    return <p className="status-message">Loading article…</p>
  }

  if (error) {
    return <p className="status-message status-error">{error}</p>
  }

const article = id ? articles.find(a => String(a.id) === id) : undefined

  if (!article) {
    return (
      <p className="empty-state">
        No article with id "{id}". <Link to="/articles">Back to articles</Link>
      </p>
    )
  }

  return (
    <div className="article-grid">
      <div className="card">
        <h3>{article.title}</h3>
        <p>{article.category} · {article.author}</p>
        <p>{article.description}</p>
        <p>Likes: {article.likes}</p>

        {article.isFavourite && <span className="badge">★ Favourite</span>}

        <div className="btn-row">
          <button onClick={() => likeArticle(article.id)}>Like</button>
          <button onClick={() => toggleFavourite(article.id)}>
            {article.isFavourite ? 'Unfavourite' : 'Favourite'}
          </button>
        </div>

        <p><Link to="/articles">Back to articles</Link></p>
      </div>
    </div>
  )
}

export default ArticleDetail