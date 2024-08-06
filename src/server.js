import pkg from '@aws-sdk/client-s3';
import 'dotenv/config';
import express from 'express';
import morgan from 'morgan';
import uploadRouter from './routers/upload.js';
import env from "@beam-australia/react-env";


const portt = process.env.PORT || env("PORT");
const { S3 } = pkg;

const app = express();
// Configure upload destination

app.use(express.json());
app.use(morgan('dev'));

// Error handling middleware (optional)
app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).send('Internal Server Error');
});

app.get('/', (req, res) => {
	res.send('Welcome to the Edubuk Backend');
});

app.use('/', uploadRouter);

const port = portt || 3001;
app.listen(port, () => console.log(`Server listening on port ${port}`));
