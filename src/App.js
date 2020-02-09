import React from "react";
import { TaskProvider } from "./contexts/UseTasksContext";
import MainTaskContainer from "./taskContainer";
import { CurrentUserProvider } from "./contexts/UseCurrentUserContext";

export default function App() {
  return (
    <>
      <TaskProvider>
        <h1>Scrum Points</h1>
        <CurrentUserProvider>
          <MainTaskContainer />
        </CurrentUserProvider>
      </TaskProvider>
    </>
  );
}
