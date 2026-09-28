import { useArticles } from './ArticlesContext.tsx'
import ArticleCard from './ArticleCard.tsx'

function ArticleList() {

  const { articles, loading, error } = useArticles()

  if (loading) {
    return <p className="status-message">Loading articles…</p>
  }

  if (error) {
    return <p className="status-message status-error">{error}</p>
  }

  if (articles.length === 0) {
    return <p className="empty-state">No articles yet. Check back soon.</p>
  }

  return (
    <div className="article-grid">
      {articles.map(article => (
        <ArticleCard
          key={article.id}
          article={article}
        />
      ))}
    </div>
  )
}

export default ArticleList