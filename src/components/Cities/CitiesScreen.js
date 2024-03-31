import React, { useEffect, useState } from "react";
import City from "./City";

const CitiesScreen = ({ cityName, lat23 }) => {
  const [datas, setDatas] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [lon, setLon] = useState("");
  const [lat, setLat] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://turkiyeapi.dev/api/v1/provinces");
        const fetchedData = await response.json();
        setDatas(fetchedData);
      } catch (error) {
        console.error("Şehir Data'sı çekilemedi.", error);
      }
    };
    fetchData();
  }, []);
  useEffect(() => {
    const filterCities = () => {
      if (!cityName) {
        setFilteredData(datas.data || []);
      } else {
        const filtered = datas.data.filter(
          (city) =>
            city.name
              .toLocaleLowerCase()
              .includes(cityName.toLocaleLowerCase()) ||
            city.id.toString().includes(cityName.toString())
        );
        setFilteredData(filtered);
      }
    };
    filterCities();
  }, [cityName, datas]);
  
  /*   console.log(lat);
   */
  const clickHandler = (e) => {
    const [latitude, longitude] = e.currentTarget.value.split(",");
    setLat(latitude);
    setLon(longitude);

    /* console.log(e.currentTarget.value); */
  };

  const buttonHandler = () => {
    setLat(!lat);
  };

  return (
    <>
      <button
        onClick={buttonHandler}
        className="absolute top-24 opacity-0 translate-y-2 translate-x-20 bg-black px-9 py-2"
      >
        DEĞİŞTİR
      </button>
      {!lat ? (
        <div className="grid grid-cols-4 gap-4">
          {filteredData.length > 0 ? (
            filteredData.map((data, index) => (
              <div key={index} className="col-span-1 px-2">
                <button
                  className="flex items-center gap-3 bg-pastel-mor text-pastel-sari font-bold px-4 py-2 rounded-full h-10 w-44 relative group shadow-aesthetic hover:shadow-morcerceve focus:shadow-morcerceve focus:outline-none transition duration-200 ease-in "
                  onClick={clickHandler}
                  value={`${data.coordinates.latitude},${data.coordinates.longitude}`}
                >
                  <h1 className="rounded-full bg-pastel-acik-pembe text-2xl w-10 absolute left-0 flex justify-center items-center h-full  transition duration-200 ease-in">
                    {data.id}
                  </h1>
                  <h1 className="flex-1  pl-2 text-center translate-x-3">
                    {data.name}
                  </h1>
                </button>
              </div>
            ))
          ) : (
            <h1 className="text-pastel-acik-pembe text-4xl font-extrabold whitespace-nowrap col-span-4 overflow-y-hidden h-40">
              Geçerli bir değer giriniz.
            </h1>
          )}
        </div>
      ) : (
        <City lat={lat} lon={lon} />
      )}
    </>
  );
};

export default CitiesScreen;
