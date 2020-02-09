import React, { useContext, useState } from "react";
import AspectButton from "../components/aspectButton";
import aspects from "../data/aspects";
import { Link } from "react-router-dom";
import { CurrentUserContext } from "../contexts/UseCurrentUserContext";
import { useGetATask } from "../services/useAsyncTask";
import {
  useGetADeveloper,
  updateDeveloper
} from "../services/useAsyncDevelopers";
import { useGetAspects } from "../services/useAsyncAspects";

// Children Components
const buildApectButtonsGroup = ({
  TaskID,
  DeveloperID,
  aspectGroupKey,
  aspectsGroup
}) =>
  aspectsGroup.map((aspectData, index) => (
    <AspectButton
      key={`aspect-${aspectGroupKey}-${index}`}
      aspectData={aspectData}
      DeveloperID={DeveloperID}
      TaskID={TaskID}
    />
  ));

// Main Component
const PointsAllocator = ({ location: { pathname } }) => {
  const [, , TaskID, , DeveloperID] = pathname.split("/");

  const [task, ,] = useGetATask(TaskID);
  const [developer, ,] = useGetADeveloper({
    TaskID,
    DeveloperID
  });

  const IDs = { TaskID, DeveloperID };

  const { currentUserState } = useContext(CurrentUserContext);

  if (!currentUserState) {
    window.location.assign("/");
  }

  const [currenDeveloper, setCurrentDeveloper] = useState(currentUserState);

  const sumAspectsPoints = () => {
    return (
      developer &&
      developer.data().aspects.reduce((accumulator, currentAspect) => {
        return accumulator + currentAspect.points;
      }, 3)
    );
  };

  const calculateHighFibonacci = () => {
    return [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233]
      .filter(number => number >= sumAspectsPoints())
      .shift();
  };

  const handleStartPointsAllocation = () => {
    const update = { ...currenDeveloper, status: "allocating" };
    setCurrentDeveloper(update);

    updateDeveloper({ TaskID, updatedDeveloper: update });
  };

  const developerIsWaiting = () => currenDeveloper.status === "waiting";
  const developerIsAllocating = () => currenDeveloper.status === "allocating";
  const developerIsReady = () => currenDeveloper.status === "ready";

  const handleReadyUser = () => {
    const update = {
      ...currenDeveloper,
      status: "ready",
      points: calculateHighFibonacci()
    };
    setCurrentDeveloper(update);

    updateDeveloper({ TaskID, updatedDeveloper: update });
  };

  const aspectGroupKeys = Object.keys(aspects);

  return (
    <>
      <div className="allocationActions">
        <Link to="/task/new">
          <a class="nes-btn" href="!#">
            {"<= Regresar"}
          </a>
        </Link>
        {developerIsAllocating() && (
          <Link to="/task/new" onClick={handleReadyUser}>
            <button type="button" className="nes-btn is-success">
              I´m Ready!
            </button>
          </Link>
        )}
        {developerIsWaiting() && (
          <button
            className="nes-btn is-primary"
            onClick={handleStartPointsAllocation}
          >
            Start
          </button>
        )}
        {developerIsReady() && (
          <button
            className="nes-btn is-primary"
            onClick={handleStartPointsAllocation}
          >
            Cambiar mi selección
          </button>
        )}
      </div>
      <div>
        <div className="m-informationBottom">
          <div className=" nes-container with-title">
            <p className="title">Task</p>
            <p>{task && task.data()?.description}</p>
          </div>
          <div className="nes-container with-title">
            <p className="title">Points</p>
            <p>{calculateHighFibonacci()}</p>
          </div>
          <div className="nes-container with-title">
            <p className="title">Dev</p>
            <p>{currenDeveloper.name}</p>
          </div>
        </div>
        <div className="aspectsToSelect">
          {developerIsAllocating() &&
            aspectGroupKeys.map(groupKey => (
              <div key={groupKey}>
                <span className="groupTitle nes-text is-primary">
                  {groupKey}
                </span>
                <div className="aspectsButtonsGroup">
                  {buildApectButtonsGroup({
                    TaskID,
                    DeveloperID,
                    aspectGroupKey: groupKey,
                    aspectsGroup: aspects[groupKey]
                  })}
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default PointsAllocator;
