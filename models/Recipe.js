// models/Recipe.js
import mongoose from 'mongoose';

const RecipeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  ingredients: { type: String, required: true },
  steps: { type: String, required: true },
  cookingTime: { type: Number, required: true },
  image: { type: String },
  category: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Recipe = mongoose.models.Recipe || mongoose.model('Recipe', RecipeSchema);

export default Recipe;
