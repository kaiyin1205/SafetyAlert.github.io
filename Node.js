const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// 使用者完成授權後的回調處理
app.get('/callback', async (req, res) => {
  const { code, state } = req.query;

  try {
    // 使用授權碼換取 Access Token
    const response = await axios.post('https://notify-bot.line.me/oauth/token', null, {
      params: {
        grant_type: 'authorization_code',
        code,
        redirect_uri: 'https://kaiyin1205.github.io/SafetyAlert.github.io/callback',
        client_id: 'TK8T26jWCtKnR9r6B2xS0C',
        client_secret: 'YOUR_CLIENT_SECRET', // 用 LINE Notify 後台提供的 Secret
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    const accessToken = response.data.access_token;

    // 假設存入資料庫（這裡僅示範用變數存儲）
    console.log('Access Token:', accessToken);

    // 回應成功訊息給使用者
    res.send('授權成功！您已連結 LINE Notify，現在可以接收通知。');
  } catch (error) {
    console.error('Error exchanging code for access token:', error.response?.data || error);
    res.status(500).send('授權失敗，請重試。');
  }
});

// 測試用發送通知的 API
app.post('/send-notification', async (req, res) => {
  const { token, message } = req.body;

  try {
    const response = await axios.post('https://notify-api.line.me/api/notify', null, {
      params: {
        message,
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${token}`,
      },
    });

    console.log('Notification sent:', response.data);
    res.send('通知發送成功！');
  } catch (error) {
    console.error('Error sending notification:', error.response?.data || error);
    res.status(500).send('通知發送失敗，請檢查 Token 或訊息內容。');
  }
});

app.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});
