import Moon from "./../components/Moon";
import { useState, useEffect } from "react";
import ChartDropdown from "../components/ChartDropdown";
import YearDropdown from "../components/YearDropdown";
import chartData from "../data/chartData";

function LandingPage() {
  const [years, setYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState(null);

  const [resize, setResize] = useState(false);

  useEffect(() => {
    setYears(chartData.map((el) => el.year));
    // canvas resize event listener and function
    const keyDownHandler = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setResize(false);
      }
    };

    document.addEventListener("keydown", keyDownHandler);
    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  }, []);

  return (
    <div className="App" style={{ width: `${resize ? "100vw" : "90vw"}` }}>
      {resize ? (
        <></>
      ) : (
        <div>
          <h1 className="landing-heading">3D MoonQuake Map</h1>
          <div className="filter-wrapper">
            <ChartDropdown />
            <YearDropdown
              years={years}
              setSelectedYear={setSelectedYear}
              selectedYear={selectedYear}
            />
          </div>
          <div
            className="resize-button-wrapper"
            onClick={() => setResize(!resize)}
          >
            <button type="button" className="resize-button">
              resize
            </button>
          </div>
        </div>
      )}
      <div className={!resize ? "moon-wrapper" : ""}>
        <Moon
          widthMultiplier={resize ? 1 : 0.9}
          heightMultiplier={resize ? 1 : 0.7}
          selectedYear={selectedYear}
        />
      </div>
    </div>
  );
}

export default LandingPage;
