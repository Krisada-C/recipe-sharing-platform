import dbConnect from '@/utils/dbConnect';
import Recipe from '@/models/Recipe';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    await dbConnect();

    const { recipeId, comment } = req.body;
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    try {
      const recipe = await Recipe.findById(recipeId);
      if (!recipe) {
        return res.status(404).json({ error: 'Recipe not found' });
      }

      recipe.comments.push({ 
        body: comment, 
        createdBy: decoded.id, 
        date: new Date() 
      });

      await recipe.save();
      res.status(200).json({ message: 'Comment added successfully' });
    } catch (error) {
      res.status(400).json({ error: 'Error adding comment' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
