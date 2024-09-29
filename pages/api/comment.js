import dbConnect from '@/utils/dbConnect';
import Comment from '@/models/Comment';

export default async function handler(req, res) {
  await dbConnect();
  
  if (req.method === 'POST') {
    const { recipeId, userId, content } = req.body;
    const comment = new Comment({ recipeId, userId, content });
    await comment.save();
    return res.status(201).json(comment);
  }
  // Handle GET, DELETE methods for reading and deleting comments
}
