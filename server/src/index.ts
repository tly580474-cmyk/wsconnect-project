import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';
import postRoutes from './routes/postRoutes';
import adminRoutes from './routes/adminRoutes';
import interactionRoutes from './routes/interactionRoutes';
import profileRoutes from './routes/profileRoutes';
import uploadRoutes from './routes/uploadRoutes';
import { getDatabase, saveDatabase } from './utils/db';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use('/uploads', express.static('uploads'));

const initializeDefaultAdmin = async () => {
  const db = getDatabase();
  const existingAdmin = db.users.find(u => u.isAdmin);
  
  if (!existingAdmin) {
    const passwordHash = await bcrypt.hash('admin123', 10);
    const adminUser = {
      id: uuidv4(),
      username: 'admin',
      email: 'admin@wsconnect.com',
      passwordHash,
      isAdmin: true,
      isBlocked: false,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    db.users.push(adminUser);
    saveDatabase(db);
    console.log('默认管理员账号已创建: admin@wsconnect.com / admin123');
  }
};

initializeDefaultAdmin();

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'WSConnect Server is running' });
});

app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/interactions', interactionRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/upload', uploadRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});