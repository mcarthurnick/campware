import express from 'express';
import ViteExpress from 'vite-express';
import morgan from 'morgan';
import path from 'path';
import url from 'url';
import session from 'express-session'

import routeFunctions from './controller.js';

const rootDir = url.fileURLToPath(new URL('.', import.meta.url))

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(rootDir, "public")))

app.use(session({
    secret: 'macdaddy',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
  }))

ViteExpress.config({ printViteDevServerHost: true });

const {
    createUser,
    loginUser, 
    createCampground
    } = routeFunctions;


app.get('/api/auth', (req, res) => {
    res.send('Working!')
});

app.post('/api/register', createUser );

app.post('/api/login', loginUser);

app.post('/api/create-camp', createCampground);


const port = process.env.PORT || 8080;
ViteExpress.listen(app, port, () => console.log(`Server is listening http://localhost:${port}`));