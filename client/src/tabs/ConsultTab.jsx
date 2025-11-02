import { useState, useEffect } from 'react'
import axios from 'axios'
import { FiStar, FiCalendar, FiClock } from 'react-icons/fi'
import './ConsultTab.css'

function ConsultTab() {
  const [doctors, setDoctors] = useState([])
  const [selectedDoctor, setSelectedDoctor] = useState(null)
  const [selectedService, setSelectedService] = useState('')
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState('')
  const [loading, setLoading] = useState(true)

  const serviceTypes = [
    'Ayurveda Consultation',
    'Yoga & Pranayama Session',
    'Diet & Lifestyle Coaching',
    'Mental Wellness Support'
  ]

  useEffect(() => {
    fetchDoctors()
  }, [])

  const fetchDoctors = async () => {
    try {
      const res = await axios.get('/api/doctors')
      if (res.data.length === 0) {
        // Seed doctors if empty
        await axios.post('/api/doctors/seed')
        const newRes = await axios.get('/api/doctors')
        setDoctors(newRes.data)
      } else {
        setDoctors(res.data)
      }
    } catch (error) {
      console.error('Error fetching doctors:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleBooking = async () => {
    if (!selectedDoctor || !selectedService || !selectedDate || !selectedTime) {
      alert('Please fill all fields')
      return
    }

    try {
      setLoading(true)
      const appointment = {
        doctorId: selectedDoctor._id,
        serviceType: selectedService,
        date: selectedDate,
        time: selectedTime,
        duration: 30,
        price: selectedDoctor.consultationFee
      }

      const res = await axios.post('/api/appointments', appointment)
      alert('Appointment booked successfully!')
      
      // Reset form
      setSelectedDoctor(null)
      setSelectedService('')
      setSelectedDate('')
      setSelectedTime('')
    } catch (error) {
      console.error('Error booking appointment:', error)
      alert('Error booking appointment. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const getAvailableDates = () => {
    const dates = []
    const today = new Date()
    for (let i = 0; i < 7; i++) {
      const date = new Date(today)
      date.setDate(today.getDate() + i)
      dates.push(date)
    }
    return dates
  }

  const getAvailableTimes = () => {
    if (!selectedDoctor || !selectedDate) return []
    
    const date = new Date(selectedDate)
    const dayName = date.toLocaleDateString('en-US', { weekday: 'long' })
    const slot = selectedDoctor.availableSlots?.find(s => s.day === dayName)
    
    return slot?.times || []
  }

  return (
    <div className="consult-tab">
      <div className="container">
        <h1 className="page-title">Book a Consultation</h1>

        {/* Meet Our Experts */}
        <div className="section">
          <h2 className="section-title">Meet Our Experts</h2>
          <p className="section-subtitle">Find the right holistic practitioner for you.</p>
          
          <div className="doctors-grid">
            {doctors.map((doctor) => (
              <div key={doctor._id} className="card doctor-card">
                <div className="doctor-avatar">
                  {doctor.name.charAt(0)}
                </div>
                <h3 className="doctor-name">{doctor.name}</h3>
                <p className="doctor-specialty">{doctor.specialty}</p>
                <div className="doctor-rating">
                  <FiStar className="star-icon" />
                  <span>{doctor.rating}</span>
                  <span className="review-count">({doctor.reviewCount})</span>
                </div>
                <button
                  className="btn btn-outline"
                  onClick={() => setSelectedDoctor(doctor)}
                >
                  View Profile
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Select Service */}
        <div className="section">
          <h2 className="section-title">Select Your Service</h2>
          <p className="section-subtitle">What kind of consultation do you need?</p>
          
          <div className="service-buttons">
            {serviceTypes.map((service) => (
              <button
                key={service}
                className={`btn service-btn ${selectedService === service ? 'active' : ''}`}
                onClick={() => setSelectedService(service)}
              >
                {service}
              </button>
            ))}
          </div>
        </div>

        {/* Booking Form */}
        {selectedDoctor && (
          <div className="booking-section">
            <h2 className="section-title">Choose Your Slot</h2>
            <p className="section-subtitle">When would you like to meet?</p>

            <div className="card booking-card">
              <div className="booking-field">
                <label className="input-label">Doctor</label>
                <p className="booking-value">{selectedDoctor.name}</p>
              </div>

              <div className="booking-field">
                <label className="input-label">Service</label>
                <p className="booking-value">
                  {selectedService || selectedDoctor.specialty} (Video Call, 30 min)
                </p>
              </div>

              <div className="booking-field">
                <label className="input-label">Select Date</label>
                <div className="date-buttons">
                  {getAvailableDates().map((date, idx) => {
                    const dateStr = date.toISOString().split('T')[0]
                    const dayName = date.toLocaleDateString('en-US', { weekday: 'short' })
                    const dayNum = date.getDate()
                    
                    return (
                      <button
                        key={idx}
                        className={`btn date-btn ${selectedDate === dateStr ? 'active' : ''}`}
                        onClick={() => {
                          setSelectedDate(dateStr)
                          setSelectedTime('')
                        }}
                      >
                        {dayName}
                        <br />
                        {dayNum}
                      </button>
                    )
                  })}
                </div>
              </div>

              {selectedDate && (
                <div className="booking-field">
                  <label className="input-label">Select Time</label>
                  <div className="time-buttons">
                    {getAvailableTimes().map((time, idx) => (
                      <button
                        key={idx}
                        className={`btn time-btn ${selectedTime === time ? 'active' : ''}`}
                        onClick={() => setSelectedTime(time)}
                      >
                        <FiClock /> {time}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {selectedDate && selectedTime && (
                <div className="booking-summary">
                  <h3 className="summary-title">Summary & Payment</h3>
                  <div className="summary-item">
                    <span className="summary-label">Doctor:</span>
                    <span className="summary-value">{selectedDoctor.name}</span>
                  </div>
                  <div className="summary-item">
                    <span className="summary-label">Service:</span>
                    <span className="summary-value">
                      {selectedService} (Video Call, 30 min)
                    </span>
                  </div>
                  <div className="summary-item">
                    <span className="summary-label">Date & Time:</span>
                    <span className="summary-value">
                      {new Date(selectedDate).toLocaleDateString('en-US', {
                        weekday: 'short',
                        month: 'short',
                        day: 'numeric'
                      })}, {selectedTime}
                    </span>
                  </div>
                  <div className="summary-item">
                    <span className="summary-label">Price:</span>
                    <span className="summary-value">₹{selectedDoctor.consultationFee}.00</span>
                  </div>

                  <div className="terms-checkbox">
                    <input type="checkbox" id="terms" />
                    <label htmlFor="terms">
                      I agree to the <span className="link">cancellation policy</span>
                    </label>
                  </div>

                  <button
                    className="btn btn-primary confirm-btn"
                    onClick={handleBooking}
                    disabled={loading}
                  >
                    <FiCalendar /> Confirm Booking
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ConsultTab

