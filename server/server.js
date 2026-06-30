import express from 'express'
import cors from 'cors'

const app = express()
const PORT = process.env.PORT || 5000

// In-memory array to store inquiries for demo purposes
// Since no active database is required, this serves as a lightweight sandbox database
const enquiries = []

// Middleware
app.use(cors())
app.use(express.json())

// API routes
app.post('/api/enquiry', (req, res) => {
  try {
    const { name, phone, email, course, class: currentClass, message } = req.body
    
    if (!name || !phone) {
      return res.status(400).json({ success: false, error: 'Name and Phone number are required fields.' })
    }

    const newEnquiry = {
      id: enquiries.length + 1,
      name,
      phone,
      email: email || '',
      course,
      class: currentClass || '',
      message: message || '',
      date: new Date()
    }

    enquiries.push(newEnquiry)
    console.log('New Admission Enquiry Received (Stored In-Memory):', newEnquiry)

    res.status(201).json({ 
      success: true, 
      message: 'Your enquiry was received successfully. Our counselor will contact you shortly.',
      data: newEnquiry
    })
  } catch (error) {
    console.error('Enquiry post error: ', error)
    res.status(500).json({ success: false, error: 'Internal server error while processing registration.' })
  }
})

// Endpoint to view received inquiries (useful for testing)
app.get('/api/enquiries', (req, res) => {
  res.json({ success: true, count: enquiries.length, data: enquiries })
})

// Catch-all static response for verification
app.get('/api/status', (req, res) => {
  res.json({ status: 'active', database: 'in-memory (no-db mode)' })
})

app.listen(PORT, () => {
  console.log(`Muntazar Classes Server is active on port http://localhost:${PORT}`)
})
