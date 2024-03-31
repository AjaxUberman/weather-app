import React, { useState } from "react";
import TurkeyMap from "turkey-map-react";
import "./map.css";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const MapScreen = () => {
  const [hoveredRegion, setHoveredRegion] = useState(null);
  const [hoverPosition, setHoverPosition] = useState({ x: 0, y: 0 });
  const api = sessionStorage.getItem("api");
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const [lat, setLat] = useState("");
  const [lon, setLon] = useState("");
  const [finalData, setFinaldata] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (api && hoveredRegion) {
          const response = await fetch(
            `http://api.openweathermap.org/geo/1.0/direct?q=${hoveredRegion.name}&limit=5&appid=${api}`
          );
          const fetchedData = await response.json();
          setData(fetchedData);
          if (fetchedData && fetchedData.length > 0) {
            const firstItem = fetchedData[0];
            setLat(firstItem.lat);
            setLon(firstItem.lon);
          }
        } else {
          console.error("API yanlış veya hoveredRegion değeri null!");
        }
      } catch (error) {
        console.error("Veri Çekilemedi", error);
      }
    };
    fetchData();
  }, [api, hoveredRegion]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (api && lat && lon) {
          const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api}&lang=tr`
          );
          const fetchedData = await response.json();
          setFinaldata(fetchedData);
        } else {
          console.log("API Yanlış veya lat, lon değerleri eksik!");
        }
      } catch (error) {
        console.error("Veriyi çekemedik.", error);
      }
    };
    fetchData();
  }, [api, lat, lon]);

  const handleMouseMove = (event) => {
    setHoverPosition({ x: event.clientX, y: event.clientY });
  };

  const customStyle = {};

  return (
    <div className="citymap" onMouseMove={handleMouseMove}>
      <TurkeyMap
        hoverable={true}
        onHover={({ plateNumber, name }) => {
          setHoveredRegion({ plateNumber, name });
        }}
        customStyle={{ idleColor: "#B4B4B8", hoverColor: "#F5DD61" }}
      />
      {hoveredRegion && finalData && finalData.main && finalData.weather && (
        <div
          className={`hover-info absolute rounded-xl  text-white flex flex-col text-center py-2 px-4 bg-pastel-mor`}
          style={{ left: hoverPosition.x + 15, top: hoverPosition.y + 15 }}
        >
          <h1 className="text-3xl font-bold">{hoveredRegion.name}</h1>
          <p className="text-2xl">
            {Math.ceil(finalData.main.temp - 272) + "°"}
          </p>
          <p>{finalData.weather[0].description}</p>
        </div>
      )}
    </div>
  );
};

export default MapScreen;
