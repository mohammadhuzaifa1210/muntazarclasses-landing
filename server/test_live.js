async function testLive() {
  try {
    const res = await fetch('https://muntazar-server.onrender.com/api/enquiry', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Live Test',
        phone: '1234567890',
        email: 'test@example.com',
        course: 'Test',
        message: 'Testing if Render is sending emails'
      })
    });
    const data = await res.json();
    console.log('Live server response:', data);
  } catch (err) {
    console.error('Error fetching live server:', err);
  }
}
testLive();
