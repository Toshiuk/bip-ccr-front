/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState, useEffect } from "react";
import "./place.css";
import { Button, Typography, TextField } from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBackIos";
import ShareIcon from "@material-ui/icons/Share";
import { useHistory } from "react-router-dom";
import Fade from "react-reveal/Fade";
import MapIcon from "@material-ui/icons/MapOutlined";
import Star from "../../../../assets/icons/Star";
import Bath from "../../../../assets/icons/Bath";
import Cutlery from "../../../../assets/icons/Cutlery";
import Hammock from "../../../../assets/icons/Hammock";
import Kitchen from "../../../../assets/icons/Kitchen";
import Warmer from "../../../../assets/icons/Warmer";
import TvScreen from "../../../../assets/icons/TvScreen";
import api from "../../../../services/api";
import driverImage from "../../../../assets/images/driver.png";

const Place = ({ match }) => {
  const [exit, setExit] = useState(true);
  const [place, setPlace] = useState({});
  const [open, setOpen] = useState(0);
  const [rate, setRate] = useState(0);

  const history = useHistory();

  const onExit = () => {
    setExit(true);
    setTimeout(() => history.push(`/dashboard`), 300);
  };

  useEffect(() => {
    setExit(false);
    api.get(`/partners/${match.params.id}`).then(res => {
      setPlace(res.data);
    });
  }, []);

  return (
    <>
      <Fade left when={!exit}>
        <div className="place">
          <div
            className="place_header"
            style={{
              backgroundImage: `url(${place.image ||
                "../../../../assets/images/place.png"})`,
              backgroundSize: "0px"
            }}
          >
            <ArrowBackIcon onClick={onExit} className="place_return" />
            <div className="place_options">
              <ShareIcon className="place_share" />
            </div>
          </div>
          <div className="place_titlereview">
            <div className="place_title">{place.name}</div>
            <div className="place_review_general">
              <Star active={place.rating >= 1} />
              <Star active={place.rating >= 2} />
              <Star active={place.rating >= 3} />
              <Star active={place.rating >= 4} />
              <Star active={place.rating >= 5} />
            </div>
          </div>
          <Typography className="place_address">{place.address}</Typography>
          <div className="place_maptime">
            <p className="place_map">
              {" "}
              <MapIcon className="place_map_icon" /> Ver no mapa{" "}
            </p>
          </div>
          <div className="place_features">
            <div className="feature_item">
              {" "}
              <Bath /> <span className="feature_item_label">10 chuveiros</span>
            </div>
            <div className="feature_item">
              {" "}
              <Hammock /> <span className="feature_item_label">10 redes</span>
            </div>
            <div className="feature_item">
              {" "}
              <Kitchen /> <span className="feature_item_label">cozinha</span>
            </div>
            <div className="feature_item">
              {" "}
              <Warmer />{" "}
              <span className="feature_item_label">3 aquecedores</span>
            </div>
            <div className="feature_item">
              {" "}
              <TvScreen />{" "}
              <span className="feature_item_label">Telão de TV</span>
            </div>
            <div className="feature_item">
              {" "}
              <Cutlery />{" "}
              <span className="feature_item_label">Não tem utensílios</span>
            </div>
          </div>
          <div className="place_description">
            <div className="description_title"> Descrição</div>
            <div className="description_text">{place.description}</div>
          </div>
          <div className="place_reviews">
            <div className="review_general">
              <div className="review_label">Avaliações</div>
              <div className="review_value">
                {(place.rating || 0).toFixed(2)}{" "}
                <Star active={place.rating >= 1} />
                <Star active={place.rating >= 2} />
                <Star active={place.rating >= 3} />
                <Star active={place.rating >= 4} />
                <Star active={place.rating >= 5} />
              </div>
              <div className="review_subtext">
                (04) | 98% dos clientes recomendam esse local
              </div>
            </div>
            <div className="review_button">
              {" "}
              <Button onClick={() => setOpen(1)}>AVALIAR</Button>
            </div>
          </div>
          <div className="place_review_list">
            <ul className="review_list">
              {Array(2)
                .fill(1)
                .map(() => (
                  <li className="review_item">
                    <p className="review_date">07/06/2020</p>
                    <div className="review_header">
                      <p className="review_author">Jaime Rodrigues</p>
                      <div className="review_stars">
                        <Star active />
                        <Star active />
                        <Star active />
                        <Star />
                        <Star />
                      </div>
                    </div>
                    <p className="review_description">
                      O segurança no local passa muito tranquilidade e podemos
                      descansar antes de continuar a jornada.{" "}
                    </p>
                  </li>
                ))}
            </ul>
          </div>
          <div className="place_bottom">
            <div className="place_infoprice">
              <p className="info_price_label">Diária/Pernoite</p>
              <p className="info_price_value">R$ 40,00</p>
            </div>
            <Button className="place_infoprice_button">
              Reservar pelo WhatsApp
            </Button>
          </div>
        </div>
      </Fade>
      <Fade top when={open === 1}>
        <div className={`place_overlay ${open !== 1 ? "hidden" : ""}`}>
          <div className="place_form">
            <span onClick={() => setOpen(0)} className="close_overlay">
              Fechar
            </span>
            <div className="form_review_title">
              Que nota você dá para Boleia Refugio?
            </div>{" "}
            <div className="form_review_subtitle">
              De 1 a 5, o quanto você indicaria esse local para um amigo
              caminhoneiro?
            </div>
            <ul className="list_form_star">
              <li className="star_item" onClick={() => setRate(1)}>
                <span>1</span> <Star active={rate >= 1} />
              </li>
              <li className="star_item" onClick={() => setRate(2)}>
                <span>2</span> <Star active={rate >= 2} />
              </li>
              <li className="star_item" onClick={() => setRate(3)}>
                <span>3</span> <Star active={rate >= 3} />
              </li>
              <li className="star_item" onClick={() => setRate(4)}>
                <span>4</span> <Star active={rate >= 4} />
              </li>
              <li className="star_item" onClick={() => setRate(5)}>
                <span>5</span> <Star active={rate >= 5} />
              </li>
            </ul>
            <div className="review_form_label">
              <span>Não indico</span>
              <span>Indico com certeza</span>
            </div>
            <div className="text_box">
              <div className="text_box_profile">
                <img src={driverImage} alt="profile" />
                <span className="profile_name">Bino Silva</span>
              </div>
              <TextField
                placeholder="Conte como foi sua experiência..."
                fullWidth
              />
            </div>
            <Button onClick={() => setOpen(0)} className="review_form_button">
              Avaliar
            </Button>
          </div>
        </div>
      </Fade>
    </>
  );
};

export default Place;
