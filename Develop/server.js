const express = require('express');

const app = express();

const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');





// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));

app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

const PORT = 3001;


app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});