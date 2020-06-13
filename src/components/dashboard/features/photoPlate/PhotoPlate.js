/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from "react";
import "./photoPlate.css";
import { Link } from "react-router-dom";
import Camera from "react-html5-camera-photo";
import FlashlightIcon from "@material-ui/icons/HighlightOutlined";

const PhotoPlate = () => {
  return (
    <>
      <div className="video_overlay" />
      <div className="photoPlate">
        <div className="video_overlay_topRight" />
        <div className="video_overlay_topLeft" />
        <div className="video_overlay_bottomRight" />
        <div className="video_overlay_bottomLeft" />
        <FlashlightIcon className="photoPlate_flashlight" />
        <Link to="/dashboard/profile">
          <p className="photoPlate_return"> Fechar</p>
        </Link>
        <p className="photoPlate_description">
          Posicione a câmera na frente da placa do caminhão para adicionar à sua
          carteira Bips
        </p>
        <Camera />
      </div>
    </>
  );
};

export default PhotoPlate;
