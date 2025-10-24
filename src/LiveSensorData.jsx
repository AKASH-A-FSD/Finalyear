// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const LiveSensorData = () => {
//   const [sensorData, setSensorData] = useState({
//     temperature_C: "--",
//     humidity: "--",
//     soil_moisture: "--",
//     soil_pH: "--",
//     predicted_yield: "--",
//     suggestions: "--",
//   });

//   const fetchSensorData = async () => {
//     try {
//       console.log("Fetching sensor data from backend...");
//       const response = await axios.post("http://172.20.10.2:5000/predict", {
//         temperature_C: 28,
//         humidity: 71,
//         soil_moisture: 770,
//         soil_pH: 5.42,
//         crop_type: "Wheat",
//       });

//       console.log("Backend response:", response.data);

//       const data = response.data;

//       // Map backend keys to frontend state
//       setSensorData({
//         temperature_C: data.temperature_C,
//         humidity: data["humidity_%"],
//         soil_moisture: data["soil_moisture_%"],
//         soil_pH: data.soil_pH,
//         predicted_yield: data.predicted_yield_kg_per_hectare,
//         suggestions: data.suggestions,
//       });
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };

//   useEffect(() => {
//     fetchSensorData(); 
//     const interval = setInterval(fetchSensorData, 5000); 
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div style={{ fontFamily: "sans-serif", maxWidth: "500px", margin: "auto" }}>
//       <h1>🌾 Smart Agriculture Live Dashboard</h1>
//       <p>🌡️ Temperature: {sensorData.temperature_C} °C</p>
//       <p>💧 Humidity: {sensorData.humidity} %</p>
//       <p>🌱 Soil Moisture: {sensorData.soil_moisture}</p>
//       <p>🧪 Soil pH: {sensorData.soil_pH}</p>
//       <p>📈 Predicted Yield: {sensorData.predicted_yield} kg/ha</p>
//       <p>💡 Suggestions: {sensorData.suggestions}</p>
//     </div>
//   );
// };

// export default LiveSensorData;
// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const LiveSensorData = () => {
//   const [sensorData, setSensorData] = useState({
//     temperature: "--",
//     humidity: "--",
//     soil_moisture: "--",
//     ph: "--",
//     predicted_yield: "--",
//     suggestions: "--",
//   });

//   const fetchSensorData = async () => {
//     try {
//       // 1️⃣ Fetch live ESP32 sensor data
//       const espResponse = await axios.get("http://172.20.10.5/data");
//       const espData = espResponse.data;
//       console.log("ESP32 Data:", espData);

//       // 2️⃣ Send live sensor data to backend for prediction
//       const backendResponse = await axios.post("http://localhost:5000/predict", {
//         temperature_C: espData.temperature,
//         humidity: espData.humidity,
//         soil_moisture: espData.soil_moisture,
//         soil_pH: espData.ph,
//         crop_type: "Wheat", // default crop
//       });
//       console.log("Backend response:", backendResponse.data);

//       // 3️⃣ Update dashboard
//       const prediction = backendResponse.data;
//       setSensorData({
//         temperature: espData.temperature,
//         humidity: espData.humidity,
//         soil_moisture: espData.soil_moisture,
//         ph: espData.ph,
//         predicted_yield: prediction.predicted_yield_kg_per_hectare,
//         suggestions: prediction.suggestions,
//       });
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };

//   useEffect(() => {
//     fetchSensorData();
//     const interval = setInterval(fetchSensorData, 2000); // update every 2s
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div style={{ fontFamily: "sans-serif", maxWidth: "500px", margin: "auto" }}>
//       <h1>🌾 Smart Agriculture Live Dashboard</h1>
//       <p>🌡️ Temperature: {sensorData.temperature} °C</p>
//       <p>💧 Humidity: {sensorData.humidity} %</p>
//       <p>🌱 Soil Moisture: {sensorData.soil_moisture}</p>
//       <p>🧪 Soil pH: {sensorData.ph}</p>
//       <p>📈 Predicted Yield: {sensorData.predicted_yield} kg/ha</p>
//       <p>💡 Suggestions: {sensorData.suggestions}</p>
//     </div>
//   );
// };

// export default LiveSensorData;
import React, { useEffect, useState } from "react";
import axios from "axios";

const LiveSensorData = () => {
  const [sensorData, setSensorData] = useState({
    temperature: "--",
    humidity: "--",
    soil_moisture: "--",
    ph: "--",
    predicted_yield: "--",
    suggestions: "--",
  });

  const fetchSensorData = async () => {
    try {
      const espResponse = await axios.get("http://172.20.10.5/data");
      const espData = espResponse.data;
      console.log("ESP32 Data:", espData);

      const backendResponse = await axios.post("http://localhost:5000/predict", {
        temperature_C: espData.temperature,
        humidity: espData.humidity,
        soil_moisture: espData.soil_moisture,
        soil_pH: espData.ph,
        crop_type: "Wheat",
      });
      console.log("Backend response:", backendResponse.data);

      const prediction = backendResponse.data;
      setSensorData({
        temperature: espData.temperature,
        humidity: espData.humidity,
        soil_moisture: espData.soil_moisture,
        ph: espData.ph,
        predicted_yield: prediction.predicted_yield_kg_per_hectare,
        suggestions: prediction.suggestions,
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchSensorData();
    const interval = setInterval(fetchSensorData, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>🌾 Smart Agriculture Live Dashboard</h1>
      <div style={styles.grid}>
        <div style={{ ...styles.card, background: "#FFECB3" }}>
          <h3>🌡️ Temperature</h3>
          <p style={styles.value}>{sensorData.temperature} °C</p>
        </div>
        <div style={{ ...styles.card, background: "#B3E5FC" }}>
          <h3>💧 Humidity</h3>
          <p style={styles.value}>{sensorData.humidity} %</p>
        </div>
        <div style={{ ...styles.card, background: "#C8E6C9" }}>
          <h3>🌱 Soil Moisture</h3>
          <p style={styles.value}>{sensorData.soil_moisture}</p>
        </div>
        <div style={{ ...styles.card, background: "#E1BEE7" }}>
          <h3>🧪 Soil pH</h3>
          <p style={styles.value}>{sensorData.ph}</p>
        </div>
        <div style={{ ...styles.card, background: "#FFE082" }}>
          <h3>📈 Predicted Yield</h3>
          <p style={styles.value}>{sensorData.predicted_yield} kg/ha</p>
        </div>
      </div>

      <div style={styles.suggestionBox}>
        <h3>💡 Suggestions</h3>
        <p>{sensorData.suggestions}</p>
      </div>
    </div>
  );
};

// 🧑‍🎨 Styles
const styles = {
  container: {
    fontFamily: "Poppins, sans-serif",
    textAlign: "center",
    background: "linear-gradient(to bottom right, #f1f8e9, #e8f5e9)",
    minHeight: "100vh",
    padding: "20px",
  },
  heading: {
    fontSize: "2rem",
    marginBottom: "30px",
    color: "#2E7D32",
    fontWeight: "600",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "20px",
    marginBottom: "30px",
  },
  card: {
    borderRadius: "15px",
    padding: "20px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.15)",
    color: "#2e2e2e",
    transition: "transform 0.2s ease-in-out",
  },
  value: {
    fontSize: "1.6rem",
    fontWeight: "bold",
    marginTop: "10px",
  },
  suggestionBox: {
    background: "#FFF8E1",
    borderRadius: "15px",
    padding: "20px",
    boxShadow: "0px 3px 8px rgba(0,0,0,0.1)",
    maxWidth: "600px",
    margin: "auto",
  },
};

export default LiveSensorData;
