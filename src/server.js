import pkg from '@aws-sdk/client-s3';
import 'dotenv/config'; // Ensure .env file is present and properly configured
import express from 'express';
import morgan from 'morgan';
import uploadRouter from './routers/upload.js';
import cors from 'cors';

const port = process.env.PORT || 3001; // Use PORT from environment variables or default to 3001
const { S3 } = pkg;

const app = express();

// Configure CORS
const corsOptions = {
    origin: [
      '*'
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: false
  };
  
app.use(cors(corsOptions));

// Serve static files from the public directory
app.use(express.static('public'));

// Middleware
app.use(express.json());
app.use(morgan('dev'));

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
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 100vh;
                    margin: 0;
                    background-color: #f5f5f5;
                    color: #333;
                }
                .container {
                    text-align: center;
                    background: #ffffff;
                    border-radius: 12px;
                    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
                    padding: 30px;
                    max-width: 700px;
                    width: 100%;
                    margin: 20px;
                }
                h1 {
                    font-size: 2.8rem;
                    color: #007BFF;
                    margin: 0 0 20px;
                }
                p {
                    font-size: 1.2rem;
                    margin: 10px 0;
                }
                .logo {
                    width: 150px;
                    margin-bottom: 20px;
                }
                .description {
                    font-size: 1.1rem;
                    color: #555;
                }
                .highlight {
                    color: #007BFF;
                    font-weight: bold;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <img src="/images/logo.png" alt="Edubuk Logo" class="logo"> <!-- Ensure this path is correct -->
                <h1>Welcome to Edubuk</h1>
                <p class="description">
                    <b>We're thrilled to have you on board!</b> Edubuk is your ultimate platform for career guidance, emerging tech training, and more.
                </p>
                <p>
                    &nbsp;
                </p>
                <p>
                    Your backend service is up and running smoothly, providing you with a powerful foundation to build and scale your applications.
                </p>
                <p>
                    &nbsp;
                </p>
                <p class="description">
                    Explore our features and get started with Edubuk today!
                </p>
                <p>
                    &nbsp;
                </p>
                <p class="highlight">
                    Visit: <a href='https://edubukeseal.com'>https://www.edubukeseal.com</a>
                </p>
            </div>
        </body>
        </html>
    `);
});

// Use the upload router
app.use('/api/', uploadRouter);

// Error handling middleware (ensure this is after all routes)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Internal Server Error');
});

// Start the server
app.listen(port, () => console.log(`Server listening on port ${port}`));
