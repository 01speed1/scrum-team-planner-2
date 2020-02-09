import React, { useState } from "react";
import "../styles.scss";
import { removeAspect, addAspect } from "../services/useAsyncAspects";
import {
  updateDeveloper,
  useGetADeveloper
} from "../services/useAsyncDevelopers";

const AspectButton = ({ aspectData, DeveloperID, TaskID }) => {
  const { aspect } = aspectData;

  const [selected, setSelected] = useState(false);
  const [selectionID, setSelectionID] = useState(null);

  const [developer, loading, error] = useGetADeveloper({ TaskID, DeveloperID });

  const handleOnClick = () => {
    setSelected(!selected);
    updateAspects(selected);
  };

  const removeAspect = (aspectFromFirebase, aspectToRemove) => {
    return aspectFromFirebase.filter(
      element => element.aspect !== aspectToRemove
    );
  };

  const updateAspects = () => {
    if (selected) {
      let filteredAspects =
        developer && removeAspect(developer.data().aspects, aspect);

      developer &&
        updateDeveloper({
          TaskID,
          updatedDeveloper: { ...developer.data(), aspects: filteredAspects }
        });

      setSelectionID(null);
    } else {
      developer &&
        updateDeveloper({
          TaskID,
          updatedDeveloper: {
            ...developer.data(),
            aspects: [...developer.data().aspects, aspectData]
          }
        });
    }
  };

  return (
    <button
      onClick={handleOnClick}
      className={`nes-btn aspectButton ${selected && "is-success"} ${loading &&
        "is-warning"} `}
    >
      {aspect}
    </button>
  );
};

export default AspectButton;
