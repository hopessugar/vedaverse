import { useState, useEffect } from 'react'
import axios from 'axios'
import { useAuth } from '../context/AuthContext'
import { FiUpload, FiCamera, FiVideo, FiCheckCircle } from 'react-icons/fi'
import './ReportTab.css'

function ReportTab() {
  const { user } = useAuth()
  const [showPrakartiQuiz, setShowPrakartiQuiz] = useState(false)
  const [prakartiQuestions, setPrakartiQuestions] = useState([])
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState([])
  const [prakartiResult, setPrakartiResult] = useState(null)
  const [stressLevel, setStressLevel] = useState(50)
  const [selectedPreferences, setSelectedPreferences] = useState([])
  const [showPlanForm, setShowPlanForm] = useState(false)
  const [generalAnswers, setGeneralAnswers] = useState({})
  const [selectedDiseases, setSelectedDiseases] = useState([])
  const [diseaseQuestions, setDiseaseQuestions] = useState({})
  const [diseaseAnswers, setDiseaseAnswers] = useState({})
  const [generalQuestions, setGeneralQuestions] = useState([])
  const [plan, setPlan] = useState(null)
  const [loading, setLoading] = useState(false)

  const dietaryPreferences = ['Vegan', 'Vegetarian', 'Gluten-Free', 'Dairy-Free', 'Organic', 'Processed-Free']
  const diseases = [
    'Obesity', 'Diabetes', 'Hypertension', 'Cholesterol/Lipid',
    'PCOD/PCOS', 'Asthma', 'Cardiac', 'Cancer (Breast/Prostate)',
    'Tobacco/Alcohol', 'Physical inactivity', 'Unhealthy diet',
    'Climate or air pollution'
  ]

  const startPrakartiQuiz = async () => {
    try {
      const res = await axios.get('/api/prakarti/quiz')
      setPrakartiQuestions(res.data.questions)
      setShowPrakartiQuiz(true)
      setCurrentQuestion(0)
      setAnswers([])
    } catch (error) {
      console.error('Error loading quiz:', error)
    }
  }

  const handlePrakartiAnswer = (answer) => {
    const newAnswers = [...answers, answer]
    setAnswers(newAnswers)

    if (currentQuestion < prakartiQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      submitPrakartiQuiz(newAnswers)
    }
  }

  const submitPrakartiQuiz = async (finalAnswers) => {
    try {
      setLoading(true)
      const res = await axios.post('/api/prakarti/quiz', { answers: finalAnswers })
      setPrakartiResult(res.data)
      setShowPrakartiQuiz(false)
    } catch (error) {
      console.error('Error submitting quiz:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleFileUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    const formData = new FormData()
    formData.append('report', file)
    formData.append('type', 'Lab Report')

    try {
      setLoading(true)
      const res = await axios.post('/api/reports/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      alert('Report analyzed successfully! Check the analysis below.')
    } catch (error) {
      console.error('Error uploading report:', error)
      alert('Error analyzing report. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const startPlanGeneration = async () => {
    try {
      setLoading(true)
      const res = await axios.get('/api/plans/questions/general')
      const questions = res.data.questions || []
      console.log('Loaded general questions:', questions.length)
      if (questions.length === 0) {
        alert('No questions loaded. Please check backend connection.')
        return
      }
      setGeneralQuestions(questions)
      setGeneralAnswers({})
      setSelectedDiseases([])
      setDiseaseQuestions({})
      setDiseaseAnswers({})
      setPlan(null)
      setShowPlanForm(true)
      
      // Scroll to questions after a moment
      setTimeout(() => {
        const questionsSection = document.querySelector('.questions-section')
        if (questionsSection) {
          questionsSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      }, 200)
    } catch (error) {
      console.error('Error loading questions:', error)
      alert('Error loading questions. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleDiseaseSelection = async () => {
    if (selectedDiseases.length === 0) {
      alert('Please select at least one disease')
      return
    }

    try {
      setLoading(true)
      console.log('🔄 Loading disease questions for:', selectedDiseases[0])
      
      // Get questions for the first selected disease
      const primaryDisease = selectedDiseases[0]
      const res = await axios.get(`/api/plans/questions/disease/${encodeURIComponent(primaryDisease)}`)
      
      console.log('✅ Disease questions API response:', res.data)
      
      if (!res.data || !res.data.questions || res.data.questions.length === 0) {
        alert(`⚠️ No questions found for "${primaryDisease}".\n\nPlease:\n1. Check if the disease name is correct\n2. Try a different disease\n3. Check server console for errors`)
        setLoading(false)
        return
      }
      
      const formattedQuestions = {}
      res.data.questions?.forEach(q => {
        if (q && q.id) {
          formattedQuestions[q.id] = q
        }
      })
      
      console.log('📦 Formatted disease questions:', Object.keys(formattedQuestions).length, 'questions')
      console.log('📋 Question IDs:', Object.keys(formattedQuestions))
      
      // Set disease questions - this will trigger the disease questions section to appear
      if (Object.keys(formattedQuestions).length > 0) {
        setDiseaseQuestions(formattedQuestions)
        setDiseaseAnswers({})
        
        // Scroll to disease questions section after React renders it
        setTimeout(() => {
          const diseaseQuestionsSection = document.querySelector('.disease-questions-section')
          if (diseaseQuestionsSection) {
            console.log('✅ Found disease questions section, scrolling...')
            diseaseQuestionsSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
          } else {
            console.warn('⚠️ Disease questions section not found in DOM yet. Retrying...')
            // Retry after React has a chance to render
            setTimeout(() => {
              const retrySection = document.querySelector('.disease-questions-section')
              if (retrySection) {
                console.log('✅ Found on retry, scrolling...')
                retrySection.scrollIntoView({ behavior: 'smooth', block: 'start' })
              } else {
                console.error('❌ Disease questions section still not found after retry')
              }
            }, 1000)
          }
        }, 500)
      } else {
        alert(`⚠️ Failed to format questions for "${primaryDisease}".\n\nQuestions received: ${res.data.questions?.length || 0}\n\nPlease try again or contact support.`)
      }
    } catch (error) {
      console.error('❌ Error loading disease questions:', error)
      console.error('Error response:', error.response?.data)
      const errorMessage = error.response?.data?.message || error.message || 'Unknown error occurred'
      alert(`❌ Error loading disease questions!\n\n${errorMessage}\n\nPlease check:\n1. Backend server is running\n2. You are logged in\n3. Disease name is valid\n4. Check browser console (F12) for details`)
      // Keep disease selection visible on error - don't close the form
    } finally {
      setLoading(false)
    }
  }

  const generatePlan = async () => {
    try {
      // Validate required fields
      if (!prakartiResult || !prakartiResult.prakritiType) {
        alert('Please complete the Prakarti quiz first to determine your dosha type.')
        return
      }
      
      if (selectedDiseases.length === 0) {
        alert('Please select at least one disease or condition.')
        return
      }
      
      setLoading(true)
      // Format disease answers properly - group by disease
      const formattedDiseaseAnswers = {}
      selectedDiseases.forEach(disease => {
        formattedDiseaseAnswers[disease] = diseaseAnswers
      })

      const res = await axios.post('/api/plans/generate', {
        prakritiType: prakartiResult.prakritiType,
        diseases: selectedDiseases,
        generalAnswers,
        diseaseAnswers: formattedDiseaseAnswers,
        dietaryPreferences: selectedPreferences,
        stressLevel: getStressLevelText(stressLevel)
      })
      
      console.log('✅ Plan generation response received:', res.data)
      
      // Backend returns { plan: {...}, planId: ..., savedPlan: ..., message: ... }
      const planData = res.data.plan || res.data
      
      console.log('📦 Plan data extracted:', planData)
      console.log('📊 Plan contents:', {
        yogaPoses: planData?.yogaPoses?.length || 0,
        foodsToEat: planData?.dietPlan?.foodsToEat?.length || 0,
        foodsToAvoid: planData?.dietPlan?.foodsToAvoid?.length || 0,
        lifestyleTips: planData?.lifestyleTips?.length || 0,
        herbalRecommendations: planData?.herbalRecommendations?.length || 0,
        hasDiagnosticRationale: !!planData?.diagnosticRationale,
        cautions: planData?.cautions?.length || 0
      })
      
      if (!planData || Object.keys(planData).length === 0) {
        alert('⚠️ Plan was generated but is empty. Check console for details.')
        console.error('Empty plan received:', res.data)
        return
      }
      
      setPlan(planData)
      // Keep plan form open so user can see the plan, but hide the questions
      setShowPlanForm(false)
      
      // Scroll to plan display after a brief delay
      setTimeout(() => {
        const planDisplay = document.querySelector('.plan-display')
        if (planDisplay) {
          planDisplay.scrollIntoView({ behavior: 'smooth', block: 'start' })
        } else {
          console.error('❌ Plan display element not found! Plan was set but UI not updated.')
        }
      }, 800)
    } catch (error) {
      console.error('Error generating plan:', error)
      console.error('Error details:', error.response?.data)
      const errorMessage = error.response?.data?.error || error.response?.data?.message || 'Unknown error occurred'
      alert(`Error generating plan: ${errorMessage}. Please try again.`)
    } finally {
      setLoading(false)
    }
  }

  const getStressLevelText = (level) => {
    if (level < 33) return 'Low'
    if (level < 66) return 'Moderate'
    return 'High'
  }

  return (
    <div className="report-tab">
      <div className="container">
        {/* Prakarti Section */}
        <div className="section">
          <h2 className="section-title">What's Your Dosha?</h2>
          <p className="section-subtitle">Share your current health concerns & goals.</p>
          {!prakartiResult ? (
            <button className="btn btn-primary prakarti-btn" onClick={startPrakartiQuiz}>
              <span>👤</span> Let's Check It
            </button>
          ) : (
            <div className="card prakarti-result">
              <h3>Your Prakriti Type: <span className="prakarti-type">{prakartiResult.prakritiType}</span></h3>
              <p>Based on your answers, you have a {prakartiResult.prakritiType} constitution.</p>
            </div>
          )}
        </div>

        {/* Prakarti Quiz Modal */}
        {showPrakartiQuiz && (
          <div className="quiz-modal">
            <div className="quiz-content">
              <div className="quiz-progress">
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{ width: `${((currentQuestion + 1) / prakartiQuestions.length) * 100}%` }}
                  ></div>
                </div>
                <span className="progress-text">
                  Question {currentQuestion + 1} of {prakartiQuestions.length}
                </span>
              </div>

              {prakartiQuestions[currentQuestion] && (
                <div className="quiz-question">
                  <h3>{prakartiQuestions[currentQuestion].question}</h3>
                  <div className="quiz-options">
                    {prakartiQuestions[currentQuestion].options.map((option, idx) => (
                      <button
                        key={idx}
                        className="btn btn-outline option-btn"
                        onClick={() => handlePrakartiAnswer(option.value)}
                      >
                        {option.text}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Visual Insights Section */}
        <div className="section">
          <h2 className="section-title">Add Visual Insights</h2>
          <p className="section-subtitle">Photos can help us understand better.</p>
          <div className="upload-buttons">
            <label className="upload-btn">
              <FiCamera />
              <span>Take Photo</span>
              <input type="file" accept="image/*" onChange={handleFileUpload} style={{ display: 'none' }} />
            </label>
            <label className="upload-btn">
              <FiUpload />
              <span>Upload</span>
              <input type="file" accept="image/*,.pdf,.doc,.docx" onChange={handleFileUpload} style={{ display: 'none' }} />
            </label>
            <label className="upload-btn">
              <FiVideo />
              <span>Record Video</span>
              <input type="file" accept="video/*" onChange={handleFileUpload} style={{ display: 'none' }} />
            </label>
          </div>
          <p className="upload-hint">Tap to add photos or videos</p>
        </div>

        {/* About You Section */}
        <div className="section">
          <h2 className="section-title">About You</h2>

          {/* Stress Level */}
          <div className="card">
            <label className="input-label">Current Stress Level</label>
            <div className="slider-container">
              <span className="emoji">😊</span>
              <input
                type="range"
                min="0"
                max="100"
                value={stressLevel}
                onChange={(e) => setStressLevel(e.target.value)}
                className="slider"
              />
              <span className="emoji">😔</span>
            </div>
            <p className="stress-level-text">{getStressLevelText(stressLevel)}</p>
          </div>

          {/* Dietary Preferences */}
          <div className="card">
            <label className="input-label">Dietary Preferences</label>
            <div className="preference-grid">
              {dietaryPreferences.map((pref) => (
                <button
                  key={pref}
                  className={`btn preference-btn ${selectedPreferences.includes(pref) ? 'active' : ''}`}
                  onClick={() => {
                    if (selectedPreferences.includes(pref)) {
                      setSelectedPreferences(selectedPreferences.filter(p => p !== pref))
                    } else {
                      setSelectedPreferences([...selectedPreferences, pref])
                    }
                  }}
                >
                  {pref}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Get Personalized Plan Section */}
        <div className="section">
          <h2 className="section-title">Get Personalized Plan</h2>
          <p className="section-subtitle">Get a customized Ayurvedic wellness plan</p>
          <button className="btn btn-primary" onClick={startPlanGeneration}>
            <FiCheckCircle /> Get Personalized Plan
          </button>
        </div>

        {/* Plan Generation Form */}
        {showPlanForm && (
          <div className="plan-form-section">
            {/* Debug info - remove in production */}
            {process.env.NODE_ENV === 'development' && (
              <div style={{ padding: '10px', background: '#f0f0f0', marginBottom: '10px', fontSize: '12px' }}>
                Debug: Questions: {generalQuestions.length}, Answers: {Object.keys(generalAnswers).length}, 
                Diseases Selected: {selectedDiseases.length}, Disease Questions: {Object.keys(diseaseQuestions).length}
              </div>
            )}

            {/* General Questions Section */}
            {generalQuestions.length > 0 && Object.keys(generalAnswers).length < generalQuestions.length && (
              <div className="questions-section">
                <h3 className="section-title">General Questions (Vikriti Assessment)</h3>
                <p className="section-subtitle">
                  Answer these questions about your current imbalances 
                  <strong> ({Object.keys(generalAnswers).length} of {generalQuestions.length} answered)</strong>
                </p>
                <div style={{ marginBottom: '20px', padding: '10px', background: '#fff3cd', borderRadius: '8px', border: '1px solid #ffc107' }}>
                  <strong>💡 Tip:</strong> Answer all {generalQuestions.length} questions to continue. Scroll down to see all questions.
                </div>
                {generalQuestions.map((q) => (
                  <div key={q.id} className="question-card">
                    <h4 className="question-text">{q.question}</h4>
                    <div className="options-grid">
                      {q.options.map((opt) => (
                        <button
                          key={opt.value}
                          className={`btn option-btn ${generalAnswers[q.id] === opt.value ? 'active' : ''}`}
                          onClick={() => {
                            const newAnswers = { ...generalAnswers, [q.id]: opt.value }
                            setGeneralAnswers(newAnswers)
                            console.log('Answers updated:', Object.keys(newAnswers).length, 'of', generalQuestions.length)
                            
                            // Auto-scroll to disease selection when all questions answered
                            if (Object.keys(newAnswers).length === generalQuestions.length) {
                              console.log('All questions answered! Showing disease selection...')
                              setTimeout(() => {
                                const diseaseSection = document.querySelector('.diseases-section')
                                if (diseaseSection) {
                                  diseaseSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
                                }
                              }, 500)
                            }
                          }}
                        >
                          {opt.text}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Diseases Selection Section - Show after general questions are answered, hide when disease questions are loaded */}
            {generalQuestions.length > 0 && 
             Object.keys(generalAnswers).length === generalQuestions.length && 
             Object.keys(diseaseQuestions).length === 0 && 
             !loading && (
              <div className="diseases-section" style={{ 
                marginTop: '32px', 
                padding: '24px', 
                borderTop: '3px solid #10b981',
                background: '#f0fdf4',
                borderRadius: '12px'
              }}>
                <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                  <h3 className="section-title" style={{ color: '#10b981', fontSize: '24px' }}>
                    ✅ All {generalQuestions.length} General Questions Answered!
                  </h3>
                  <p className="section-subtitle" style={{ marginTop: '10px', fontSize: '16px' }}>
                    Great job! Now select the diseases or conditions you'd like to address:
                  </p>
                </div>
                <h4 className="section-title" style={{ marginBottom: '16px' }}>Select Diseases/Conditions</h4>
              <div className="diseases-grid">
                {diseases.map((disease) => (
                  <button
                    key={disease}
                    className={`btn disease-btn ${selectedDiseases.includes(disease) ? 'active' : ''}`}
                    onClick={() => {
                      if (selectedDiseases.includes(disease)) {
                        setSelectedDiseases(selectedDiseases.filter(d => d !== disease))
                      } else {
                        setSelectedDiseases([...selectedDiseases, disease])
                      }
                    }}
                  >
                    {disease}
                  </button>
                ))}
              </div>
              <button 
                className="btn btn-primary" 
                onClick={handleDiseaseSelection}
                disabled={selectedDiseases.length === 0}
                style={{ 
                  marginTop: '20px',
                  padding: '14px 28px',
                  fontSize: '16px',
                  fontWeight: '600'
                }}
              >
                {selectedDiseases.length > 0 
                  ? `Continue with ${selectedDiseases.length} Selected` 
                  : 'Please Select at Least One Disease'}
              </button>
              </div>
            )}

            {/* Disease-Specific Questions Section - Show after disease is selected and questions are loaded */}
            {Object.keys(diseaseQuestions).length > 0 && (
              <div className="disease-questions-section" style={{ 
                marginTop: '32px', 
                padding: '24px', 
                borderTop: '3px solid #8b5cf6',
                background: '#faf5ff',
                borderRadius: '12px'
              }}>
                <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                  <h3 className="section-title" style={{ color: '#7c3aed', fontSize: '24px' }}>
                    🎯 Disease-Specific Questions for {selectedDiseases[0] || 'Selected Disease'}
                  </h3>
                  <p className="section-subtitle" style={{ marginTop: '10px', fontSize: '16px' }}>
                    Answer these questions about your specific condition
                    <strong> ({Object.keys(diseaseAnswers).length} of {Object.keys(diseaseQuestions).length} answered)</strong>
                  </p>
                </div>
                {Object.values(diseaseQuestions).map((q) => (
                  <div key={q.id} className="question-card">
                    <h4 className="question-text">{q.question}</h4>
                    <div className="options-grid">
                      {q.options.map((opt) => (
                        <button
                          key={opt.value}
                          className={`btn option-btn ${diseaseAnswers[q.id] === opt.value ? 'active' : ''}`}
                          onClick={() => {
                            setDiseaseAnswers({ ...diseaseAnswers, [q.id]: opt.value })
                          }}
                        >
                          {opt.text}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
                <div style={{ 
                  marginTop: '32px', 
                  padding: '20px', 
                  background: '#f0fdf4',
                  borderRadius: '12px',
                  border: '2px solid #10b981',
                  textAlign: 'center'
                }}>
                  <p style={{ marginBottom: '16px', fontSize: '16px', color: '#065f46' }}>
                    {Object.keys(diseaseAnswers).length === Object.keys(diseaseQuestions).length 
                      ? '✅ All questions answered! Ready to generate your personalized plan.'
                      : `Answer ${Object.keys(diseaseQuestions).length - Object.keys(diseaseAnswers).length} more question(s) to continue.`
                    }
                  </p>
                  <button 
                    className="btn btn-primary" 
                    onClick={generatePlan}
                    disabled={Object.keys(diseaseAnswers).length < Object.keys(diseaseQuestions).length}
                    style={{ 
                      padding: '16px 48px',
                      fontSize: '18px',
                      fontWeight: '600',
                      minWidth: '250px',
                      opacity: Object.keys(diseaseAnswers).length < Object.keys(diseaseQuestions).length ? 0.6 : 1
                    }}
                  >
                    {Object.keys(diseaseAnswers).length === Object.keys(diseaseQuestions).length
                      ? '🚀 Generate My Personalized Plan'
                      : `Answer ${Object.keys(diseaseQuestions).length - Object.keys(diseaseAnswers).length} More Question(s)`
                    }
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Generated Plan Display - Always show when plan exists */}
        {plan && (
          <div className="plan-display" style={{ marginTop: '40px', paddingTop: '32px', borderTop: '4px solid #10b981', minHeight: '400px' }}>
            <div style={{ textAlign: 'center', marginBottom: '40px', padding: '24px', background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', borderRadius: '16px', color: 'white' }}>
              <h2 className="section-title" style={{ color: 'white', fontSize: '32px', marginBottom: '10px' }}>
                🎉 Your Personalized Ayurvedic Plan
              </h2>
              <p style={{ fontSize: '18px', opacity: 0.95 }}>
                Tailored specifically for your dosha type and health conditions
              </p>
            </div>

            {/* Diagnostic Rationale */}
            {plan.diagnosticRationale && (
              <div className="plan-section" style={{ marginBottom: '32px' }}>
                <div className="card" style={{ background: '#f0f9ff', borderLeft: '4px solid #3b82f6', padding: '20px' }}>
                  <h3 style={{ color: '#1e40af', marginBottom: '16px' }}>📋 Diagnosis & Analysis</h3>
                  <div style={{ whiteSpace: 'pre-line', lineHeight: '1.8', color: '#1f2937' }}>
                    {plan.diagnosticRationale}
                  </div>
                </div>
              </div>
            )}

            {/* Yoga Poses */}
            {plan.yogaPoses && plan.yogaPoses.length > 0 && (
              <div className="plan-section" style={{ marginBottom: '32px' }}>
                <h3 className="section-title" style={{ fontSize: '24px', marginBottom: '20px' }}>🧘 Yoga & Pranayama</h3>
                <div style={{ display: 'grid', gap: '16px' }}>
                  {plan.yogaPoses.map((pose, idx) => (
                    <div key={idx} className="card" style={{ padding: '20px', borderLeft: '4px solid #10b981' }}>
                      <h4 style={{ fontSize: '18px', color: '#059669', marginBottom: '12px' }}>
                        {pose.name} {pose.sanskritName && `(${pose.sanskritName})`}
                      </h4>
                      {pose.description && <p style={{ marginBottom: '10px', lineHeight: '1.6' }}>{pose.description}</p>}
                      {pose.whyAyurvedic && (
                        <p style={{ marginTop: '10px', color: '#065f46', fontStyle: 'italic' }}>
                          <strong>Why this helps:</strong> {pose.whyAyurvedic}
                        </p>
                      )}
                      {pose.duration && <p style={{ marginTop: '8px', color: '#6b7280' }}><strong>Duration:</strong> {pose.duration}</p>}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Diet Plan */}
            {plan.dietPlan && (
              <div className="plan-section" style={{ marginBottom: '32px' }}>
                <h3 className="section-title" style={{ fontSize: '24px', marginBottom: '20px' }}>🍽️ Diet & Nutrition</h3>
                
                {plan.dietPlan.foodsToEat && plan.dietPlan.foodsToEat.length > 0 && (
                  <div className="card" style={{ marginBottom: '20px', background: '#f0fdf4', borderLeft: '4px solid #10b981' }}>
                    <h4 style={{ fontSize: '18px', color: '#059669', marginBottom: '16px' }}>✅ Foods to Eat</h4>
                    <div style={{ display: 'grid', gap: '12px' }}>
                      {plan.dietPlan.foodsToEat.map((food, idx) => (
                        <div key={idx} style={{ padding: '12px', background: 'white', borderRadius: '8px' }}>
                          <strong style={{ color: '#065f46' }}>{food.name}</strong>
                          {food.reason && <span style={{ color: '#6b7280', marginLeft: '8px' }}>— {food.reason}</span>}
                          {food.timing && <span style={{ color: '#9ca3af', marginLeft: '8px', fontSize: '14px' }}>({food.timing})</span>}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {plan.dietPlan.foodsToAvoid && plan.dietPlan.foodsToAvoid.length > 0 && (
                  <div className="card" style={{ marginBottom: '20px', background: '#fef2f2', borderLeft: '4px solid #ef4444' }}>
                    <h4 style={{ fontSize: '18px', color: '#dc2626', marginBottom: '16px' }}>❌ Foods to Avoid</h4>
                    <div style={{ display: 'grid', gap: '12px' }}>
                      {plan.dietPlan.foodsToAvoid.map((food, idx) => (
                        <div key={idx} style={{ padding: '12px', background: 'white', borderRadius: '8px' }}>
                          <strong style={{ color: '#991b1b' }}>{food.name}</strong>
                          {food.reason && <span style={{ color: '#6b7280', marginLeft: '8px' }}>— {food.reason}</span>}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {plan.dietPlan.mealSchedule && plan.dietPlan.mealSchedule.length > 0 && (
                  <div className="card" style={{ background: '#fffbeb', borderLeft: '4px solid #f59e0b' }}>
                    <h4 style={{ fontSize: '18px', color: '#d97706', marginBottom: '16px' }}>⏰ Meal Schedule</h4>
                    <div style={{ display: 'grid', gap: '12px' }}>
                      {plan.dietPlan.mealSchedule.map((meal, idx) => (
                        <div key={idx} style={{ padding: '12px', background: 'white', borderRadius: '8px' }}>
                          <strong>{meal.meal}</strong> <span style={{ color: '#6b7280' }}>— {meal.time}</span>
                          {meal.suggestions && meal.suggestions.length > 0 && (
                            <div style={{ marginTop: '8px', fontSize: '14px', color: '#4b5563' }}>
                              {meal.suggestions.join(', ')}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Lifestyle Tips */}
            {plan.lifestyleTips && plan.lifestyleTips.length > 0 && (
              <div className="plan-section" style={{ marginBottom: '32px' }}>
                <h3 className="section-title" style={{ fontSize: '24px', marginBottom: '20px' }}>🌅 Lifestyle & Daily Routine</h3>
                <div style={{ display: 'grid', gap: '16px' }}>
                  {plan.lifestyleTips.map((tip, idx) => (
                    <div key={idx} className="card" style={{ padding: '20px', borderLeft: '4px solid #8b5cf6' }}>
                      <strong style={{ fontSize: '16px', color: '#6d28d9', display: 'block', marginBottom: '8px' }}>
                        {tip.tip}
                      </strong>
                      {tip.reason && <p style={{ color: '#6b7280', lineHeight: '1.6', margin: 0 }}>{tip.reason}</p>}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Herbal Recommendations */}
            {plan.herbalRecommendations && plan.herbalRecommendations.length > 0 && (
              <div className="plan-section" style={{ marginBottom: '32px' }}>
                <h3 className="section-title" style={{ fontSize: '24px', marginBottom: '20px' }}>🌿 Herbal Remedies & Supplements</h3>
                <div style={{ display: 'grid', gap: '16px' }}>
                  {plan.herbalRecommendations.map((herb, idx) => (
                    <div key={idx} className="card" style={{ padding: '20px', borderLeft: '4px solid #059669', background: '#f0fdf4' }}>
                      <h4 style={{ fontSize: '18px', color: '#065f46', marginBottom: '12px' }}>{herb.herbName}</h4>
                      {herb.benefits && herb.benefits.length > 0 && (
                        <div style={{ marginBottom: '10px' }}>
                          <strong style={{ color: '#059669' }}>Benefits:</strong>
                          <ul style={{ marginTop: '8px', marginLeft: '20px', color: '#374151' }}>
                            {herb.benefits.map((benefit, bIdx) => (
                              <li key={bIdx} style={{ marginBottom: '4px' }}>{benefit}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {herb.usage && (
                        <p style={{ marginTop: '10px', color: '#6b7280' }}>
                          <strong>Usage:</strong> {herb.usage}
                        </p>
                      )}
                      {herb.precautions && (
                        <p style={{ marginTop: '10px', color: '#dc2626', fontSize: '14px', fontStyle: 'italic' }}>
                          ⚠️ <strong>Note:</strong> {herb.precautions}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Cautions */}
            {plan.cautions && plan.cautions.length > 0 && (
              <div className="plan-section" style={{ marginBottom: '32px' }}>
                <div className="card" style={{ background: '#fef3c7', borderLeft: '4px solid #f59e0b', padding: '20px' }}>
                  <h3 style={{ color: '#92400e', marginBottom: '16px', fontSize: '20px' }}>⚠️ Important Cautions</h3>
                  <ul style={{ marginLeft: '20px', color: '#78350f' }}>
                    {plan.cautions.map((caution, idx) => (
                      <li key={idx} style={{ marginBottom: '10px', lineHeight: '1.6' }}>{caution}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Priority Actions */}
            {plan.priorityActions && plan.priorityActions.length > 0 && (
              <div className="plan-section" style={{ marginBottom: '32px' }}>
                <div className="card" style={{ background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', color: 'white', padding: '24px', borderRadius: '12px' }}>
                  <h3 style={{ color: 'white', marginBottom: '16px', fontSize: '20px' }}>🎯 Priority Actions</h3>
                  <ul style={{ marginLeft: '20px', lineHeight: '1.8' }}>
                    {plan.priorityActions.map((action, idx) => (
                      <li key={idx} style={{ marginBottom: '8px' }}>{action}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Dos and Don'ts */}
            {(plan.dosAndDonts?.dos?.length > 0 || plan.dosAndDonts?.donts?.length > 0) && (
              <div className="plan-section" style={{ marginBottom: '32px' }}>
                <h3 className="section-title" style={{ fontSize: '24px', marginBottom: '20px' }}>✅ Do's and Don'ts</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                  {plan.dosAndDonts.dos && plan.dosAndDonts.dos.length > 0 && (
                    <div className="card" style={{ background: '#f0fdf4', borderLeft: '4px solid #10b981', padding: '20px' }}>
                      <h4 style={{ color: '#059669', marginBottom: '16px' }}>✅ Do's</h4>
                      <ul style={{ marginLeft: '20px', color: '#065f46' }}>
                        {plan.dosAndDonts.dos.map((item, idx) => (
                          <li key={idx} style={{ marginBottom: '8px', lineHeight: '1.6' }}>
                            {typeof item === 'string' ? item : `${item.action} - ${item.reason}`}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {plan.dosAndDonts.donts && plan.dosAndDonts.donts.length > 0 && (
                    <div className="card" style={{ background: '#fef2f2', borderLeft: '4px solid #ef4444', padding: '20px' }}>
                      <h4 style={{ color: '#dc2626', marginBottom: '16px' }}>❌ Don'ts</h4>
                      <ul style={{ marginLeft: '20px', color: '#991b1b' }}>
                        {plan.dosAndDonts.donts.map((item, idx) => (
                          <li key={idx} style={{ marginBottom: '8px', lineHeight: '1.6' }}>
                            {typeof item === 'string' ? item : `${item.action} - ${item.reason}`}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Empty state if plan is empty */}
            {(!plan.yogaPoses || plan.yogaPoses.length === 0) && 
             (!plan.dietPlan || (!plan.dietPlan.foodsToEat && !plan.dietPlan.foodsToAvoid)) && 
             (!plan.lifestyleTips || plan.lifestyleTips.length === 0) && (
              <div className="card" style={{ padding: '40px', textAlign: 'center', background: '#f9fafb' }}>
                <h3 style={{ color: '#6b7280', marginBottom: '16px' }}>⚠️ Plan Generation Issue</h3>
                <p style={{ color: '#9ca3af' }}>
                  The plan was generated but appears to be empty. Please try again or check the console for errors.
                </p>
                <button 
                  className="btn btn-primary" 
                  onClick={() => {
                    setPlan(null)
                    setShowPlanForm(true)
                    startPlanGeneration()
                  }}
                  style={{ marginTop: '20px' }}
                >
                  Regenerate Plan
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default ReportTab

