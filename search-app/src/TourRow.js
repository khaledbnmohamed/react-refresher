import React from "react";
import checkMark from "./correct.png"

function TourRow({ tour }) {
  return (
    <tr>
      <td>{tour.id}</td>
      <td>{tour.title}</td>
      <td>
        {tour.currency}
        {tour.price}
      </td>
      <td>{tour.rating}</td>
      <td>{tour.isSpecialOffer ? <img src={checkMark} alt="True" width={20} height={20} /> : <div />}</td>
    </tr>
  );
}

export default TourRow;
