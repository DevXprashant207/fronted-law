import React from 'react';

function BlogCard({ post, onReadMore }) {
  const { title, content, createdAt, slug } = post;
  const date = new Date(createdAt).toLocaleDateString('en-US', {
    year: 'numeric', month: 'short', day: 'numeric'
  });

  return (
    <div className="bg-[#f8f6f2] rounded-xl shadow p-6 border border-[#e5e2dc] flex flex-col h-full">
      <h3 className="text-lg font-bold text-[#23293a] mb-2">{title}</h3>
      <p className="text-xs text-[#cfac33] mb-2">{date}</p>
      <p className="text-gray-700 mb-4">{content.length > 120 ? content.slice(0, 120) + '...' : content}</p>
      <button
        onClick={onReadMore}
        className="text-[#cfac33] font-semibold text-sm hover:underline mt-auto text-left"
      >
        Read More →
      </button>
    </div>
  );
}

export default BlogCard;
