import React, { useState, useEffect } from 'react';
import "../css/ourcars.css";
import { Link } from "react-router-dom";
import axios from 'axios'

const storedUser = JSON.parse(sessionStorage.getItem('user'));
const storedId = storedUser?.userId;
const storedUserType = storedUser?.userType || "visiteur";

export function Carproduct(props) {
	const [voiture, setIdV] = useState("");
	const [client, setIdC] = useState("");
	const commander = async (idVoiture, idVendeur) => {
    const response = await axios.post(`http://localhost:3002/sales/commander?id=${idVoiture}`, { idVendeur, storedId });
 
}
	
    return (
        <div className='car-card-01'>
            <img className='car-image' src={props.Imgsrc} alt={props.Brand} />
      <div className='car-details'>
        <div className='car-brand'>{props.Brand}</div>
        <div className='car-info'>          
          <div className='car-property'>{props.model}</div>
          <div className='car-property'>{props.motorization}</div>
          <div className='car-property'>{props.couleur}</div>
        </div>
        <div className='car-price'>{props.Price}</div>
      </div>
            <div className='action-buttons'>
				{storedUserType === "client" ? (
					props.isInPanier ? (
					// If user is client and isInPanier is true, render nothing (no button)
						null
					) : (
					// If user is client and isInPanier is not set or false, render Commander button
						<button className="voir-annonce voir-annonce-button" onClick={() => commander(props.Id, props.Idv)}>
							<div className="getstarted-text">Commander</div>
						</button>
					)
				) : (
					// If user is not client, render Voir l'annonce button
					<button className="voir-annonce voir-annonce-button">
					<Link to="/Boutique">
					<div className="getstarted-text">Voir l'annonce</div>
					</Link>
					</button>
					)}
			</div>
        </div>
    )
}
