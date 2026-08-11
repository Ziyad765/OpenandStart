import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());

const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://Ziyad:Ziyad@cluster0.v2nkc3l.mongodb.net/openandstart?retryWrites=true&w=majority&appName=Cluster0";

// Serverless MongoDB Atlas connection caching
let isConnected = false;
async function connectDB() {
  if (isConnected && mongoose.connection.readyState === 1) return;
  try {
    await mongoose.connect(MONGO_URI);
    isConnected = true;
    console.log('✅ Connected to MongoDB Atlas Serverless Function');
  } catch (err) {
    console.error('❌ MongoDB Atlas Serverless Connection Error:', err);
  }
}

// Middleware to ensure DB connection before handling API routes
app.use(async (req, res, next) => {
  await connectDB();
  next();
});

// Application Schema
const applicationSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, default: '' },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  mainGoal: String,
  mentorScale: String,
  businessStage: String,
  industry: String,
  priorExperience: String,
  struggles: String,
  startTimeframe: String,
  weeklyHours: String,
  gender: String,
  education: String,
  ageRange: String,
  region: String,
  selectedDate: String,
  selectedTime: String,
  selectedMentor: Object,
  submittedAt: { type: Date, default: Date.now }
});

const Application = mongoose.models.Application || mongoose.model('Application', applicationSchema);

// Helper handlers to support both /api/applications and /applications routes seamlessly
const handleHealth = (req, res) => {
  res.json({ status: 'ok', database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected' });
};

const handlePostApplication = async (req, res) => {
  try {
    const newApp = new Application(req.body);
    const savedApp = await newApp.save();
    console.log(`📩 New Application received: ${savedApp.firstName} ${savedApp.lastName} (${savedApp.email})`);
    res.status(201).json({ success: true, message: 'Application submitted successfully', data: savedApp });
  } catch (error) {
    console.error('Error saving application:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};

const handleGetApplications = async (req, res) => {
  try {
    const applications = await Application.find().sort({ submittedAt: -1 });
    res.json({ success: true, count: applications.length, data: applications });
  } catch (error) {
    console.error('Error fetching applications:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};

const handleDeleteApplication = async (req, res) => {
  try {
    const deletedApp = await Application.findByIdAndDelete(req.params.id);
    if (!deletedApp) {
      return res.status(404).json({ success: false, message: 'Application not found' });
    }
    res.json({ success: true, message: 'Application deleted successfully' });
  } catch (error) {
    console.error('Error deleting application:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};

// Route Registrations (Support both /api/* and /* paths so Vercel Serverless Function never 404s)
app.get(['/api/health', '/health', '/'], handleHealth);
app.post(['/api/applications', '/applications'], handlePostApplication);
app.get(['/api/applications', '/applications'], handleGetApplications);
app.delete(['/api/applications/:id', '/applications/:id'], handleDeleteApplication);

export default app;
