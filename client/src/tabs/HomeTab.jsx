import { useState, useEffect } from 'react'
import axios from 'axios'
import { useAuth } from '../context/AuthContext'
import { FiZap } from 'react-icons/fi'
import './HomeTab.css'

function HomeTab() {
  const { user } = useAuth()
  const [streak, setStreak] = useState(0)
  const [poseOfDay, setPoseOfDay] = useState(null)
  const [herbs, setHerbs] = useState([])
  const [yogaPoses, setYogaPoses] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      // Update streak
      await axios.post('/api/users/streak')
      const userRes = await axios.get('/api/users/me')
      setStreak(userRes.data.streak || 0)

      // Fetch pose of day
      const poseRes = await axios.get('/api/yoga/pose-of-day')
      setPoseOfDay(poseRes.data)

      // Fetch herbs
      const herbsRes = await axios.get('/api/herbs/recommendations')
      setHerbs(herbsRes.data)

      // Fetch yoga poses (default if empty)
      try {
        const yogaRes = await axios.get('/api/yoga')
        setYogaPoses(yogaRes.data.slice(0, 5))
      } catch (error) {
        // Default yoga poses
        setYogaPoses([
          {
            name: "Tadasana",
            sanskritName: "Mountain Pose",
            description: "Foundation for all standing poses"
          },
          {
            name: "Vrikshasana",
            sanskritName: "Tree Pose",
            description: "Improves balance and concentration"
          },
          {
            name: "Adho Mukha Svanasana",
            sanskritName: "Downward Dog",
            description: "Stretches the entire body"
          }
        ])
      }
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  const renderStreakDays = () => {
    const days = []
    for (let i = 1; i <= 7; i++) {
      const isActive = i <= streak
      days.push(
        <div key={i} className={`streak-day ${isActive ? 'active' : 'inactive'}`}>
          {isActive ? '🔥' : i}
        </div>
      )
    }
    return days
  }

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
      </div>
    )
  }

  return (
    <div className="home-tab">
      <div className="container">
        {/* Welcome Section */}
        <div className="welcome-card card">
          <div className="welcome-content">
            <div className="welcome-icon">🧘</div>
            <div className="welcome-text">
              <h2>Welcome to <span className="highlight">VedaVerse</span></h2>
              <p>Find your balance between mind, body & nature.</p>
            </div>
          </div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: '60%' }}></div>
          </div>
        </div>

        {/* Streak Section */}
        <div className="section">
          <h3 className="section-title">Your Streak</h3>
          <div className="card">
            <div className="streak-container">
              {renderStreakDays()}
            </div>
            <div className="streak-info">
              <span className="streak-count">Streak: {streak} days</span>
              <span className="streak-icon">🔥</span>
            </div>
          </div>
        </div>

        {/* Pose of Day Section */}
        <div className="section">
          <h3 className="section-title">Today's Yoga Pose</h3>
          {poseOfDay && (
            <div className="card pose-card">
              <div className="pose-content">
                <div className="pose-info">
                  <h4>{poseOfDay.name}</h4>
                  <p className="pose-sanskrit">{poseOfDay.sanskritName}</p>
                  <p className="pose-description">{poseOfDay.description}</p>
                </div>
                <div className="pose-illustration">
                  <div className="pose-icon">🧘</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Jadi Buti Recommendations */}
        <div className="section">
          <h3 className="section-title">Jadi Buti Recommendations</h3>
          <div className="card-grid">
            {herbs.map((herb, idx) => (
              <div key={idx} className="herb-card card">
                <div className="herb-image">
                  <div className="herb-placeholder">🌿</div>
                </div>
                <div className="herb-content">
                  <h4>{herb.name}</h4>
                  <ul className="herb-benefits">
                    {herb.benefits?.map((benefit, i) => (
                      <li key={i}>{benefit}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Yoga Pose Tutorial */}
        <div className="section">
          <h3 className="section-title">Yoga Pose Tutorial</h3>
          <div className="card-grid">
            {yogaPoses.map((pose, idx) => (
              <div key={idx} className="yoga-card card">
                <div className="yoga-image">
                  <div className="yoga-placeholder">🧘</div>
                </div>
                <div className="yoga-content">
                  <h4>{pose.name}</h4>
                  <p className="yoga-sanskrit">{pose.sanskritName}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomeTab
