import { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from 'next/router'; // Ensure you import useRouter
import styles from "@/styles/Home.module.css";

export default function Home() {
  // State to store search query and filtered recipes
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredRecipes, setFilteredRecipes] = useState([]);

  // Initialize router
  const router = useRouter(); 

  // Sample recipe data (this can be dynamic or fetched from an API)
  const recipes = [
    {
      name: "Almond Pastry Cookies",
      image: "/almondpastrycookie.jpeg",
      ingredients: [
        "1 cup almond flour",
        "1/2 cup powdered sugar",
        "1/4 cup unsalted butter, softened",
        "1/2 tsp vanilla extract",
        "1/4 tsp almond extract",
        "1/4 tsp salt",
        "1 egg white",
        "1/2 cup sliced almonds"
      ],
      instructions: [
        "Preheat the oven to 350°F (175°C).",
        "In a bowl, mix almond flour, powdered sugar, and salt.",
        "Add softened butter, vanilla extract, and almond extract. Mix until combined.",
        "Whisk the egg white until frothy and fold it into the mixture.",
        "Form small balls and place them on a baking sheet.",
        "Press a sliced almond on top of each cookie.",
        "Bake for 12-15 minutes or until lightly golden.",
        "Allow to cool before serving."
      ]
    },
    {
      name: "Instant Pot Recipes",
      image: "/instantpotimage.jpeg",
      ingredients: [
        "1 lb chicken breast, cut into pieces",
        "1 cup chicken broth",
        "1/2 cup diced tomatoes",
        "1 onion, diced",
        "2 cloves garlic, minced",
        "1 tsp Italian seasoning",
        "Salt and pepper to taste"
      ],
      instructions: [
        "Turn on the Instant Pot and set it to sauté mode. Add onions and garlic, sauté until translucent.",
        "Add chicken pieces and brown on all sides.",
        "Pour in chicken broth and diced tomatoes, and add Italian seasoning.",
        "Seal the lid and set to cook on high pressure for 10 minutes.",
        "Once done, quick release the pressure.",
        "Season with salt and pepper before serving."
      ]
    },
    {
      name: "Rustic Crusty Bread",
      image: "/rusticcrustyimage.jpeg",
      ingredients: [
        "3 cups all-purpose flour",
        "1 1/4 tsp salt",
        "1/2 tsp instant yeast",
        "1 1/2 cups water"
      ],
      instructions: [
        "In a large bowl, combine flour, salt, and instant yeast.",
        "Add water and stir until a shaggy dough forms.",
        "Cover the bowl with plastic wrap and let it rest for 12-18 hours at room temperature.",
        "Preheat the oven to 450°F (230°C) and place a Dutch oven inside to heat.",
        "On a floured surface, shape the dough into a ball and let it rise for 30 minutes.",
        "Carefully transfer the dough into the hot Dutch oven and cover it.",
        "Bake for 30 minutes covered, then 15-20 minutes uncovered until golden brown."
      ]
    },
    {
      name: "Molten Chocolate Cake",
      image: "/moltenchocolateimage.jpeg",
      ingredients: [
        "1/2 cup unsalted butter",
        "1 cup semi-sweet chocolate chips",
        "2 eggs",
        "2 egg yolks",
        "1/4 cup sugar",
        "2 tbsp all-purpose flour",
        "1/4 tsp salt"
      ],
      instructions: [
        "Preheat the oven to 425°F (220°C) and grease ramekins.",
        "Melt butter and chocolate chips in a bowl over simmering water.",
        "In a separate bowl, whisk eggs, egg yolks, and sugar until light and fluffy.",
        "Fold the melted chocolate into the egg mixture.",
        "Sift in flour and salt, gently mixing until combined.",
        "Pour the batter into the prepared ramekins.",
        "Bake for 12-14 minutes until the edges are set but the center is soft.",
        "Let cool for 1 minute, then invert onto plates."
      ]
    },
    {
      name: "Rose Syrup Ice Tea",
      image: "/roseiceteaimage.jpeg",
      ingredients: [
        "2 cups water",
        "2 black tea bags",
        "1/4 cup rose syrup",
        "Ice cubes",
        "Fresh mint leaves for garnish"
      ],
      instructions: [
        "Boil water in a saucepan and steep the tea bags for 5 minutes.",
        "Remove the tea bags and stir in rose syrup.",
        "Let the tea cool to room temperature.",
        "Serve over ice and garnish with fresh mint leaves."
      ]
    },
    // Add more recipes here
  ];

    
    // Additional recipe objects can go here
  

  // Handle search input
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    // Filter recipes based on search query
    const filtered = recipes.filter((recipe) =>
      recipe.name.toLowerCase().includes(query)
    );
    setFilteredRecipes(filtered);
  };

  // Function to handle redirection to the signup/login page
  const handleRedirect = () => {
    router.push('/signup'); // Redirect to the signup page when clicked
  };

  // Function to handle category redirection
  const handleCategoryClick = (category) => {
    router.push(`/categories/${category}`); // Redirect to category-specific page
  };

  // Function to handle recipes page redirection from navigation bar
  const handleRecipesPage = () => {
    router.push('/recipes'); // Redirect to the main recipes page
  };

  // Function to handle redirection to the share recipe page
  const handleSharePage = () => {
    router.push('/share'); // Redirect to the share page when clicked
  };

  return (
    <>
      <Head>
        <title>Recipe Sharing Website</title>
        <meta name="description" content="Discover the best recipes" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.container}>
        {/* Navigation Bar */}
        <nav className={styles.navbar}>
          <div className={styles.navLogo}>
            <Image 
              src="/logoimage.jpeg" 
              alt="Logo" 
              width={50} 
              height={50} 
            />
            <h1>Recipe Sharing</h1>
          </div>
          <ul className={styles.navLinks}>
            <li><a href="#home">Home</a></li>
            <li><a onClick={handleRecipesPage}>Recipes</a></li> {/* Link to Recipes page */}
            <li><a href="#categories">Categories</a></li>
            <li><a onClick={handleSharePage}>Share</a></li> {/* Link to Share page */}
            <li><a href="#about">About</a></li>
            <li><a href="#contact">Contact</a></li>
            <li><button className={styles.authButton} onClick={handleRedirect}>Sign Up / Login</button></li>
          </ul>
        </nav>

        {/* Search Section */}
        <section className={styles.searchSection}>
          <input
            type="text"
            placeholder="Search for recipes..."
            value={searchQuery}
            onChange={handleSearch}
            className={styles.searchInput}
          />
        </section>

        {/* Header Section */}
        <header className={styles.header} id="home">
          <h1>Recipe Sharing Website</h1>
          <Image 
            src="/woodencuttingboard.jpeg" 
            alt="wooden cutting board" 
            layout="fill" 
            objectFit="cover" 
            priority 
          />
        </header>

        {/* Most Popular Recipes */}
        <section className={styles.popularRecipes} id="recipes">
          <h2>Most Popular Recipes</h2>
          <div className={styles.recipeGrid}>
            {(searchQuery ? filteredRecipes : recipes).map((recipe, index) => (
              <div key={index} className={styles.recipeCard} onClick={() => router.push(`/recipes/${index}`)}>
                <Image src={recipe.image} alt={recipe.name} width={300} height={200} />
                <p>{recipe.name}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Categories Section */}
        <section className={styles.categories} id="categories">
          <h2>Categories</h2>
          <div className={styles.categoryIcons}>
            <div className={styles.category} onClick={() => handleCategoryClick('appetizer')}>
              <Image src="/appetizerimage.jpeg" alt="Appetizer" width={100} height={100} />
              <p>Appetizer</p>
            </div>
            <div className={styles.category} onClick={() => handleCategoryClick('beverages')}>
              <Image src="/beverages.jpeg" alt="Beverages" width={100} height={100} />
              <p>Beverages</p>
            </div>
            <div className={styles.category} onClick={() => handleCategoryClick('soup')}>
              <Image src="/soupimage.jpeg" alt="Soup" width={100} height={100} />
              <p>Soup</p>
            </div>
            <div className={styles.category} onClick={() => handleCategoryClick('salad')}>
              <Image src="/saladimage.jpeg" alt="Salad" width={100} height={100} />
              <p>Salad</p>
            </div>
            <div className={styles.category} onClick={() => handleCategoryClick('vegan')}>
              <Image src="/veganimage.jpeg" alt="Vegan" width={100} height={100} />
              <p>Vegan</p>
            </div>
            <div className={styles.category} onClick={() => handleCategoryClick('desserts')}>
              <Image src="/dessertimage.jpeg" alt="Desserts" width={100} height={100} />
              <p>Desserts</p>
            </div>
            <div className={styles.category} onClick={() => handleCategoryClick('pasta')}>
              <Image src="/pastaimage.jpeg" alt="Pasta" width={100} height={100} />
              <p>Pasta</p>
            </div>
            <div className={styles.category} onClick={() => handleCategoryClick('entrees')}>
              <Image src="/entreeimage.jpeg" alt="Entrees" width={100} height={100} />
              <p>Entrees</p>
            </div>
          </div>
        </section>

        {/* Footer Section */}
        <footer className={styles.footer}>
          <div>
            <h3>Join us to explore other recipes!</h3>
            <p>Signup or Login to view other recipes created by experts, foodies, and beginners!</p>
            <Image src="/arrowimage.jpeg" alt="arrow" width={50} height={50} />
            <button className={styles.authButton} onClick={handleRedirect}>Sign Up / Login</button>
          </div>
        </footer>
      </div>
    </>
  );
}
