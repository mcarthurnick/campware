import express from 'express';
import ViteExpress from 'vite-express';
import morgan from 'morgan';
import path from 'path';
import url from 'url';

const rootDir = url.fileURLToPath(new URL('.', import.meta.url))

const app = express();

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(rootDir, "public")))


ViteExpress.config({ printViteDevServerHost: true });


app.get('/api/auth', (req, res) => {
    res.send('Working!')
});


const port = process.env.PORT || 8080;
ViteExpress.listen(app, port, () => console.log(`Server is listening http://localhost:${port}`));