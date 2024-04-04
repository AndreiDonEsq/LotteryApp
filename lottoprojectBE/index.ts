import express from 'express';
import { TicketRouter } from './routes';
import cors from 'cors';

const DEFAULT_PORT = 3000;
const app = express();

const allowedOrigins = ['http://localhost:4200']; 

// Set up CORS
app.use(cors({
    origin: function(origin, callback) {
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
          callback(null, true);
        } else {
          callback(new Error('Not allowed by CORS'));
        }
      },

    methods: 'POST,GET,PUT,OPTIONS,DELETE' // Not blocking pre-flight OPTIONS requests
}));

console.log('1');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(DEFAULT_PORT, () => {
  console.log(`Backend running on port ${DEFAULT_PORT}`)
})

app.use('/api/v1/', TicketRouter);
console.log('2');