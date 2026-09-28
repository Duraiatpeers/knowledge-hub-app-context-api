import { useNavigate } from 'react-router-dom'
import { useArticles } from './ArticlesContext.tsx'
import type { Article } from './types'

interface ArticleCardProps {
  article: Article
}

function ArticleCard({ article }: ArticleCardProps) {

  const navigate = useNavigate()
  const { likeArticle, toggleFavourite } = useArticles()
  const { id, title, author, description, likes, isFavourite } = article

  return (
    <div className="card">
      <h3>{title}</h3>
      <p>{author}</p>
      <p>{description}</p>
      <p>Likes: {likes}</p>
      {isFavourite && <span className="badge">★ Favourite</span>}

      <div className="btn-row">
        <button onClick={() => navigate(`/articles/${id}`)}>View</button>
        <button onClick={() => likeArticle(id)}>Like</button>
        <button onClick={() => toggleFavourite(id)}>
          {isFavourite ? 'Unfavourite' : 'Favourite'}
        </button>
      </div>
    </div>
  )
}

export default ArticleCard