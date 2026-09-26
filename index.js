const bedrock = require('bedrock-protocol');
const express = require('express');

// خادم وهمي لإبقاء الموقع نشطاً على Render
const app = express();
const PORT = process.env.PORT || 3000;
app.get('/', (req, res) => res.send('Bakri Bot is Active 24/7!'));
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));

// إعدادات الاتصال بسيرفر denjismp
const options = {
  host: 'denjismp',
  port: 19132,
  username: 'Bakri_AFK_Bot',
  offline: true
};

function createBot() {
  console.log('جاري الاتصال بسيرفر denjismp...');
  const client = bedrock.createClient(options);

  client.on('join', () => {
    console.log('تم دخول البوت إلى السيرفر بنجاح!');
  });

  client.on('close', () => {
    console.log('انفصل البوت، جاري إعادة الاتصال خلال 10 ثواني...');
    setTimeout(createBot, 10000);
  });

  client.on('error', (err) => {
    console.log('حدث خطأ بالاتصال:', err.message);
  });
}

createBot();
