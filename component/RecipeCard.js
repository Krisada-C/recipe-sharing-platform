// components/RecipeCard.js
const RecipeCard = ({ recipe }) => {
    return (
      <div className="recipe-card">
        <h2>{recipe.title}</h2>
        <img src={recipe.image} alt={recipe.title} />
        <p>Ingredients: {recipe.ingredients}</p>
        <p>Steps: {recipe.steps}</p>
        <p>Cooking Time: {recipe.cookingTime} minutes</p>
        <p>Category: {recipe.category}</p>
      </div>
    );
  };
  
  export default RecipeCard;
  