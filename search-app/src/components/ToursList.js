import React, { useEffect, useState, Suspense, lazy } from "react";
import { CRow, CCol  } from '@coreui/react';


import "./ToursList.css";

const TourRow = lazy(() => import("./TourRow"));
const Spinner = lazy(() => import("../shared/Loader/Spinner"));


function ToursList() {
  const [tours, setTours] = useState([]);
  const [filteredTours, setFilteredTours] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3001/tours')
      .then(response => response.json())
      .then(data => {
        setTours(data.tours);
        setIsLoading(false);
      })
      .catch(error => console.log(error));
  }, []);

  // useEffect to filter tours
  useEffect(() => {
    setFilteredTours(
      tours.filter(tour => tour.title.toLowerCase().includes(searchTerm.toLowerCase()))
    )
  }, [searchTerm, tours]);


  // handle search method
  const handleSearch = (e) => {
    setSearchTerm(e.target.value)
  }


  return (
    <div className="tours-list-container">
      <h1>Tours</h1>
      {isLoading ? (
        <Spinner />
      ) : (
          <Suspense fallback={<div>Loading...</div>}>
            <text fontFamily="Sans" > Searching for something ? </text>
            <input type="text" value={searchTerm} id="search" onChange= {handleSearch} />
          <CRow>
            {filteredTours.map((tour) => (
              <TourRow key={tour.id} tour={tour} />
            ))}
            </ CRow>
            </Suspense>
      )}
    </div>
  );
}

export default ToursList;
