import { useState } from 'react';

export default function UploadRecipe() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const handleUpload = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const res = await fetch('/api/recipes/upload', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ title, description, imageUrl })
    });
    const data = await res.json();
    alert(data.message);
  };

  return (
    <form onSubmit={handleUpload}>
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Recipe Title" required />
      <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Recipe Description" required />
      <input type="text" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} placeholder="Image URL" />
      <button type="submit">Upload Recipe</button>
    </form>
  );
}
