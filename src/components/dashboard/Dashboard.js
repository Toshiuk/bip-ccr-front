/* eslint-disable no-unused-expressions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useEffect, useState } from "react";
import "./dashboard.css";

import { Typography } from "@material-ui/core";
import ReceiptIcon from "@material-ui/icons/ReceiptOutlined";
import { Map, Marker, TileLayer, Popup } from "react-leaflet";
import L from "leaflet";
import Draggable from "react-draggable";
import { Link } from "react-router-dom";
import Fade from "react-reveal/Fade";
import ArrowRight from "@material-ui/icons/ArrowForwardIos";
import driverImage from "../../assets/images/driver.png";
import LogoIcon from "../../assets/icons/LogoIcon";
import Star from "../../assets/icons/Star";
import api from "../../services/api";

const pointerIcon = new L.Icon({
  iconUrl: "../icons/pin.svg",
  iconRetinaUrl: "../icons/pin.svg",
  iconAnchor: [5, 55],
  popupAnchor: [10, -44],
  iconSize: [85, 71]
});

const gasIcon = new L.Icon({
  iconUrl: "../icons/gaspin.svg",
  iconRetinaUrl: "../icons/gaspin.svg",
  iconAnchor: [5, 55],
  popupAnchor: [10, -44],
  iconSize: [69, 76]
});

const ccrIcon = new L.Icon({
  iconUrl: "../icons/ccrpin.svg",
  iconRetinaUrl: "../icons/ccrpin.svg",
  iconAnchor: [5, 55],
  popupAnchor: [10, -44],
  iconSize: [69, 76]
});

const restaurantIcon = new L.Icon({
  iconUrl: "../icons/restaurantpin.svg",
  iconRetinaUrl: "../icons/restaurantpin.svg",
  iconAnchor: [5, 55],
  popupAnchor: [10, -44],
  iconSize: [69, 76]
});

const stopIcon = new L.Icon({
  iconUrl: "../icons/stoppin.svg",
  iconRetinaUrl: "../icons/stoppin.svg",
  iconAnchor: [5, 55],
  popupAnchor: [10, -44],
  iconSize: [69, 76]
});

const deg2rad = deg => {
  return deg * (Math.PI / 180);
};

const distanceBetweenPlaces = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1); // deg2rad below
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; // Distance in km
  return d;
};

const formatTime = minutes =>
  minutes <= 60 ? `${minutes} min` : `${(minutes / 60).toFixed(0)} horas`;

const Dashboard = () => {
  const [latLon, setLatLon] = useState([-23.966176, -46.794158]);
  const [places, setPlaces] = useState([]);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [category, setCategory] = useState(
    "49c071fd-a672-4f7e-82dc-2a8a12e02f72"
  );

  useEffect(() => {
    // eslint-disable-next-line no-unused-expressions
    let lat = 0;
    let long = 0;
    navigator.geolocation?.getCurrentPosition(position => {
      setLatLon([position.coords.latitude, position.coords.longitude]);
      lat = position.coords.latitude;
      long = position.coords.longitude;
    });

    api.get(`/partners`).then(res => {
      setPlaces(
        res.data
          .map(place => {
            return {
              ...place,
              distance: distanceBetweenPlaces(
                lat,
                long,
                place.latitude,
                place.longitude
              )
            };
          })
          .sort((placeA, placeB) => placeA.distance - placeB.distance)
      );
    });
  }, []);

  const onControlledDragStop = () =>
    position.y === 0
      ? setPosition({ x: 0, y: -280 })
      : setPosition({ x: 0, y: 0 });

  const placesFiltered = places.filter(place => place.CategoryId === category);

  const pinToShow = (() => {
    if (category === "18c0a067-3ffc-4142-b696-b3a82de89af4") return stopIcon;
    if (category === "49c071fd-a672-4f7e-82dc-2a8a12e02f72") return gasIcon;
    if (category === "5cc65711-99d2-462d-a499-51cea3d40602")
      return restaurantIcon;
    if (category === "61680b7b-b7f3-4cb1-a711-c407318b5859") return ccrIcon;
    return stopIcon;
  })();
  return (
    <Fade>
      <div className="general-out-box">
        <div className="dashboard_header">
          <Link to="/dashboard/profile">
            <div className="profile_image">
              <img src={driverImage} alt="profile" />
            </div>
          </Link>
          <Link to="/dashboard">
            <LogoIcon />
          </Link>
          <div className="dashboard_icon" />
        </div>
        <div className="dashboard_info">
          <Typography className="dashboard_info_valueLabel">
            Saldo disponível:
          </Typography>
          <Typography className="dashboard_info_value">
            <span className="dashboard_info_currency">R$</span> 56,00
          </Typography>
          <Link to="/dashboard/invoice">
            <div className="dashboard_invoice">
              <ReceiptIcon />
              <Typography className="dashboard_invoice_label">
                Extrato{" "}
              </Typography>
            </div>
          </Link>
        </div>
        <div className="dashboard">
          <div className="dashboard_map">
            <Map
              center={latLon}
              zoom={16}
              style={{ width: "100%", height: "400px" }}
            >
              <Marker position={latLon} icon={pointerIcon} />

              {placesFiltered.map(({ name, latitude, longitude }) => (
                <Marker position={[latitude, longitude]} icon={pinToShow}>
                  <Popup>{name}</Popup>
                </Marker>
              ))}

              <TileLayer
                attribution='&copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
            </Map>
            <div className="categories">
              <ul className="list_categories">
                <li
                  className={`category_item ${
                    category === "18c0a067-3ffc-4142-b696-b3a82de89af4"
                      ? "active"
                      : ""
                  } `}
                  onClick={() =>
                    setCategory("18c0a067-3ffc-4142-b696-b3a82de89af4")
                  }
                >
                  Parada Pernoite
                </li>
                <li
                  className={`category_item ${
                    category === "49c071fd-a672-4f7e-82dc-2a8a12e02f72"
                      ? "active"
                      : ""
                  } `}
                  onClick={() =>
                    setCategory("49c071fd-a672-4f7e-82dc-2a8a12e02f72")
                  }
                >
                  Posto de gasolina
                </li>
                <li
                  className={`category_item ${
                    category === "5cc65711-99d2-462d-a499-51cea3d40602"
                      ? "active"
                      : ""
                  } `}
                  onClick={() =>
                    setCategory("5cc65711-99d2-462d-a499-51cea3d40602")
                  }
                >
                  Restaurante
                </li>
                <li
                  className={`category_item ${
                    category === "61680b7b-b7f3-4cb1-a711-c407318b5859"
                      ? "active"
                      : ""
                  } `}
                  onClick={() =>
                    setCategory("61680b7b-b7f3-4cb1-a711-c407318b5859")
                  }
                >
                  Posto CCR
                </li>
              </ul>
            </div>
          </div>

          <Draggable
            axis="y"
            handle=".grabber"
            defaultPosition={{ x: 0, y: 0 }}
            position={position}
            grid={[50, 280]}
            bounds={{ top: -280, bottom: 0 }}
            scale={1}
            onStop={onControlledDragStop}
          >
            <div className="dashboard_places">
              <div className="grabber">
                <div className="grabber_icon" />
              </div>
              <ul className="places_list">
                {placesFiltered.map(({ id, name, rating, distance }) => (
                  <Link to={`/dashboard/place/${id}`}>
                    <li className="place_item">
                      <Typography className="place_title">{name}</Typography>
                      <div className="place_review">
                        <Star active={rating >= 1} />
                        <Star active={rating >= 2} />
                        <Star active={rating >= 3} />
                        <Star active={rating >= 4} />
                        <Star active={rating >= 5} />
                      </div>
                      <Typography className="place_distance_time">
                        {distance.toFixed(2)} km <br /> ’
                        {formatTime(distance.toFixed(0) * 1.2)}
                      </Typography>
                      <ArrowRight className="place_arrow" />
                    </li>
                  </Link>
                ))}
              </ul>
            </div>
          </Draggable>
        </div>
      </div>
    </Fade>
  );
};

export default Dashboard;
