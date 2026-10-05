import { BrowserRouter, Route, Routes } from "react-router";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import Navbar from "./components/Navbar";
import Body from "./components/Body";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Feed from "./components/Feed";
import Connections from "./components/Connections";
import Requests from "./components/Requests";

function App() {
  return (
    <>
      <Provider store={appStore}>
        <BrowserRouter basename="/">
          <Routes>
            <Route path="/" element={<div> <Body /> </div>}>
              <Route index element={ <div> <Feed/> </div> } ></Route>
              <Route path="/login" element={ <div> <Login /> </div> } ></Route>
              <Route path="/profile" element={ <div> <Profile /> </div>}></Route>x
              <Route path="/connections" element={ <div> <Connections/> </div>}></Route>x
              <Route path="/requests" element={ <div> <Requests/> </div>}></Route>x

            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
