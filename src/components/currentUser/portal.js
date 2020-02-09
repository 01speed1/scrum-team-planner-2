import React, { useContext, useState, useEffect } from "react";
import {
  CurrentUserContext,
  emptyDeveloperBuilder
} from "../../contexts/UseCurrentUserContext";
import { Link } from "react-router-dom";
import { useGetUsers, addUser } from "../../services/useAsyncUsers";

const Portal = () => {
  const { currentUserDispatch } = useContext(CurrentUserContext);

  const [currentUser, setCurrentUser] = useState(emptyDeveloperBuilder());
  const [validateEnter, setValidateEnter] = useState(false);

  const handleOnChageName = e => {
    setCurrentUser({ ...currentUser, name: e.target.value });
  };

  const handleOnChageLead = e => {
    setCurrentUser({
      ...currentUser,
      lead: e.target.value === "true" ? true : false
    });
  };

  useEffect(() => {
    setValidateEnter(currentUser.name.length > 0);
    return () => {
      setValidateEnter(currentUser.name.length > 0);
    };
  }, [currentUser.name]);

  const handleSaveCurrentUser = () => {
    addUser({ ...currentUser });

    currentUserDispatch({
      action: "UPDATE_CURRENT_USER",
      payload: currentUser
    });
  };

  const [users, loading, errors] = useGetUsers();

  return (
    <div className="m-portalContainer">
      <div className="nes-container with-title">
        <p className="title">Hi! Dev</p>
        <p>Good morning. Thou hast had a good night's sleep, I hope.</p>
      </div>
      <br />
      <div className="nes-container">
        <div className="nes-field">
          <label htmlFor="name_field">What´s your DevName</label>
          <input
            value={currentUser.name}
            type="text"
            id="name_field"
            className="nes-input"
            onChange={handleOnChageName}
          />
          <br />
          <p>You are a leader?</p>
          <label>
            <input
              value={true}
              checked={currentUser.lead}
              onChange={handleOnChageLead}
              type="radio"
              className="nes-radio"
              name="lead"
            />
            <span>Yes</span>
          </label>

          <label>
            <input
              value={false}
              checked={!currentUser.lead}
              onChange={handleOnChageLead}
              type="radio"
              className="nes-radio"
              name="lead"
            />
            <span>No</span>
          </label>
        </div>
        {validateEnter && (
          <Link to="/task/new">
            <button
              onClick={handleSaveCurrentUser}
              type="button"
              className={"nes-btn is-success"}
            >
              Let´s Go!!
            </button>
          </Link>
        )}
      </div>
      <br />
      <div className="nes-container with-title">
        <span className="title">Actual Users</span>
        <div className="m-usersList">
          {loading && <span>Loading users ...</span>}
          {users &&
            users.docs.map(user => (
              <span key={user.id} className="nes-text">
                {user.id}
              </span>
            ))}
        </div>
      </div>
      <br />
      {/* <pre>{JSON.stringify(currentUser, null, 2)}</pre> */}
    </div>
  );
};

export default Portal;
