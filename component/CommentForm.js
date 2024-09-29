import { useState } from 'react';

export default function CommentForm({ recipeId }) {
  const [comment, setComment] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`/api/recipes/${recipeId}/comment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ comment }),
      });

      if (res.ok) {
        alert('Comment added successfully');
        setComment(''); // Reset comment input
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
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Add a comment"
        required
      ></textarea>
      <button type="submit">Submit Comment</button>
    </form>
  );
}
