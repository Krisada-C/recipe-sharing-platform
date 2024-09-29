import { useRouter } from 'next/router';
import styles from '@/styles/Recipe.module.css';
import Image from 'next/image';

// Updated recipe data with detailed instructions and unique IDs
const recipeData = [
  {
    id: 1,
    name: "Bruschetta",
    image: "/bruschettaimage.jpeg",
    ingredients: ["Tomatoes", "Garlic", "Basil", "Olive oil", "Bread"],
    instructions: "Mix all ingredients and spread on toasted bread."
  },
  {
    id: 2,
    name: "Stuffed Mushrooms",
    image: "/stuffedmushroomimage.jpeg",
    ingredients: ["Mushrooms", "Cheese", "Garlic", "Bread crumbs", "Parsley"],
    instructions: "Fill mushrooms with ingredients and bake for 20 minutes."
  },
  {
    id: 3,
    name: "Iced Coffee",
    image: "/icecoffeeimage.jpeg",
    ingredients: ["Ice", "Coffee", "Milk", "Sugar"],
    instructions: "Brew coffee and pour over ice. Add milk and sugar to taste."
  },
  {
    id: 4,
    name: "Lemonade",
    image: "/lemonadeimage.jpeg",
    ingredients: ["Lemons", "Sugar", "Water", "Ice"],
    instructions: "Squeeze lemons, add sugar and water. Stir well and serve over ice."
  },
  {
    id: 5,
    name: "Tomato Soup",
    image: "/tomatosoup.jpeg",
    ingredients: ["Tomatoes", "Onion", "Garlic", "Vegetable broth", "Cream"],
    instructions: "Cook all ingredients and blend until smooth. Simmer and add cream."
  },
  {
    id: 6,
    name: "Chicken Noodle Soup",
    image: "/chickennoodleimage.jpeg",
    ingredients: ["Chicken", "Noodles", "Carrots", "Celery", "Chicken broth"],
    instructions: "Cook chicken, add vegetables and broth. Simmer and add noodles."
  },
  {
    id: 7,
    name: "Caesar Salad",
    image: "/caesarsalad.jpeg",
    ingredients: ["Romaine lettuce", "Caesar dressing", "Parmesan cheese", "Croutons"],
    instructions: "Toss lettuce with dressing, top with cheese and croutons."
  },
  {
    id: 8,
    name: "Greek Salad",
    image: "/greeksalad.jpeg",
    ingredients: ["Cucumbers", "Tomatoes", "Feta cheese", "Olives", "Onions"],
    instructions: "Mix all ingredients and drizzle with olive oil and lemon juice."
  },
  {
    id: 9,
    name: "Vegan Burger",
    image: "/veganburger.jpeg",
    ingredients: ["Vegan patties", "Lettuce", "Tomato", "Vegan mayo", "Burger buns"],
    instructions: "Grill patties and assemble burger with toppings."
  },
  {
    id: 10,
    name: "Vegan Tacos",
    image: "/vegantacos.jpeg",
    ingredients: ["Taco shells", "Black beans", "Avocado", "Salsa", "Cilantro"],
    instructions: "Fill taco shells with ingredients and serve with salsa."
  },
  {
    id: 11,
    name: "Chocolate Cake",
    image: "/chocolatecake.jpeg",
    ingredients: ["Flour", "Cocoa powder", "Sugar", "Eggs", "Butter"],
    instructions: "Mix all ingredients and bake at 350°F for 30 minutes."
  },
  {
    id: 12,
    name: "Apple Pie",
    image: "/applepie.jpeg",
    ingredients: ["Apples", "Cinnamon", "Sugar", "Pie crust", "Butter"],
    instructions: "Fill pie crust with apples and bake at 375°F for 45 minutes."
  },
  {
    id: 13,
    name: "Spaghetti Carbonara",
    image: "/carbonara.jpeg",
    ingredients: ["Spaghetti", "Eggs", "Parmesan cheese", "Pancetta", "Pepper"],
    instructions: "Cook spaghetti and mix with pancetta, eggs, and cheese."
  },
  {
    id: 14,
    name: "Pesto Pasta",
    image: "/pestopasta.jpeg",
    ingredients: ["Pasta", "Basil", "Garlic", "Olive oil", "Pine nuts"],
    instructions: "Blend pesto ingredients and toss with cooked pasta."
  },
  {
    id: 15,
    name: "Grilled Salmon",
    image: "/grilledsalmon.jpeg",
    ingredients: ["Salmon fillets", "Lemon", "Olive oil", "Salt", "Pepper"],
    instructions: "Grill salmon with olive oil, salt, and pepper. Squeeze lemon juice before serving."
  },
  {
    id: 16,
    name: "Steak",
    image: "/steak.jpeg",
    ingredients: ["Steak", "Salt", "Pepper", "Garlic butter"],
    instructions: "Season steak and cook to preferred doneness. Serve with garlic butter."
  },
  
];
const categoryRecipes = [
    { name: "Almond Pastry Cookies", image: "/almondpastrycookies.jpeg", id: 17 },
    { name: "Instant Pot Recipes", image: "/instantpotrecipes.jpeg", id: 18 },
    { name: "Rustic Crusty Bread", image: "/rusticcrustybread.jpeg", id: 19 },
    { name: "Molten Chocolate Cake", image: "/moltenchocolatecake.jpeg", id: 4 },
    { name: "Rose Syrup Ice Tea", image: "/rosesyrupicetea.jpeg", id: 20 }
  ];
  
  // Inside your JSX (HTML-like part of Next.js code)
  <div className={styles.categoryRecipes}>
    {categoryRecipes.map(recipe => (
      <div key={recipe.id}>
        <Image src={recipe.image} alt={recipe.name} width={300} height={200} />
        <p>{recipe.name}</p>
      </div>
    ))}
  </div>
  

export default function RecipeDetail() {
  const router = useRouter();
  const { id } = router.query;

  if (!id) {
    return <div>Loading...</div>;
  }

  // Find the recipe by ID
  const recipe = recipeData.find(recipe => recipe.id === parseInt(id));

  if (!recipe) {
    return <div>Recipe not found.</div>;
  }

  return (
    <div className={styles.recipeContainer}>
      <h1>{recipe.name}</h1>
      <Image src={recipe.image} alt={recipe.name} width={500} height={300} className={styles.recipeImage} />
      <h2>Ingredients</h2>
      <ul>
        {recipe.ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
      <h2>Instructions</h2>
      <p>{recipe.instructions}</p>
      <div className={styles.buttonContainer}>
        <button className={styles.backButton} onClick={() => router.back()}>Back</button>
        <button className={styles.exitButton} onClick={() => router.push('/')}>Exit</button>
      </div>
    </div>
  );
}
