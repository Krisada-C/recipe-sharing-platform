// components/RecipeList.js
import { useState, useEffect } from 'react';
import RecipeCard from './RecipeCard';

const RecipeList = ({ recipes }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredRecipes, setFilteredRecipes] = useState(recipes);

  useEffect(() => {
    const results = recipes.filter(recipe =>
      recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      recipe.ingredients.toLowerCase().includes(searchTerm.toLowerCase()) ||
      recipe.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredRecipes(results);
  }, [searchTerm, recipes]);

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search recipes by title, ingredients, or category..."
      />
      <div className="recipe-list">
        {filteredRecipes.length > 0 ? (
          filteredRecipes.map(recipe => (
            <RecipeCard key={recipe._id} recipe={recipe} />
          ))
        ) : (
          <p>No recipes found.</p>
        )}
      </div>
    </div>
  );
};

export default RecipeList;
