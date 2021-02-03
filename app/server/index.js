require('dotenv').config();
const app = require('./server.js');
const PORT = 8080;

app.listen(PORT, () => {
  console.log(`listening on ${PORT}, visit: http://localhost:${PORT}`);
});
