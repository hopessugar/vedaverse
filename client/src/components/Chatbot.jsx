import { useState, useRef, useEffect } from 'react'
import { FiSend, FiX, FiMessageCircle } from 'react-icons/fi'
import axios from 'axios'
import './Chatbot.css'

function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Hello! I\'m your Ayurvedic personal assistant. How can I help you today?'
    }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const sendMessage = async () => {
    if (!input.trim() || loading) return

    const userMessage = {
      role: 'user',
      content: input
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setLoading(true)

    try {
      const response = await axios.post('/api/chat', {
        message: input,
        context: messages.slice(-5) // Last 5 messages for context
      })

      const assistantMessage = {
        role: 'assistant',
        content: response.data.response
      }

      setMessages(prev => [...prev, assistantMessage])
    } catch (error) {
      console.error('Chat error:', error)
      const errorMessage = {
        role: 'assistant',
        content: 'Sorry, I\'m having trouble connecting. Please try again later.'
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setLoading(false)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <>
      {!isOpen && (
        <button
          className="chatbot-toggle"
          onClick={() => setIsOpen(true)}
          aria-label="Open chatbot"
        >
          <FiMessageCircle />
        </button>
      )}

      {isOpen && (
        <div className="chatbot-container">
          <div className="chatbot-header">
            <div className="chatbot-header-left">
              <FiMessageCircle />
              <span>Ayurvedic Assistant</span>
            </div>
            <button
              className="chatbot-close"
              onClick={() => setIsOpen(false)}
              aria-label="Close chatbot"
            >
              <FiX />
            </button>
          </div>

          <div className="chatbot-messages">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`chatbot-message ${msg.role === 'user' ? 'user' : 'assistant'}`}
              >
                <div className="message-content">{msg.content}</div>
              </div>
            ))}
            {loading && (
              <div className="chatbot-message assistant">
                <div className="message-content">
                  <div className="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="chatbot-input-container">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me anything about Ayurveda..."
              className="chatbot-input"
              disabled={loading}
            />
            <button
              onClick={sendMessage}
              disabled={loading || !input.trim()}
              className="chatbot-send"
            >
              <FiSend />
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default Chatbot

