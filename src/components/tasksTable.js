import React, { useContext, useState } from "react";
import { TaskContext } from "../contexts/UseTasksContext";
import { Link } from "react-router-dom";
import { CurrentUserContext } from "../contexts/UseCurrentUserContext";
import { useGetTasks, removeTask } from "../services/useAsyncTask";
import ErrorBLock from "./shared/errorBlock";
import {
  useGetDevelopers,
  addDeveloper,
  removeDeveloper
} from "../services/useAsyncDevelopers";
import { removeAllAspect } from "../services/useAsyncAspects";

const anyDeveloper = developers => {
  return developers && developers.docs.length >= 1;
};

const DevBadge = ({ developer, showAllPoints }) => {
  let colorStatus = "is-error";

  switch (developer.status) {
    case "allocating":
      colorStatus = "is-warning";
      break;
    case "ready":
      colorStatus = "is-success";
      break;
    default:
      colorStatus = "is-error";
  }

  const revealPoints = () => {
    if (showAllPoints) {
      return `- ${developer.points}`;
    }
  };

  return (
    <>
      <a href="!#" class="nes-badge">
        <span className={colorStatus}>
          {developer.name}
          {revealPoints()}
        </span>
      </a>
    </>
  );
};

const TaskBlock = ({ task, index }) => {
  const { currentUserState } = useContext(CurrentUserContext);

  const [developers, loading, error] = useGetDevelopers(task.id);

  const [showAllPoints, setShowAllPoints] = useState(false);

  const showPoints = () => {
    setShowAllPoints(!showAllPoints);
  };

  const handleDeleteTask = () => {
    removeTask(task.id);
  };

  const handleAddDeveloper = () => {
    addDeveloper({
      TaskID: task.id,
      newDeveloper: { ...currentUserState, aspects: [] }
    });
  };

  return (
    <div className="__taskGroup">
      <div className="nes-container with-title">
        <p className="title"> task</p>
        {/*<pre>{JSON.stringify(task.developers, null, 2)}</pre>*/}
        <p>{task.description}</p>
        {loading && <span>Loading Devs...</span>}
        {developers &&
          developers.docs.map(developer => (
            <DevBadge
              key={developer.id}
              developer={developer.data()}
              showAllPoints={showAllPoints}
            />
          ))}

        <div className="actions">
          <Link
            onClick={handleAddDeveloper}
            to={`/task/${task.id}/developer/${currentUserState.name}`}
          >
            <a className="nes-btn" href="!#">
              Allocate my points
            </a>
          </Link>

          {anyDeveloper(developers) && currentUserState.lead && (
            <button
              onClick={showPoints}
              type="button"
              className="nes-btn is-primary"
            >
              {!showAllPoints ? "Show" : "Hide"} dev points
            </button>
          )}

          <button
            onClick={handleDeleteTask}
            type="button"
            className="nes-btn is-error"
          >
            Remove this Task
          </button>
        </div>
      </div>
    </div>
  );
};

const TasksTable = () => {
  const [taskList, loading, errors] = useGetTasks();

  return (
    <>
      <ErrorBLock error={errors} />
      {loading && <h3>Loading Task...</h3>}
      <h2>Tasks </h2>

      {taskList &&
        taskList.docs.map(task => (
          <TaskBlock key={task.id} task={{ ...task.data(), id: task.id }} />
        ))}
    </>
  );
};

export default TasksTable;
