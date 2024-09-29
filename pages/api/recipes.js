import dbConnect from '@/utils/dbConnect';
import Recipe from '@/models/Recipe';

export default async function handler(req, res) {
  await dbConnect();
  
  if (req.method === 'POST') {
    // Handle recipe creation (POST)
    const { title, ingredients, steps, cookingTime, image, category } = req.body;

    try {
      const recipe = new Recipe({
        title,
        ingredients,
        steps,
        cookingTime,
        image,
        category
      });

      // Save the new recipe to the database
      await recipe.save();
      return res.status(201).json(recipe);
    } catch (error) {
      return res.status(400).json({ message: 'Error creating recipe', error });
    }
  } 
  
  else if (req.method === 'GET') {
    // Handle fetching all recipes (GET)
    try {
      const recipes = await Recipe.find({});
      return res.status(200).json(recipes);
    } catch (error) {
      return res.status(400).json({ message: 'Error fetching recipes', error });
    }
  } 
  
  else if (req.method === 'PUT') {
    // Handle updating a recipe (PUT)
    const { id, title, ingredients, steps, cookingTime, image, category } = req.body;

    try {
      const updatedRecipe = await Recipe.findByIdAndUpdate(
        id,
        { title, ingredients, steps, cookingTime, image, category },
        { new: true }
      );
      
      if (!updatedRecipe) {
        return res.status(404).json({ message: 'Recipe not found' });
      }

      return res.status(200).json(updatedRecipe);
    } catch (error) {
      return res.status(400).json({ message: 'Error updating recipe', error });
    }
  } 
  
  else if (req.method === 'DELETE') {
    // Handle deleting a recipe (DELETE)
    const { id } = req.body;

    try {
      const deletedRecipe = await Recipe.findByIdAndDelete(id);

      if (!deletedRecipe) {
        return res.status(404).json({ message: 'Recipe not found' });
      }

      return res.status(200).json({ message: 'Recipe deleted successfully' });
    } catch (error) {
      return res.status(400).json({ message: 'Error deleting recipe', error });
    }
  } 
  
  else {
    // Handle unsupported HTTP methods
    return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
}
