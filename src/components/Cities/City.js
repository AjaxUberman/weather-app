import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "weather-react-icons/lib/css/weather-icons.css";
import { WeatherIcon } from "weather-react-icons";
import { setDatas2 } from "../../features/counter/counterSlice";

const City = ({ lat, lon }) => {
  const [datas, setDatas] = useState();
  const api = sessionStorage.getItem("api");
  const [descriptions, setDescriptions] = useState("");
  const [hava, setHava] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api}&lang=tr`
        );
        const fetchedData = await response.json();
        setDatas(fetchedData);
        dispatch(setDatas2(fetchedData));
      } catch (error) {
        console.error("Şehir Data'sı çekilemedi.", error);
      }
    };
    fetchData();
  }, []);

  const descriptionColors = {
    açık: "text-sunny",
    kapalı: "text-clear",
    yağmurlu: "text-rainy",
    azbulutlu: "text-pastel-bugday",
    parçalıazbulutlu: "text-gray-500",
    parçalıbulutlu: "text-pastel-mor",
  };

  const tempColors = {
    sicak: "bg-pastel-turuncu text-white",
    soğuk: "bg-soguk text-white",
    orta: "bg-pastel-acik-pembe text-black",
  };

  useEffect(() => {
    if (datas && datas.weather && datas.weather.length > 0) {
      const description = datas.weather[0].description.split(" ").join("");
      setDescriptions(description);
    }
  }, [datas]);

  useEffect(() => {
    if (datas && datas.weather && datas.weather.length > 0) {
      if (Math.ceil(datas.main.temp - 272.15) < 5) {
        setHava("soğuk");
      } else if (5 > Math.ceil(datas.main.temp - 272.15) < 25) {
        setHava("orta");
      } else {
        setHava("sicak");
      }
    }
  }, [datas]);

  /*   console.log(hava);
   */
  return (
    <div className=" w-full h-full">
      <div>
        {datas && (
          <div className="w-96 h-80 flex flex-col items-center justify-center text-center ">
            <h1
              className={`font-extrabold capitalize rounded-full bg-pastel-acik-pembe ${descriptionColors[descriptions]} text-3xl px-5 py-2 w-80`}
            >
              {datas.name}
            </h1>
            <div className="pt-4">
              {datas.weather.map((i, index) => (
                <div
                  key={index}
                  className="flex gap-3 justify-center items-center"
                >
                  <h1 className="text-3xl">
                    <WeatherIcon
                      iconId={i.id}
                      name="owm"
                      night
                      className={`${descriptionColors[descriptions]}`}
                    />
                  </h1>
                  <h1
                    className={`${descriptionColors[descriptions]} font-bold capitalize`}
                  >
                    {i.description}
                  </h1>
                </div>
              ))}
            </div>
            <div className="font-bold flex flex-col gap-4  translate-x-6 relative pt-8">
              <div className="flex justify-center items-center gap-5 ">
                <h1 className="text-l absolute right-8">Sıcaklık:</h1>
                <h1
                  className={`text-pastel-sari  ${tempColors[hava]}  rounded-full py-2 w-10 h-10 absolute -right-8`}
                >
                  {Math.ceil(datas.main.temp - 272.15)}
                </h1>
              </div>
              <div className="flex justify-center items-center gap-5 pt-8">
                <h1 className="text-l absolute right-8">Hissedilen:</h1>
                <h1
                  className={`text-pastel-sari  ${tempColors[hava]}  rounded-full py-2 w-10 h-10 absolute -right-8`}
                >
                  {Math.floor(datas.main.feels_like - 272.15)}
                </h1>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default City;
