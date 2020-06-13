import React, { useState, useEffect } from "react";
import "./profile.css";
import Fade from "react-reveal/Fade";
import { useHistory, Link } from "react-router-dom";
import ArrowBackIcon from "@material-ui/icons/ArrowBackIos";
import CameraIcon from "@material-ui/icons/PhotoCameraOutlined";
import driverImage from "../../../../assets/images/driver.png";

const Profile = () => {
  const [exit, setExit] = useState(true);
  const history = useHistory();

  const onExit = () => {
    setExit(true);
    setTimeout(() => history.push(`/dashboard`), 300);
  };

  useEffect(() => {
    setExit(false);
  }, []);

  return (
    <Fade left when={!exit}>
      <div className="profile">
        <ArrowBackIcon onClick={onExit} className="profile_return" />
        <div className="profile_top">
          <div className="profile_main_image">
            <img src={driverImage} alt="profile" />
          </div>
          <div className="profile_name">Bino Silva</div>
          <div className="profile_info">
            <div className="info_phone">
              <div className="phone_label">Telefone</div>
              <div className="phone_value">44 98765 4321</div>
            </div>
            <div className="info_cnh">
              <div className="cnh_label">CNH</div>
              <div className="cnh_value">12345 67890</div>
            </div>
          </div>
        </div>
        <div className="profile_bottom">
          <Link to="/dashboard/photo">
            <div className="add_plate">
              <CameraIcon className="add_plate_icon" />
              <p className="add_plate_label">
                Adicione a placa do seu caminhão
              </p>
            </div>
          </Link>
        </div>
      </div>
    </Fade>
  );
};

export default Profile;
