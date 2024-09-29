import { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from 'next/router'; // Import useRouter from next/router
import styles from "@/styles/Home.module.css";

export default function UploadedRecipes() {
  // State to store search query and filtered recipes
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredRecipes, setFilteredRecipes] = useState([]);

  // State to hold uploaded recipes (can be dynamic or fetched from an API)
  const [uploadedRecipes, setUploadedRecipes] = useState([]);

  // Sample uploaded recipes data (for demonstration)
  useEffect(() => {
    // You can replace this with an API call to fetch real recipes
    setUploadedRecipes([
      { name: "Spaghetti Carbonara", image: "/carbonaraimage.jpeg" },
      { name: "Chicken Tikka Masala", image: "/chickentikkaimage.jpeg" },
      { name: "Beef Stroganoff", image: "/beefstroganoffimage.jpeg" },
      { name: "Vegetable Stir Fry", image: "/stirfryimage.jpeg" },
      { name: "Apple Pie", image: "/applepieimage.jpeg" },
    ]);
  }, []);

  // Handle search input
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    // Filter recipes based on search query
    const filtered = uploadedRecipes.filter((recipe) =>
      recipe.name.toLowerCase().includes(query)
    );
    setFilteredRecipes(filtered);
  };

  // Initialize router
  const router = useRouter(); 

  // Function to handle redirection to the signup/login page
  const handleRedirect = () => {
    router.push('/signup'); // Change '/signup' to your actual signup/login route
  };

  return (
    <>
      <Head>
        <title>Uploaded Recipes</title>
        <meta name="description" content="View recipes uploaded by others" />
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
            <li><a href="/">Home</a></li>
            <li><a href="/recipes">Uploaded Recipes</a></li>
            <li><a href="#categories">Categories</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#contact">Contact</a></li>
            <li><button className={styles.authButton} onClick={handleRedirect}>Sign Up / Login</button></li>
          </ul>
        </nav>

        {/* Search Section */}
        <section className={styles.searchSection}>
          <input
            type="text"
            placeholder="Search for uploaded recipes..."
            value={searchQuery}
            onChange={handleSearch}
            className={styles.searchInput}
          />
        </section>

        {/* Uploaded Recipes Section */}
        <section className={styles.popularRecipes} id="recipes">
          <h2>Recipes Uploaded by Others</h2>
          <div className={styles.recipeGrid}>
            {(searchQuery ? filteredRecipes : uploadedRecipes).map((recipe, index) => (
              <div key={index}>
                <Image src={recipe.image} alt={recipe.name} width={300} height={200} />
                <p>{recipe.name}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Footer Section */}
        <footer className={styles.footer}>
          <div>
            <h3>Join us to explore other recipes!</h3>
            <p>Signup or Login to view other recipes created by experts, foodies and beginners!</p>
            <Image src="/arrowimage.jpeg" alt="arrow" width={50} height={50} />
            <button className={styles.authButton} onClick={handleRedirect}>Sign Up / Login</button>
          </div>
        </footer>
      </div>
    </>
  );
}
