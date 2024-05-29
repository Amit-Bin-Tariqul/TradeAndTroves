import React, { useState, useEffect } from 'react';

const Blogs = () => {
  const [showFullContent, setShowFullContent] = useState([]);
  const [newPost, setNewPost] = useState(''); // State for the new blog post input

  const [users, setUsers] = useState([
    {
      username: 'Amit Panda',
      profileImage: '/images/casha.jpg',
      bio: 'Farmer (10yrs exp) | Aush Cal, Misti Alu',
      content: "Late blight of potato and tomato caused by Phytophthora infestans is a devastating disease worldwide and led to the Irish potato famine in 1845. Under favorable weather conditions, tomato and potato crops can be destroyed within days if left untreated. Yield losses caused by late blight and the cost of control measures have been estimated to exceed 6.7 billion dollars annually and the disease is a major threat to food security worldwide. Knowing where the disease is present can help improve the efficacy of fungicide treatments. Click here for an informative pamphlet on the disease"

    },
    // Add more users and their content here
  ]);

  const toggleShowFullContent = (index) => {
    const updatedShowFullContent = [...showFullContent];
    updatedShowFullContent[index] = !updatedShowFullContent[index];
    setShowFullContent(updatedShowFullContent);
  };

  const handlePostSubmit = () => {
    if (newPost) {
      // Create a new post and add it to the users array
      const newPostObj = {
        username: 'Your Name', // Replace with the actual user's name
        profileImage: '/images/zahid.jpg"', // Replace with the actual profile image URL
        bio: 'Your bio', // Replace with your bio
        content: newPost,
      };

      setUsers([...users, newPostObj]);
      setNewPost('');
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop ===
        document.documentElement.offsetHeight
      ) {
        // Implement your load more function here
        // For example, you can fetch more posts and add them to the users array
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div>
      {/* Post a new blog section */}
      <div className="bg-white p-4 rounded shadow-lg m-4">
        <h2 className="text-lg font-semibold mb-2">Post a New Blog</h2>
        <textarea
          rows="3"
          className="w-full rounded border p-2"
          placeholder="Write your blog here..."
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
        />
        <button className="text-white hover:underline" onClick={handlePostSubmit}>
          Post
        </button>
      </div>

      {users.map((user, index) => (
        <div className="bg-white p-4 rounded shadow-lg m-4" key={index}>
          {/* User profile section */}
          <div className="flex items-center">
            <img
              src={user.profileImage}
              alt={`${user.username}'s profile`}
              className="w-12 h-12 rounded-full object-cover mr-4"
            />
            <div>
              <h2 className="text-lg font-semibold">{user.username}</h2>
              <p className="text-gray-600">{user.bio}</p>
            </div>
          </div>

          {/* Blog post section */}
          <div className="mt-4">
            <h1 className="text-2xl font-semibold">User's Blog Post</h1>
            {showFullContent[index] || user.content.split(' ').length <= 20 ? (
              <p className="text-gray-700 mt-2">{user.content}</p>
            ) : (
              <p className="text-gray-700 mt-2">
                {user.content.split(' ').slice(0, 20).join(' ')}
                <button className="text-green-800 bg-white p-0 hover:underline mt-2" onClick={() => toggleShowFullContent(index)}>
                  See more
                </button>
              </p>
            )}
          </div>

          {/* Like, comment, and share buttons */}
          <div className="flex justify-between mt-4">
            <button className="text-white hover:underline">
              <i className="fa-solid fa-thumbs-up fa-beat-fade fa-xl" style={{ color: "#FFFFFF" }}></i> Like
            </button>
            <button className="text-white hover:underline">
              <i className="fa-solid fa-comment fa-xl" style={{ color: "#FFFFFF" }}></i> Comment
            </button>
            <button className="text-white hover:underline">
              <i className="fa-solid fa-share fa-xl" style={{ color: "#FFFFFF" }}></i> Share
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Blogs;
