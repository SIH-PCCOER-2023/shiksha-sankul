const UserProfile = (props) => {
  return (
    <div className="user-profile">
      <img src="img.jpg" alt="User Avatar" className="avatar" />
      <div className="user-details">
        <h2>John</h2>
        <p>Email: abc@gmail.com</p>
        <p>Location: xyz</p>
      </div>
    </div>
  );
};

export default UserProfile;
