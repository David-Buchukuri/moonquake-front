import React, { useEffect, useState } from "react";
import "./App.css";
import Globe from "react-globe.gl";
import surface from "./images/lunar-surface.jpg";
import bumpMap from "./images/lunar-bumpmap.jpg";
import axios from "axios";

function App() {
  const [markersData, setMarkersData] = useState([]);
  const [ringData, setRingsData] = useState([]);
  const labelsTopOrientation = new Set([
    "Apollo 12",
    "Luna 2",
    "Luna 20",
    "Luna 21",
    "Luna 24",
    "LCROSS Probe",
  ]);

  const fetch = async () => {
    const res = await axios.get(
      "https://test-deployment-production.up.railway.app/api/statistics"
    );
    const pointsData = res?.data?.map((element) => {
      return {
        id: element.id,
        lat: element.lat,
        lng: element.long,
        label: `Magnitude: ${element.magnitude}`,
        blank: ``,
        magnitude: Number(element.magnitude),
        date: element.timestamp,
        comment: element.comment,
      };
    });
    setMarkersData(pointsData);

    const ringsData = pointsData.map((el) => {
      return {
        lat: el.lat,
        lng: el.lng,
        maxR: el.magnitude * 2,
        propagationSpeed: el.magnitude,
        repeatPeriod: 800,
      };
    });

    setRingsData(ringsData);
  };

  useEffect(() => {
    fetch();
  }, []);
  return (
    <div className="App">
      <Globe
        globeImageUrl={surface}
        bumpImageUrl={bumpMap}
        backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
        showGraticules={true}
        labelsData={markersData}
        labelText="blank"
        labelSize={1.7}
        labelColor={() => "#D9730D"}
        labelDotRadius={0.7}
        labelDotOrientation={(d) =>
          labelsTopOrientation.has(d.label) ? "top" : "bottom"
        }
        pointsMerge={true}
        labelAltitude={0.02}
        labelLabel={(d) => `
        <div className={ {z-index: 50;} }><b>${d.label}</b></div>
        <div className={ {z-index: 50;} }>lat: ${d.lat}° --- lng: ${
          d.lng
        }°</div>
        <div className={ {z-index: 50;} }>${d.comment ?? " "}</div>
        <div className={ {z-index: 50;} }>Happened<i> ${d.date}</i></div>
      `}
        ringsData={ringData}
        ringColor={() => "#ff0000"}
        ringMaxRadius="maxR"
        ringPropagationSpeed={(d) => d.propagationSpeed}
        ringRepeatPeriod={(d) => d.repeatPeriod}
      />
      ;
    </div>
  );
}

export default App;
