import { FiHome, FiBarChart2, FiShield, FiUser } from 'react-icons/fi'

function BottomNav({ activeTab, setActiveTab }) {
  const navItems = [
    { id: 'home', icon: FiHome, label: 'Home' },
    { id: 'report', icon: FiBarChart2, label: 'Report' },
    { id: 'consult', icon: FiShield, label: 'Consult' },
    { id: 'profile', icon: FiUser, label: 'Profile' }
  ]

  return (
    <nav className="bottom-nav">
      {navItems.map((item) => {
        const Icon = item.icon
        return (
          <div
            key={item.id}
            className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
            onClick={() => setActiveTab(item.id)}
          >
            <Icon className="nav-icon" />
            <span>{item.label}</span>
          </div>
        )
      })}
    </nav>
  )
}

export default BottomNav

