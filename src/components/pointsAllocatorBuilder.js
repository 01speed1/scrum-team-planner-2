import React, { useState, useEffect, useContext } from "react";
import TasksTable from "./tasksTable";
import { addTask } from "../services/useAsyncTask";
import { Link } from "react-router-dom";
import { removeUser } from "../services/useAsyncUsers";
import { CurrentUserContext } from "../contexts/UseCurrentUserContext";

const PointsAllocatorBuilder = () => {
  const { currentUserState } = useContext(CurrentUserContext);

  !currentUserState && window.location.assign("/");

  console.log("currentUserState");
  console.log(currentUserState);

  const [description, setDescription] = useState("");

  const [validTask, setValidTask] = useState(false);

  useEffect(() => {
    return () => {
      setValidTask(description.length > 2);
    };
  }, [description.length]);

  const handleOnClick = () => {
    addTask({
      description,
      points: 0
    });
    setDescription("");
  };

  const handleRemoveUser = () => {
    removeUser(currentUserState.name);
  };

  return (
    <div className="m-taskCreator">
      {/* <pre>{JSON.stringify(tasksState, null, 2)} </pre> */}
      <Link style={{ alignSelf: "flex-end", marginBottom: "1rem" }} to="/">
        <button onClick={handleRemoveUser} className="nes-btn is-error">
          {"<"}= goodbye
        </button>
      </Link>
      <div className="nes-container">
        <label htmlFor="textarea_field"> Give me a description :3 </label>
        <textarea
          value={description}
          onChange={e => setDescription(e.target.value)}
          id="textarea_field"
          class="nes-textarea"
        />
        {validTask && (
          <button
            onClick={handleOnClick}
            type="button"
            className={"nes-btn is-success"}
          >
            add the task now!
          </button>
        )}
      </div>

      <TasksTable />
    </div>
  );
};

export default PointsAllocatorBuilder;
