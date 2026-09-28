import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import axios from 'axios'
import type { Article } from './types'

const ARTICLES_URL = 'http://localhost:3001/articles'

interface ArticlesContextValue {
  articles: Article[]
  loading: boolean
  error: string | null
  likeArticle: (id: number) => void
  toggleFavourite: (id: number) => void
}

const ArticlesContext = createContext<ArticlesContextValue | undefined>(undefined)

export function ArticlesProvider({ children }: { children: ReactNode }) {

  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true

    async function fetchArticles() {
      try {
        const response = await axios.get<Article[]>(ARTICLES_URL)
        if (isMounted) {
          setArticles(response.data)
          setError(null)
        }
      } catch (err) {
        console.error('Failed to fetch articles:', err)
        if (isMounted) {
          setError('Could not load articles. Is json-server running on port 3001?')
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    fetchArticles()

    return () => {
      isMounted = false
    }
  }, [])

  const likeArticle = (id: number) => {
    setArticles(prev =>
      prev.map(a =>
        a.id === id ? { ...a, likes: a.likes + 1 } : a
      )
    )
  }

  const toggleFavourite = (id: number) => {
    setArticles(prev =>
      prev.map(a =>
        a.id === id ? { ...a, isFavourite: !a.isFavourite } : a
      )
    )
  }

  return (
    <ArticlesContext.Provider value={{ articles, loading, error, likeArticle, toggleFavourite }}>
      {children}
    </ArticlesContext.Provider>
  )
}

export function useArticles() {
  const ctx = useContext(ArticlesContext)
  if (!ctx) {
    throw new Error('useArticles must be used within an ArticlesProvider')
  }
  return ctx
}