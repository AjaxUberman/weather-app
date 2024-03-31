import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginApi from "./components/loginScreen/LoginApi";
import Anasayfa from "./components/mainScren/Anasayfa";
import { useSelector } from "react-redux";
import CitiesScreen from "./components/Cities/CitiesScreen";
import MapScreen from "./components/Map/MapScreen";

const App = () => {
  const key = useSelector((state) => state.api.key);

  const router = createBrowserRouter([
    {
      path: "/insert-api",
      element: <LoginApi />,
    },
    {
      path: "/",
      element: key ? <Anasayfa /> : <LoginApi />,
    },
    {
      path: "/cities",
      element: key ? <CitiesScreen /> : <LoginApi />,
    },
    {
      path: "/on-map",
      element: <MapScreen />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
