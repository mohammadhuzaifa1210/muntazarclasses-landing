import { Resend } from 'resend';
import 'dotenv/config';

const resend = new Resend(process.env.RESEND_API_KEY);
const RECEIVER_EMAIL = process.env.RECEIVER_EMAIL || 'manage.muntazarclasses@gmail.com';

console.log('Testing Resend configuration...');
console.log('API Key present:', !!process.env.RESEND_API_KEY);
console.log('Sending to:', RECEIVER_EMAIL);

async function testEmail() {
  try {
    const { data, error } = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: RECEIVER_EMAIL,
      subject: 'Test Email from Muntazar Classes',
      html: '<p>If you see this, email sending is working!</p>'
    });

    if (error) {
      console.error('❌ Resend API Error:', error);
    } else {
      console.log('✅ Email sent successfully!', data);
    }
  } catch (err) {
    console.error('❌ Caught Exception:', err);
  }
}

testEmail();
