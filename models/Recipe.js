// models/Recipe.js
import mongoose from 'mongoose';

const RecipeSchema = new mongoose.Schema({
  title: String,
  ingredients: [String],
  steps: String,
  cookingTime: String,
  category: String,
  image: String,
  comments: [
    {
      body: { type: String, required: true },
      createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
      date: { type: Date, default: Date.now },
    }
  ]
});

const Recipe = mongoose.models.Recipe || mongoose.model('Recipe', RecipeSchema);
export default Recipe;
