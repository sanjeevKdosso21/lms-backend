import express from 'express';
import userRoutes from './routes/userRoutes';
// import uploadRoutes from './routes/upload';
import notesRoutes from './routes/notesRoutes';
import uploadFileRoutes from './routes/uploadRoutes';
import courseRoutes from './routes/courseRoutes';
import commonRoutes from './routes/commonRoutes';
import counsellor_registration from './routes/counsellor_registration'
import syllabusRoutes from './routes/syllabusRoutes';
import mcqRoutes from './routes/mcqRoutes';
import projectRoutes from './routes/projectRoutes';
import testRoutes from './routes/testRoute';
import adminRoutes from './routes/adminRoutes';
import activityRoutes from './routes/userActivityRoutes'

import cors from 'cors';
import path from 'path';

const app = express();

app.use(express.json());
app.use(cors());


app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ limit: '100mb', extended: true }));


// Serve static files from the uploads directory
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Use the upload router for handling file uploads
// app.use('/api', uploadRoutes);

app.use('/api', userRoutes);
app.use('/api', notesRoutes);

app.use('/api', uploadFileRoutes);
app.use('/api', courseRoutes);

app.use('/api', commonRoutes);

app.use('/api', counsellor_registration);
app.use('/api', syllabusRoutes);
app.use('/api', mcqRoutes);
app.use('/api', adminRoutes);
app.use('/api', projectRoutes);
app.use('/api', testRoutes);
app.use('/api', activityRoutes);
// Handle invalid API endpoints
app.use((req, res) => {
  res.status(404).json({ message: 'You are hitting the wrong API URL' });
});

export default app;
