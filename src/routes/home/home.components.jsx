import { Outlet } from "react-router-dom";

import Directory from '../../components/directory/directory.componenets'

const Home = () => {

  return (
    <div>
      <Outlet />
      <Directory  />
    </div>
  );
};

export default Home;
