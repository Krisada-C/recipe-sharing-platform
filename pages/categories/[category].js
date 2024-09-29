// pages/categories/[category].js
import { useRouter } from 'next/router';
import Image from 'next/image';
import styles from '@/styles/Category.module.css'; // Make sure to create this CSS file
import Head from 'next/head';

// Sample category-based recipes with IDs for dynamic routing
const categoryRecipes = {
  appetizer: [
    { name: 'Bruschetta', image: '/bruschettaimage.jpeg', id: 1 },
    { name: 'Stuffed Mushrooms', image: '/stuffedmushroomimage.jpeg', id: 2 },
  ],
  beverages: [
    { name: 'Iced Coffee', image: '/icecoffeeimage.jpeg', id: 3 },
    { name: 'Lemonade', image: '/lemonadeimage.jpeg', id: 4 },
  ],
  soup: [
    { name: 'Tomato Soup', image: '/tomatosoup.jpeg', id: 5 },
    { name: 'Chicken Noodle Soup', image: '/chickennoodleimage.jpeg', id: 6 },
  ],
  salad: [
    { name: 'Caesar Salad', image: '/caesarsalad.jpeg', id: 7 },
    { name: 'Greek Salad', image: '/greeksalad.jpeg', id: 8 },
  ],
  vegan: [
    { name: 'Vegan Burger', image: '/veganburger.jpeg', id: 9 },
    { name: 'Vegan Tacos', image: '/vegantacos.jpeg', id: 10 },
  ],
  desserts: [
    { name: 'Chocolate Cake', image: '/chocolatecake.jpeg', id: 11 },
    { name: 'Apple Pie', image: '/applepie.jpeg', id: 12 },
  ],
  pasta: [
    { name: 'Spaghetti Carbonara', image: '/carbonara.jpeg', id: 13 },
    { name: 'Pesto Pasta', image: '/pestopasta.jpeg', id: 14 },
  ],
  entrees: [
    { name: 'Grilled Salmon', image: '/grilledsalmon.jpeg', id: 15 },
    { name: 'Steak', image: '/steak.jpeg', id: 16 },
  ],
};

export default function CategoryPage() {
  const router = useRouter();
  const { category } = router.query; // Get the category from the dynamic route

  if (!category) {
    return <div>Loading...</div>; // Show loading if category is not available yet
  }

  const categoryLowerCase = category.toLowerCase();
  const recipes = categoryRecipes[categoryLowerCase]; // Fetch recipes for the selected category

  if (!recipes) {
    return <div>No recipes found for this category</div>; // Show message if no recipes exist for this category
  }

  return (
    <>
      <Head>
        <title>{category.charAt(0).toUpperCase() + category.slice(1)} Recipes</title>
      </Head>

      <div className={styles.categoryContainer}>
        <h1>{category.charAt(0).toUpperCase() + category.slice(1)} Recipes</h1>
        <div className={styles.recipeGrid}>
          {recipes.map((recipe) => (
            <div 
              key={recipe.id} 
              className={styles.recipeCard}
              onClick={() => router.push(`/recipes/${recipe.id}`)} // Link to recipe details
            >
              <Image src={recipe.image} alt={recipe.name} width={300} height={200} className={styles.cardImage} />
              <div className={styles.recipeNameOverlay}>{recipe.name}</div> {/* Overlay the recipe name */}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
