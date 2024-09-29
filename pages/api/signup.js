import dbConnect from '@/utils/dbConnect';
import User from '@/models/User';
import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    await dbConnect();
    
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      const newUser = new User({ email, password: hashedPassword });
      await newUser.save();
      res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
      res.status(400).json({ error: 'User already exists or invalid data' });
    }
  }
}
