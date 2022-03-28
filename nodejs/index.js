const express = require('express');
const port = 3000
const app = express();
app.get('/', (req, res) => res.send('Hello World!'))

app.listen(`${port}`, () => console.log(`Server is up and running on port ${port}`));