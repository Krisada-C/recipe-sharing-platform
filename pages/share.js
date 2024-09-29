import { useState, useEffect } from 'react';
import { useRouter } from 'next/router'; // Import useRouter from next/router
import styles from '@/styles/Share.module.css'; // Adjust the path as necessary

export default function Share() {
  const router = useRouter(); // Initialize router
  const [recipes, setRecipes] = useState([]);
  const [newRecipe, setNewRecipe] = useState({
    title: '',
    ingredients: '',
    steps: '',
    cookingTime: '',
    category: '',
    image: null,
  });

  const fetchRecipes = async () => {
    try {
      const response = await fetch('/api/recipes', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();

      if (Array.isArray(data)) {
        console.log('Fetched recipes:', data);
        setRecipes(data);
      } else {
        console.error('Fetched data is not an array:', data);
      }
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!newRecipe.title) {
      alert('Recipe title is required!');
      return;
    }

    console.log('Submitting recipe:', newRecipe);

    try {
      const response = await fetch('/api/recipes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newRecipe),
      });

      if (response.ok) {
        await fetchRecipes();
        setNewRecipe({
          title: '',
          ingredients: '',
          steps: '',
          cookingTime: '',
          category: '',
          image: null,
        });

        // Redirect to the recipes page after successful submission
        router.push('/recipes'); // Redirect to the recipes page
      } else {
        console.error('Error adding recipe:', response.statusText);
      }
    } catch (error) {
      console.error('Error adding recipe:', error);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Share Your Recipe</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          className={styles.inputText}
          type="text"
          placeholder="Recipe Title"
          value={newRecipe.title}
          onChange={(e) => setNewRecipe({ ...newRecipe, title: e.target.value })}
          required
        />
        <textarea
          className={styles.inputTextarea}
          placeholder="Ingredients (comma-separated)"
          value={newRecipe.ingredients}
          onChange={(e) => setNewRecipe({ ...newRecipe, ingredients: e.target.value })}
          required
        />
        <textarea
          className={styles.inputTextarea}
          placeholder="Steps"
          value={newRecipe.steps}
          onChange={(e) => setNewRecipe({ ...newRecipe, steps: e.target.value })}
          required
        />
        <input
          className={styles.inputText}
          type="text"
          placeholder="Cooking Time"
          value={newRecipe.cookingTime}
          onChange={(e) => setNewRecipe({ ...newRecipe, cookingTime: e.target.value })}
        />
        <input
          className={styles.inputText}
          type="text"
          placeholder="Category"
          value={newRecipe.category}
          onChange={(e) => setNewRecipe({ ...newRecipe, category: e.target.value })}
        />
        <input
          className={styles.inputFile}
          type="file"
          onChange={(e) => setNewRecipe({ ...newRecipe, image: e.target.files[0] })}
        />
        <button className={styles.button} type="submit">Submit Recipe</button>
      </form>

      <h2 className={styles.subtitle}>All Recipes</h2>
      <ul>
        {Array.isArray(recipes) && recipes.length > 0 ? (
          recipes.map((recipe, index) => (
            <li key={index}>{recipe.title}</li>
          ))
        ) : (
          <li>No recipes available.</li>
        )}
      </ul>
    </div>
  );
}
