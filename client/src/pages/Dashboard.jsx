import { useState } from 'react'
import Header from '../components/Header'
import BottomNav from '../components/BottomNav'
import HomeTab from '../tabs/HomeTab'
import ReportTab from '../tabs/ReportTab'
import ConsultTab from '../tabs/ConsultTab'
import ProfileTab from '../tabs/ProfileTab'
import Chatbot from '../components/Chatbot'
import '../App.css'

function Dashboard() {
  const [activeTab, setActiveTab] = useState('home')

  const renderTab = () => {
    switch (activeTab) {
      case 'home':
        return <HomeTab />
      case 'report':
        return <ReportTab />
      case 'consult':
        return <ConsultTab />
      case 'profile':
        return <ProfileTab />
      default:
        return <HomeTab />
    }
  }

  return (
    <div className="app">
      <Header />
      <div className="content">
        {renderTab()}
      </div>
      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab === 'report' && <Chatbot />}
    </div>
  )
}

export default Dashboard

