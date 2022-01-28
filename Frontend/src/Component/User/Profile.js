import React from "react";
import { useSelector } from "react-redux";
import MetaData from "../Layout/MetaData";
import "./Profile.css";
import { Link } from "react-router-dom";
import Loader from "../Layout/Loader";
const Profile = ({ history }) => {
  const { user, isAuthenticated, loading } = useSelector((state) => state.user);

  React.useEffect(() => {
    if (isAuthenticated === false) {
      history.push("/account");
    }
  }, [isAuthenticated, history]);
  return (
    <>
      {loading ? (
        <>
          <Loader />
        </>
      ) : (
        <div className="profileContainer">
          <div>
            <h1>My Profile</h1>
            <img src={user.avatar.url} alt={user.name} />
            <Link to="/profile/edit">Edit Profile</Link>
          </div>
          <div>
            <div>
              <h4>Full Name</h4>
              <p>{user.name}</p>
            </div>
            <div>
              <h4>Full Email</h4>
              <p>{user.email}</p>
            </div>
            <div>
              <h4>Joined On</h4>
              <p>{String(user.createdAt).substr(0, 10)}</p>
            </div>
            <div>
              <Link to="/orders">My Orders</Link>
              <Link to="/password/edit">Change Password</Link>
            </div>
          </div>
        </div>
      )}
      <MetaData title="Profile" />
    </>
  );
};

export default Profile;
