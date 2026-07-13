const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.status(200).json({ message: 'CI/CD Pipeline eka wada mcn!' });
});

if (require.main === module) {
  app.listen(3000, () => {
    console.log('Server is running on port 3000');
  });
}

module.exports = app;