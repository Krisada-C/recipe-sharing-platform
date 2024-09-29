import { useState } from 'react';

export default function RecipeForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    if (image) {
      formData.append('image', image);
    }

    try {
      const res = await fetch('/api/recipes', {
        method: 'POST',
        body: formData,
      });

      if (res.ok) {
        alert('Recipe uploaded successfully');
        // Handle success, e.g., redirect or reset form
      } else {
        const errorData = await res.json();
        alert(`Error: ${errorData.error}`);
      }
    } catch (error) {
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Recipe Title"
        required
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        required
      ></textarea>
      <input
        type="file"
        onChange={(e) => setImage(e.target.files[0])}
        accept="image/*"
      />
      <button type="submit">Upload Recipe</button>
    </form>
  );
}
