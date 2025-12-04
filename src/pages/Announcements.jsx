import React from "react";
import Header from '../components/Header';

function Profile() {
  return (
    <div className="p-6">
      <Header/>
      <h1 className="text-2xl font-bold mb-4">Profile</h1>
      <p>Welcome to your profile page. You’ll be able to edit your information here.</p>
    </div>
  );
}

export default Profile;
