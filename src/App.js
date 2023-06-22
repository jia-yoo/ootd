import { Route, Routes } from "react-router-dom";

import Home from "./components/routes/home/home.components";
import Navigation from "./components/routes/navigation/navigation.components";
import SignIn from "./components/routes/sign-in/sign-in.components";


const Shop = () => {
  return "i am shop page";
};
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="shop" element={<Shop />} />
        <Route path="sign-in" element={<SignIn />} />
      </Route>
    </Routes>
  );
};
export default App;
