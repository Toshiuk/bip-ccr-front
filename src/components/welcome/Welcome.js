import React, { useEffect } from "react";

import "./welcome.css";
import { useHistory } from "react-router-dom";
import LogoIcon from "../../assets/icons/LogoIcon";

const Welcome = () => {
  const history = useHistory();

  useEffect(() => {
    setTimeout(() => {
      history.push(`/login`);
    }, 4000);
  }, []);

  return (
    <div className="welcome">
      <div className="logo">
        <LogoIcon />
      </div>
    </div>
  );
};

export default Welcome;
