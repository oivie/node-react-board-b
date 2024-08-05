const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const eventRoutes = require('./routes/eventRoutes');
const authRoutes = require('./routes/authRoutes');
const rsvpRoutes = require('./routes/rsvpRoutes');
const userRoutes = require('./routes/userRoutes'); 
const statisticsRoutes = require('./routes/statistics');
const { notFound } = require('./middleware/notFoundMiddleware');
const { errorHandler } = require('./middleware/errorMiddleware');
const cors = require('cors'); 

dotenv.config();

connectDB();

const app = express();

app.use(cors()); 
app.use(express.json());

app.use('/api/events', eventRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/rsvp', rsvpRoutes);
app.use('/api/users', userRoutes); 
app.use('/api/statistics', statisticsRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
