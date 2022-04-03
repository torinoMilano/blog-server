import express from 'express';
import morgan from 'morgan';
import routes from "./routes";

const port = 3000
const app = express();

app.use(morgan("dev"))
app.use(express.urlencoded({extended: false}))
app.use(express.json());
app.use(routes);

app.get('/', (req, res) => res.send('Welcome to blog post api'))

app.listen(`${port}`, () => console.log(`Server is up and running on port ${port}`));