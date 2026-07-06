import express from 'express'
import cors from 'cors'
import { Resend } from 'resend'
import 'dotenv/config'

const app = express()
const PORT = process.env.PORT || 5000
const resend = new Resend(process.env.RESEND_API_KEY)
const RECEIVER_EMAIL = process.env.RECEIVER_EMAIL || 'manage.muntazarclasses@gmail.com'

// In-memory log (backup record of all enquiries)
const enquiries = []

// Middleware
app.use(cors({
  origin: [
    'http://localhost:5173',                      // local Vite dev server
    'https://muntazar-classes.onrender.com',      // Render static site (Actual URL)
    'https://muntazarclasses.com',                // custom domain (if added later)
    'https://www.muntazarclasses.com'
  ],
  credentials: true
}))
app.use(express.json())

// ── Helper: build the HTML email body ──────────────────────────
function buildEmailHtml({ name, phone, email, course, message, source, date }) {
  const formattedDate = new Date(date).toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    day: '2-digit', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit'
  })

  const row = (label, value) => value ? `
    <tr>
      <td style="padding:10px 16px;font-size:13px;font-weight:700;color:#64748b;text-transform:uppercase;letter-spacing:0.06em;width:140px;vertical-align:top;">${label}</td>
      <td style="padding:10px 16px;font-size:14px;color:#0f172a;vertical-align:top;">${value}</td>
    </tr>` : ''

  return `
  <!DOCTYPE html>
  <html lang="en">
  <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><title>New Enquiry</title></head>
  <body style="margin:0;padding:0;background:#f1f5f9;font-family:'Segoe UI',Arial,sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 20px;">
      <tr><td align="center">
        <table width="100%" style="max-width:560px;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">

          <!-- Header -->
          <tr><td style="background:linear-gradient(135deg,#172554,#1e3a8a);padding:32px 36px;">
            <p style="margin:0;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.2em;color:#93c5fd;">New Enquiry Received</p>
            <h1 style="margin:8px 0 0;font-size:24px;font-weight:800;color:#ffffff;letter-spacing:-0.02em;">Muntazar Classes</h1>
          </td></tr>

          <!-- Alert Banner -->
          <tr><td style="background:#eff6ff;border-bottom:1px solid #bfdbfe;padding:14px 36px;">
            <p style="margin:0;font-size:13px;color:#1e40af;">📬 <strong>${name}</strong> submitted an enquiry via <em>${source || 'Website'}</em></p>
          </td></tr>

          <!-- Details Table -->
          <tr><td style="padding:8px 20px 24px;">
            <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
              ${row('Student Name', name)}
              ${row('Phone', phone)}
              ${row('Email', email)}
              ${row('Program', course)}
              ${row('Message', message || '—')}
              ${row('Submitted At', formattedDate)}
            </table>
          </td></tr>

          <!-- Quick Actions -->
          <tr><td style="padding:0 36px 32px;">
            <table cellpadding="0" cellspacing="0">
              <tr>
                <td style="padding-right:12px;">
                  <a href="tel:${phone?.replace(/\s/g,'')}" style="display:inline-block;background:#1a56db;color:#fff;text-decoration:none;font-size:13px;font-weight:700;padding:11px 22px;border-radius:100px;">📞 Call Now</a>
                </td>
                <td>
                  <a href="https://wa.me/91${phone?.replace(/\D/g,'').slice(-10)}" style="display:inline-block;background:#25d366;color:#fff;text-decoration:none;font-size:13px;font-weight:700;padding:11px 22px;border-radius:100px;">💬 WhatsApp</a>
                </td>
              </tr>
            </table>
          </td></tr>

          <!-- Footer -->
          <tr><td style="background:#f8fafc;border-top:1px solid #e2e8f0;padding:20px 36px;text-align:center;">
            <p style="margin:0;font-size:12px;color:#94a3b8;">This email was sent automatically by the Muntazar Classes website enquiry system.</p>
          </td></tr>

        </table>
      </td></tr>
    </table>
  </body>
  </html>`
}

// ── POST /api/enquiry ─────────────────────────────────────────
app.post('/api/enquiry', async (req, res) => {
  try {
    const { name, phone, email, course, class: currentClass, message, source } = req.body

    if (!name || !phone) {
      return res.status(400).json({ success: false, error: 'Name and phone are required.' })
    }

    const newEnquiry = {
      id: enquiries.length + 1,
      name, phone,
      email: email || '',
      course: course || currentClass || '',
      message: message || '',
      source: source || 'Website Form',
      date: new Date()
    }

    enquiries.push(newEnquiry)
    console.log('📋 Enquiry logged:', newEnquiry)

    // Send email via Resend (non-blocking — form success doesn't depend on email)
    resend.emails.send({
      from: 'Muntazar Classes <onboarding@resend.dev>',
      to: [RECEIVER_EMAIL],
      subject: `📬 New Enquiry — ${name}`,
      html: buildEmailHtml(newEnquiry)
    }).then(({ data, error }) => {
      if (error) console.error('📧 Resend error:', error)
      else console.log('📧 Email sent:', data?.id)
    })

    res.status(201).json({
      success: true,
      message: 'Enquiry received. Our counsellor will contact you shortly.'
    })

  } catch (error) {
    console.error('Enquiry error:', error)
    res.status(500).json({ success: false, error: 'Internal server error.' })
  }
})

// ── GET /api/enquiries — view all submissions ─────────────────
app.get('/api/enquiries', (req, res) => {
  res.json({ success: true, count: enquiries.length, data: enquiries })
})

// ── GET /api/status ───────────────────────────────────────────
app.get('/api/status', (req, res) => {
  res.json({ status: 'active', email: 'resend', receiver: RECEIVER_EMAIL })
})

app.listen(PORT, () => {
  console.log(`✅ Muntazar Classes Server running on http://localhost:${PORT}`)
  console.log(`📧 Enquiries will be emailed to: ${RECEIVER_EMAIL}`)
})

