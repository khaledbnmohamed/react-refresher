import React from "react";
import checkMark from "./../assets/special-offer.gif"
import { CCard, CCardImage, CCardTitle, CCardBody, CCardText, CButton, CCol } from '@coreui/react';
import Image from "./../assets/place.jpeg"

function TourRow({ tour }) {
  return (
    <CCol sm={6}>

    <CCard style={{ width: '20rem' , height: '20rem', padding: 10, margin: 3}}>
      <CCardImage orientation="top" src={Image} width={200} height={100}/>
      <CCardBody>
        <CCardTitle>{tour.title}</CCardTitle>
        <CCardText>
          Price : {tour.currency}
          {tour.rating}
          <div></div>
          {tour.isSpecialOffer ? <img src={checkMark} alt="True" width={50} height={50} /> : <div />}
        </CCardText>
        <CButton href="#">Book Now</CButton>
      </CCardBody>
    </CCard>
    </ CCol>

    // <tr>
    //   <td>{tour.id}</td>
    //   <td></td>
    //   <td>
    //     {tour.currency}
    //     {tour.price}
    //   </td>
    //   <td>{</td>
    // </tr>
  );
}

export default TourRow;
