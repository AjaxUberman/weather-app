import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setApi, setKey, setUrl } from "../../features/counter/counterSlice";

const LoginApi = () => {
  const [apiInput, setApiInput] = useState("");
  const dispatch = useDispatch();
  const [data, setData] = useState("");
  const [shouldRenderAnasayfa, setShouldRenderAnasayfa] = useState(false);
  const [button, setButton] = useState(false);

  const apiHandler = async (e) => {
    dispatch(setApi(apiInput));
    await fetchData();
    setShouldRenderAnasayfa(Array.isArray(data) && data.length > 0);
    dispatch(setKey(shouldRenderAnasayfa));
  };

  useEffect(() => {
    apiHandler();
  }, [apiInput, data]);

  const fetchData = async () => {
    if (apiInput !== "") {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/geo/1.0/direct?q=London&limit=1&appid=${apiInput}`
        );
        if (!response.ok) {
          throw new Error("API failed");
        }
        const fetchedData = await response.json();
        setData(fetchedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    } else {
      console.error("API is empty");
    }
  };

  if (shouldRenderAnasayfa) {
    sessionStorage.setItem("api", apiInput);
    sessionStorage.setItem("url", data);
  } else {
    sessionStorage.removeItem("api");
  }

  return (
    <div className="flex  justify-center w-screen h-screen bg-gradient-to-b from-blue-200 to-cyan-200 ">
      <div className="flex flex-col justify-center items-center">
        <h1
          className={`font-bold text-red-500 mb-4 text-4xl ${
            data.cod === 401 && apiInput !== "" && button === true
              ? "opacity-100"
              : "opacity-0"
          }`}
        >
          YANLIŞ API GİRDİNİZ.
        </h1>
        <div className="flex gap-3">
          <input
            placeholder="API Key giriniz"
            className="rounded-full bg-pastel-pembe text-3xl px-2 py-2 text-center my-4 placeholder-white hover:shadow-neon-pink focus:shadow-neon-pink shadow-xl border-none outline-none transition duration-300 ease-in text-white"
            value={apiInput}
            onChange={(e) => setApiInput(e.target.value)}
          />
          <button
            onClick={() => {
              apiHandler();
              setButton(true);
            }}
            className="rounded-full bg-clear text-3xl px-2 py-2 text-center my-4 placeholder-white hover:shadow-neon-pink focus:shadow-neon-pink shadow-xl border-none outline-none transition duration-300 ease-in text-pastel-pembe font-bold"
          >
            Gönder
          </button>
        </div>
        <p className="w-80 text-center mt-3 text-white drop-shadow-xl text-l">
          Şemsiyeye ihtiyacınız olup olmadığını öğrenmek için API anahtarınızı
          girin.
        </p>
      </div>
    </div>
  );
};

export default LoginApi;
