import { useArticles } from './ArticlesContext.tsx'
import type { User } from './types'

interface DashboardProps {
  user: User
}

function Dashboard({ user }: DashboardProps) {

  const { articles, loading, error } = useArticles()

  if (loading) {
    return <p className="status-message">Loading dashboard…</p>
  }

  if (error) {
    return <p className="status-message status-error">{error}</p>
  }

  const totalArticles = articles.length
  const totalLikes = articles.reduce((sum, article) => sum + article.likes, 0)
  const favouriteCount = articles.filter(article => article.isFavourite).length

  return (
    <div className="dashboard">
      <h2>Welcome back, {user.name}</h2>
      <p className="dashboard-subtitle">Here's how KnowledgeHub is doing today.</p>

      <div className="stat-row">
        <div className="stat-card">
          <span className="stat-value">{totalArticles}</span>
          <span className="stat-label">Articles</span>
        </div>

        <div className="stat-card">
          <span className="stat-value">{totalLikes}</span>
          <span className="stat-label">Total likes</span>
        </div>

        <div className="stat-card">
          <span className="stat-value">{favouriteCount}</span>
          <span className="stat-label">Favourites</span>
        </div>
      </div>
    </div>
  )
}

export default Dashboard