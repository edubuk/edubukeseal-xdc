import pkg from '@aws-sdk/client-s3';
import 'dotenv/config';
import express from 'express';
import morgan from 'morgan';
import uploadRouter from './routers/upload.js';
import cors from 'cors';
import env from "@beam-australia/react-env";

const portt = process.env.PORT || env("PORT") || 3001;
const { S3 } = pkg;

const app = express();

// Configure CORS
app.use(cors({
    origin: 'https://edubukeseal.com', // Replace with your frontend URL
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true
}));

// Serve static files (optional)
app.use(express.static('public'));

// Middleware
app.use(express.json());
app.use(morgan('dev'));

// Error handling middleware (optional)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Internal Server Error');
});

// Serve the HTML content for the root path
app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Welcome to Edubuk</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 100vh;
                    margin: 0;
                    background-color: #f0f0f0;
                    color: #333;
                }
                .container {
                    text-align: center;
                    background: #fff;
                    border-radius: 8px;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                    padding: 20px;
                    max-width: 600px;
                    width: 100%;
                }
                h1 {
                    font-size: 2.5rem;
                    color: #007BFF;
                    margin: 0;
                }
                p {
                    font-size: 1.2rem;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>Welcome to the Edubuk Backend</h1>
                <p>Your backend service is up and running!</p>
            </div>
        </body>
        </html>
    `);
});

app.use('/', uploadRouter);

const port = portt || 3001;
app.listen(port, () => console.log(`Server listening on port ${port}`));
