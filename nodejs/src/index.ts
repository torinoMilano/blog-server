import express from 'express';
import morgan from 'morgan';
const port = 3000
const app = express();

app.use(morgan("dev"))
app.use(express.urlencoded({extended: false}))


app.get('/', (req, res) => res.send('Hello World!'))

app.listen(`${port}`, () => console.log(`Server is up and running on port ${port}`));