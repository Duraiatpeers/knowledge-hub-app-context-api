import { useState } from 'react'
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import './App.css'
import Header from './Header.tsx'
import Footer from './Footer.tsx'
import Login from './Login.tsx'
import Dashboard from './Dashboard.tsx'
import ArticleList from './ArticleList.tsx'
import ArticleDetail from './ArticleDetail.tsx'
import NotFound from './NotFound.tsx'
import { ArticlesProvider } from './ArticlesContext.tsx'
import type { User } from './types'

function App() {

  const [user, setUser] = useState<User | null>(null)

  const navigate = useNavigate()

  const handleLoginSuccess = (loggedInUser: User) => {
    setUser(loggedInUser)
    navigate('/dashboard')
  }

  const handleLogout = () => {
    setUser(null)
  }

  return (
    <ArticlesProvider>
      {user && <Header user={user} onLogout={handleLogout} />}

      <Routes>
        <Route
          path="/"
          element={<Navigate to={user ? '/dashboard' : '/login'} replace />}
        />

        <Route
          path="/login"
          element={
            user
              ? <Navigate to="/dashboard" replace />
              : <Login onLoginSuccess={handleLoginSuccess} />
          }
        />

        <Route
          path="/dashboard"
          element={
            user
              ? <Dashboard user={user} />
              : <Navigate to="/login" replace />
          }
        />

        <Route
          path="/articles"
          element={
            user
              ? <ArticleList />
              : <Navigate to="/login" replace />
          }
        />

        <Route
          path="/articles/:id"
          element={
            user
              ? <ArticleDetail />
              : <Navigate to="/login" replace />
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>

      {user && <Footer />}
    </ArticlesProvider>
  )
}

export default App