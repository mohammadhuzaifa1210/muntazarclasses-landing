async function checkEnv() {
  try {
    const res = await fetch('https://muntazar-server.onrender.com/api/status');
    const data = await res.json();
    console.log('Live server status:', data);
  } catch (err) {
    console.error('Error fetching live server:', err);
  }
}
checkEnv();
