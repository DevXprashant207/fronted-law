import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BlogCard from '../components/BlogCard';

const API_BASE = 'https://law-firm-backend-e082.onrender.com/api/posts';

function Blog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(API_BASE)
      .then(res => res.json())
      .then(data => {
        if (data.success) setPosts(data.data);
        else setError('Failed to fetch posts');
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to fetch posts');
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-center py-10">Loading blog posts...</div>;
  if (error) return <div className="text-center py-10 text-red-500">{error}</div>;

  return (
    <div className="max-w-6xl mx-auto py-16 px-4">
      <h2 className="text-3xl font-bold text-[#cfac33] mb-12 text-center">Case Studies & Blog</h2>

      {posts.length === 0 ? (
        <div className="text-center text-gray-500">No posts found.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-12 gap-y-16">
          {posts.map(post => (
            <BlogCard 
              key={post.id} 
              post={post}
              onReadMore={() => navigate(`/blog/${post.slug}`)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Blog;
