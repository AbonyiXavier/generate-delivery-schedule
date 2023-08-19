import express, { Request, Response } from 'express';
import deliveryScheduleRouter from './routes/deliverySchedule.route.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/v1', deliveryScheduleRouter);

app.get('/', (req: Request, res: Response) => {
  res.send('welcome to delivery schedule Api')
});

// Define the route handling for non-existing path (404 handling)
app.use((req: Request, res: Response) => {
  res.writeHead(404);
  res.write("Not Found");
  res.end();
});

app.listen(8129, () => {
  console.log("Listening on http://localhost:8129");
});
