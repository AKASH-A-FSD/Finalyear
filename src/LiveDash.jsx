import React, { useEffect, useState } from 'react'

const LiveDash = () => {

      const [data, setData] = useState({ temperature: "--", humidity: "--", soil: "--", light: "--" });

  const fetchData = async () => {
    try {
      const res = await fetch("http://172.20.10.5/data");
      const json = await res.json();
      setData(json);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="p-8 bg-gray-50 min-h-screen text-center">
      <h1 className="text-3xl font-bold text-green-600 mb-6">🌾 Smart Agriculture Live Dashboard</h1>
      <div className="grid grid-cols-2 gap-6 justify-center">
        <div className="bg-white p-6 rounded-2xl shadow">
          🌡️ <b>Temperature:</b> <span className="text-blue-600">{data.temperature} °C</span>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow">
          💧 <b>Humidity:</b> <span className="text-blue-600">{data.humidity} %</span>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow">
          🌱 <b>Soil:</b> <span className="text-blue-600">{data.soil}</span>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow">
          ☀️ <b>Light:</b> <span className="text-blue-600">{data.light}</span>
        </div>
      </div>
    </div>
    </>
  )
}

export default LiveDash
