import React from 'react';

function UserCard({ user }) {
  console.log(user);
  return (
    <div className="user-card">
      <h3>{user.name}</h3>
      <p>Total posts: {user.id}</p> 
    </div>
  );
}

export default UserCard;
