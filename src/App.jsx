import { BrowserRouter, Route, Routes } from "react-router";
import Navbar from "./Navbar";
import Body from "./Body";
import Login from "./Login";
import Profile from "./Profile";

function App() {
  return (
    <>
      <BrowserRouter basename="/">
        <Routes>
          <Route
            path="/"
            element={
              <div>
                <Body />
              </div>
            }
          >
            <Route
              path="/login"
              element={
                <div>
                  <Login />
                </div>
              }  
            ></Route>
            <Route
              path="/profile"
              element={
                <div>
                  <Profile />
                </div>
              }
            ></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
