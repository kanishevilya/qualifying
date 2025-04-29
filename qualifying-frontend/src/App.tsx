import React from "react";

import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import CardsPage from "./app/cards/page";
import GroupsPage from "./app/groups/page";
import Home from "./app/page";
import TagsPage from "./app/tags/page";
import { AppProvider } from "./context";

const App: React.FC = () => {
  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route path="/" Component={Home} />
          <Route path="/cards" Component={CardsPage} />
          <Route path="/groups" Component={GroupsPage} />
          <Route path="/tags" Component={TagsPage} />
        </Routes>
      </Router>
    </AppProvider>
  );
};

export default App;
