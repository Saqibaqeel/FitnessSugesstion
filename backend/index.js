const express = require('express');
const dotenv = require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');
const dietRoutes = require('./routes/dietRoutes');





app.use(express.json());
app.use(cors());



app.use('/diet', dietRoutes);




app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});








