import dbConnect from '@/utils/dbConnect';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    await dbConnect();

    const { title, description, imageUrl } = req.body;
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    try {
      const newRecipe = new Recipe({ title, description, imageUrl, createdBy: decoded.id });
      await newRecipe.save();
      res.status(201).json({ message: 'Recipe uploaded successfully' });
    } catch (error) {
      res.status(400).json({ error: 'Error uploading recipe' });
    }
  }
}
