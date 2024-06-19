import axios from 'axios';

export default async function handler(req, res) {
  const { domain } = req.query;

  try {
    // Replace with actual domain registrar API endpoint and API key
    const response = await axios.get(`https://api.example.com/check-domain?domain=${domain}`, {
      headers: {
        'Authorization': `Bearer YOUR_API_KEY`
      }
    });

    const { available, suggestions } = response.data;

    res.status(200).json({ available, suggestions });
  } catch (error) {
    res.status(500).json({ error: 'Error checking domain availability' });
  }
}