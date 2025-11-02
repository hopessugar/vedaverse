import { FiZap } from 'react-icons/fi'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

function Header() {
  const { user } = useAuth()
  const navigate = useNavigate()

  return (
    <header className="header">
      <div className="header-left">
        <FiZap className="header-logo" />
        <span className="header-logo">vedaVerse</span>
      </div>
      <div className="header-right">
        <div className="profile-icon" onClick={() => navigate('/profile')}>
          {user?.username?.charAt(0).toUpperCase() || 'U'}
        </div>
      </div>
    </header>
  )
}

export default Header
