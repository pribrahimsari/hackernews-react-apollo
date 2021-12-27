import CreateLink from "./CreateLink";
import Header from "./Header";
import {Route, Routes} from "react-router-dom";
import Login from "./Login";
import Search from "./Search";
import LinkList from "./LinkList";

function App() {
  return (
    <div className="center w85">
      <Header />
      <div className="ph3 pv1 background-gray">
        <Routes>
          <Route
            exact
            path="/"
            element={<LinkList />}
          />

          <Route
            exact
            path="/create"
            element={<CreateLink />}
          />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/search" element={<Search />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
