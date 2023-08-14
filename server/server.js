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
    saveUninitialized: true
  }))

ViteExpress.config({ printViteDevServerHost: true });

const {
    createUser,
    loginUser, 
    createCampground,
    getAdminCampgrounds,
    deleteCampground, 
    getAllCampsites, 
    createCampsite

    } = routeFunctions;


app.get('/api/auth', (req, res) => {
    res.send('Working!')
});

app.post('/api/register', createUser );
app.post('/api/login', loginUser);

//app.get('/api/campsites/:campId', getAllCampsites)
app.get('/api/campgrounds', getAdminCampgrounds);
app.post('/api/create-camp', createCampground);
app.post('/api/create-site', createCampsite)
app.delete('/api/delete/:campId', deleteCampground)


const port = process.env.PORT || 8080;
ViteExpress.listen(app, port, () => console.log(`Server is listening http://localhost:${port}`));