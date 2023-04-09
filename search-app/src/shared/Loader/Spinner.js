import React from 'react';
import SpinnerImage from "./loading.gif"


function Spinner() {
  return (
    <div className="loader">
    <img src={SpinnerImage} alt="Loading..." />
   </div>
  );
}

export default Spinner;
