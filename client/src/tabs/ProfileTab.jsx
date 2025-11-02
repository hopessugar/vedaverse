import { useState, useEffect } from 'react'
import axios from 'axios'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { FiEdit, FiLock, FiShield, FiHelpCircle, FiLogOut, FiBarChart2, FiCalendar, FiBookOpen } from 'react-icons/fi'
import './ProfileTab.css'

function ProfileTab() {
  const { user, logout, fetchUser } = useAuth()
  const navigate = useNavigate()
  const [userData, setUserData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchUserData()
  }, [user])

  const fetchUserData = async () => {
    try {
      const res = await axios.get('/api/users/me')
      setUserData(res.data)
    } catch (error) {
      console.error('Error fetching user data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      logout()
      navigate('/login')
    }
  }

  if (loading) {
    return (
      <div className="profile-loading">
        <div className="spinner"></div>
      </div>
    )
  }

  return (
    <div className="profile-tab">
      <div className="container">
        <h1 className="page-title">My Profile</h1>

        {/* Profile Info */}
        <div className="profile-header">
          <div className="profile-avatar-container">
            <div className="profile-avatar">
              {userData?.username?.charAt(0).toUpperCase() || 'U'}
            </div>
            <button className="avatar-edit">
              <FiEdit />
            </button>
          </div>
          <h2 className="profile-name">{userData?.username || 'User'}</h2>
          <p className="profile-email">{userData?.email || ''}</p>
        </div>

        {/* Wellness Snapshot */}
        <div className="section">
          <h2 className="section-title">Your Wellness Snapshot</h2>
          <p className="section-subtitle">Key insights into your health.</p>
          
          <div className="snapshot-grid">
            <div className="card snapshot-card">
              <div className="snapshot-icon">🌿</div>
              <p className="snapshot-label">Prakriti Type</p>
              <p className="snapshot-value">{userData?.prakritiType || 'Not determined'}</p>
            </div>
            <div className="card snapshot-card">
              <div className="snapshot-icon">🧘</div>
              <p className="snapshot-label">Avg. Stress Level</p>
              <p className="snapshot-value">{userData?.stressLevel || 'Moderate'}</p>
            </div>
          </div>

          <button className="btn btn-outline view-report-btn">
            <FiBarChart2 /> View Detailed Report
          </button>
        </div>

        {/* Wellness Journey */}
        <div className="section">
          <h2 className="section-title">Your Wellness Journey</h2>
          <p className="section-subtitle">Track your progress and access resources.</p>
          
          <div className="journey-card card">
            <div className="journey-item">
              <div className="journey-icon">
                <FiCalendar />
              </div>
              <div className="journey-content">
                <h3>My Appointments</h3>
                <p>View past & upcoming consultations</p>
              </div>
              <div className="journey-arrow">→</div>
            </div>
          </div>

          <div className="journey-card card">
            <div className="journey-item">
              <div className="journey-icon">
                <FiBookOpen />
              </div>
              <div className="journey-content">
                <h3>My Plans & Recommendations</h3>
                <p>Ayurveda, Yoga, Diet plans & insights</p>
              </div>
              <div className="journey-arrow">→</div>
            </div>
          </div>
        </div>

        {/* Manage Account */}
        <div className="section">
          <h2 className="section-title">Manage Your Account</h2>
          <p className="section-subtitle">Update info and get support.</p>
          
          <div className="account-menu">
            <div className="menu-item">
              <div className="menu-icon">
                <FiEdit />
              </div>
              <span className="menu-text">Edit Profile Info</span>
              <div className="menu-arrow">→</div>
            </div>
            <div className="menu-item">
              <div className="menu-icon">
                <FiLock />
              </div>
              <span className="menu-text">Change Password</span>
              <div className="menu-arrow">→</div>
            </div>
            <div className="menu-item">
              <div className="menu-icon">
                <FiShield />
              </div>
              <span className="menu-text">Privacy Policy</span>
              <div className="menu-arrow">→</div>
            </div>
            <div className="menu-item">
              <div className="menu-icon">
                <FiHelpCircle />
              </div>
              <span className="menu-text">Help & Support</span>
              <div className="menu-arrow">→</div>
            </div>
            <div className="menu-item logout-item" onClick={handleLogout}>
              <div className="menu-icon logout-icon">
                <FiLogOut />
              </div>
              <span className="menu-text logout-text">Logout</span>
            </div>
          </div>
        </div>

        {/* App Version */}
        <div className="app-version">
          <p>App Version 1.2.0</p>
        </div>
      </div>
    </div>
  )
}

export default ProfileTab

