import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import "./ClassViewStyle";
import Menu from "../MenuBar/index";
import axios from "axios";

const ClassView = ({ setIndex, user }) => {
  const [selectedChart, setSelectedChart] = useState("ac");
  const [acData, setAcData] = useState([]);
  const [loData, setLoData] = useState([]);
  const [roData, setRoData] = useState([]);
  const [userData, setUserData] = useState('');
  const selectedData =
    selectedChart === "ac" ? acData :
    selectedChart === "lo" ? loData :
    roData;
    const prefix = selectedChart === "LO" ? "LO" : selectedChart === "RO" ? "RO" : "AC";


  useEffect(() => {
    const storedUserData = sessionStorage.getItem("userData");
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
  }, []);
   
  
  const loadLoScore = async (userData) => {
    const headers = {
      Authorization: 'Bearer YOUR_ACCESS_TOKEN',
      'Content-Type': 'application/json',
      year: userData.year,
      classname: userData.class,
      section: userData.section,
      subject: userData.subject,
      quarter: userData.quarter,
    };
    
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/class-overview-lo-avg`, { headers });
      console.log('LO API Response:', response.data);
  
      // Ensure response contains valid data
      if (response.data && Array.isArray(response.data.class_lo_averages)) {
        const scores = response.data.class_lo_averages.map(item => item.average_score);
        console.log("Extracted scores:", scores);
        setLoData(scores);
      } else {
        setLoData([]); // Reset to avoid errors
        console.error("Invalid AC Data format:", response.data);
      }
  
  
    } catch (error) {
      console.error('Error fetching LO scores:', error);
      setLoData([]);
    }
  };
  
  useEffect(() => {
    if (userData && Object.keys(userData).length > 0) {
      loadLoScore(userData);
    }
  }, [userData]);



  const loadRoScore = async (userData) => {
    const headers = {
      Authorization: 'Bearer YOUR_ACCESS_TOKEN',
      'Content-Type': 'application/json',
      year: userData.year,
      classname: userData.class,
      section: userData.section,
      subject: userData.subject,
      quarter: userData.quarter,
    };
    
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/class-overview-ro-avg`, { headers });
      console.log('RO API Response:', response.data);
  
      // Ensure response contains valid data
      if (response.data && Array.isArray(response.data.class_ro_averages)) {
        const scores = response.data.class_ro_averages.map(item => item.average_score);
        console.log("Extracted scores:", scores);
        setRoData(scores);
      } else {
        setRoData([]); // Reset to avoid errors
        console.error("Invalid RO Data format:", response.data);
      }
  
    } catch (error) {
      console.error('Error fetching RO scores:', error);
      setRoData([]);
    }
  };
  
  useEffect(() => {
    if (userData && Object.keys(userData).length > 0) {
      loadRoScore(userData);
    }
  }, [userData]);
  
  


  const loadAcScore = async (userData) => {
    const headers = {
      Authorization: 'Bearer YOUR_ACCESS_TOKEN',
      'Content-Type': 'application/json',
      year: userData.year,
      classname: userData.class,
      section: userData.section,
      subject: userData.subject,
      quarter: userData.quarter,
    };
    
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/class-overview-ac-avg`, { headers });
      console.log('AC API Response:', response.data);
  
      // Ensure response data is an array
      if (response.data && Array.isArray(response.data.class_ac_averages)) {
        const scores = response.data.class_ac_averages.map(item => item.average_score);
        console.log("Extracted scores:", scores);
        setAcData(scores);
      } else {
        setAcData([]); // Reset to avoid errors
        console.error("Invalid AC Data format:", response.data);
      }
  
    } catch (error) {
      console.error('Error fetching AC scores:', error);
      setAcData([]);
    }
  };
   
  useEffect(() => {
    if (userData && Object.keys(userData).length > 0) {
      loadAcScore(userData);
    }
  }, [userData]);

  // Chart configuration for ApexCharts
  const getChartOptions = () => ({
    chart: {
      type: "line",
      toolbar: { show: false },
      zoom: { enabled: true },
      background: "rgb(158, 184, 160 , 0.05)",
      scrollablePlotArea: {
        enabled: true, // Enables scrolling
        scrollHeight: undefined,
        scrollHorizontal: true,
      },
      
 parentHeightOffset: 10,
    },
    stroke: {
      curve: "smooth",
      width: 3,
    },
    colors: selectedChart === "ac" ? ["#2d6a4f"] : selectedChart === "lo" ? ["#74c69d"] : ["#40916c"],
    markers: {
      size: 6,
      strokeWidth: 2,
      hover: { size: 8 },
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 0.5,
        opacityFrom: 0.6,
        opacityTo: 0.5,
      },
    },
    grid: {
      borderColor: "#ddd",
      strokeDashArray: 4,
    },
    tooltip: {
      theme: "dark",
      style: { fontSize: "14px" },
    },
    
    
    xaxis: {
      categories: selectedData.length 
        ? selectedData.map((_, i) => `${selectedChart.toUpperCase()} ${i + 1}`) 
        : [`${selectedChart.toUpperCase()} 1`, `${selectedChart.toUpperCase()} 2`],
      labels: { style: { fontSize: "12px", colors: "#666" } },
      tickAmount: selectedData.length,
    },
    
    yaxis: {
      min: 0,
      max: 1,
      tickAmount: 5,
      floating: false,
      labels: { formatter: (value) => value.toFixed(2) }, 
    },
   // legend: { position: "top", horizontalAlign: "center" },
  });
  
  
  

  const getChartSeries = () => {
    const data =
      selectedChart === "ac" ? acData :
      selectedChart === "lo" ? loData :
      roData;
    console.log("chart",data)
    return [{
      name: selectedChart.toUpperCase() + " Scores",
      data: Array.isArray(data) && data.length > 0 ? data : [0], // Fallback to avoid errors
    }];
  };
  

  const handleClick = () => {
    setIndex(1);
  };

  const handleProfileClick = () => alert("Go to Profile");
  const handleSettingsClick = () => alert("Open Settings");
  const handleLogoutClick = () => alert("Logging Out...");

  useEffect(() => {
  const graphContainer = document.querySelector(".chart-wrapper"); // Select chart wrapper
  if (!graphContainer) return;

  let startX = 0;
  let startY = 0;

  const handleTouchStart = (event) => {
    startX = event.touches[0].clientX;
    startY = event.touches[0].clientY;
  };

  const handleTouchMove = (event) => {
    const deltaX = event.touches[0].clientX - startX;
    const deltaY = event.touches[0].clientY - startY;

    // If horizontal movement is more than vertical, prevent swipe navigation
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      event.stopPropagation();
      event.preventDefault();
    }
  };

  graphContainer.addEventListener("touchstart", handleTouchStart);
  graphContainer.addEventListener("touchmove", handleTouchMove);

  return () => {
    graphContainer.removeEventListener("touchstart", handleTouchStart);
    graphContainer.removeEventListener("touchmove", handleTouchMove);
  };
}, []);
  

  return (
    <>
      <div className="class-header">
        <div className="icon">
          <Menu
            onProfileClick={handleProfileClick}
            onSettingsClick={handleSettingsClick}
            onLogoutClick={handleLogoutClick}
            onReturnClick={handleClick}
          />
        </div>
        <div className="class-title">
          <h2>Class Overview</h2>
        </div>
      </div>

      <div className="class-container">
        <div className="info-box">
          <div className="info-text">
            <p><strong>Class:</strong> {userData.getclassName}</p>
            <p><strong>Year:</strong> {userData.year}</p>
            <p><strong>Subject:</strong> {userData.subjectName}</p>
          </div>
          <div className="info-text">
            <p><strong>Section:</strong> {userData.sectionName}</p>
            <p><strong>Quarter:</strong> {userData.quarterName}</p>
          </div>
        </div>

        <div className="chart-selection">
  <div className="custom-dropdown">
    <select
      className="chart-dropdown"
      value={selectedChart}
      onChange={(e) => setSelectedChart(e.target.value)}
    >
      <option value="ac">AC Average</option>
      <option value="lo">LO Average</option>
      <option value="ro">RO Average</option>
    </select>
  </div>
</div>

        {/* Chart Display */}
        <div className="chart-wrapper">
          <div className="chart-container">
            <ReactApexChart 
              options={getChartOptions()} 
              series={getChartSeries()} 
              type="line" 
              height={250} 
            />
          </div>
        </div>


        
      </div>
    </>
  );
};

export default ClassView;
