const express = require('express');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 5000;

// Load Firebase service account
const serviceAccount = JSON.parse(
  fs.readFileSync(process.env.FIREBASE_SERVICE_ACCOUNT_PATH, 'utf8')
);

// Example: log project_id
console.log('Firebase project_id:', serviceAccount.project_id);

app.get('/', (req, res) => {
  res.send('Backend running!');
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
