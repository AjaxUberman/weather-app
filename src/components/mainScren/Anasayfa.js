import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setItems } from "../../features/counter/counterSlice";
import { Link } from "react-router-dom";
import CitiesScreen from "../Cities/CitiesScreen";
import MapScreen from "../Map/MapScreen";
import { current } from "@reduxjs/toolkit";

const Anasayfa = () => {
  const [data, setData] = useState([]);
  const api = sessionStorage.getItem("api");
  const dispatch = useDispatch();
  const [cityName, setcityName] = useState("");
  const [map, setMap] = useState(false);
  const [currentComp, setCurrentComp] = useState("CitiesScreen");
  const [city, setCity] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (api) {
          const response = await fetch(
            `https://api.openweathermap.org/geo/1.0/direct?q=London&limit=1&appid=${api}`
          );
          const fetchedData = await response.json();
          setData(fetchedData);
        } else {
          console.error("API yanlış!");
        }
      } catch (error) {
        console.error("Veri Çekilemedi", error);
      }
    };
    fetchData();
    dispatch(setItems(data));
  }, [api, dispatch]);

  const cityHandler = (e) => {
    setcityName(e.target.value);
  };

  const clickHandlerCity = (e) => {
    setCurrentComp(e.target.value);
    setCity(!city);
    setMap(!map);
  };

  const clickHandlerMap = (e) => {
    setCurrentComp(e.target.value);
    setCity(!city);
    setMap(!map);
  };

  /*   console.log(city);
   */

  return (
    <>
      <div className="flex flex-col items-center gap-8 p-4 w-full h-full bg-gradient-to-b from-blue-200 to-cyan-200 overflow-y-hidden ">
        <h1 className="font-bold text-4xl font-Roboto text-pastel-acik-pembe drop-shadow-xl mt-4">
          Hava Durumu
        </h1>
        <div className="flex align-center justify-center  gap-4  ">
          <div className="focus:outline-none">
            <button
              value={"CitiesScreen"}
              className={`rounded-full bg-pastel-sari px-4 py-2 text-pastel-mor font-bold shadow-subtle hover:bg-gradient-to-r from-rose-400 to-red-500 focus:bg-gradient-to-r hover:text-white transition duration-200 ease-in font-roboto focus:outline-none focus:text-white ${
                city ? " bg-gradient-to-r from-rose-400 to-red-500" : ""
              }`}
              onClick={clickHandlerCity}
            >
              Şehrinizi Seçin
            </button>
          </div>
          <div className="focus:outline-none focus:border-none">
            <button
              className={`rounded-full bg-pastel-sari px-4 py-2 text-pastel-mor font-bold shadow-subtle hover:bg-gradient-to-r from-rose-400 to-red-500 focus:bg-gradient-to-r hover:text-white transition duration-200 ease-in font-roboto focus:outline-none focus:text-white ${
                map ? " bg-gradient-to-r from-rose-400 to-red-500" : ""
              }`}
              value={"MapScreen"}
              onClick={clickHandlerMap}
            >
              Harita
            </button>
          </div>
        </div>
        <div>
          <input
            placeholder="Şehrinizi Arayınız"
            onChange={cityHandler}
            className={`bg-transparent outline-pastel-mor  rounded-full outline px-4 py-2 focus:bg-white ${
              currentComp !== "CitiesScreen" ? "opacity-0" : ""
            }`}
          />
        </div>
        <div className="overflow-y-scroll  scrollbar-thumb-sky-700  scrollbar-thin scrollbar-track-transparent ">
          {currentComp === "CitiesScreen" ? (
            <CitiesScreen cityName={cityName} lat23={city} />
          ) : (
            <MapScreen />
          )}
        </div>
      </div>
    </>
  );
};

export default Anasayfa;
