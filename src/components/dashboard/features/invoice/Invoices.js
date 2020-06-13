/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState, useEffect } from "react";
import "./invoice.css";
import ArrowBackIcon from "@material-ui/icons/ArrowBackIos";
import { useHistory } from "react-router-dom";
import Fade from "react-reveal/Fade";
import Coin from "../../../../assets/icons/Coin";
import Sleep from "../../../../assets/icons/Sleep";
import Restaurant from "../../../../assets/icons/Restaurant";
import Pipe from "../../../../assets/icons/Pipe";

const historicList = [
  {
    title: "e-bips",
    description: "Cashback de pedágio recebido",
    date: "12/06/2020",
    value: "R$ 20,00",
    receiving: true,
    icon: <Coin />
  },
  {
    title: "Restaurante",
    description: "Pagamento aprovado",
    date: "12/06/2020",
    value: "- R$ 15,00",
    receiving: false,
    icon: <Restaurant />
  },
  {
    title: "Pernoite",
    description: "Pagamento aprovado",
    date: "11/06/2020",
    value: "- R$ 40,00",
    receiving: false,
    icon: <Sleep />
  },
  {
    title: "e-bips",
    description: "Cashback de pedágio recebido",
    date: "11/06/2020",
    value: "R$ 20,00",
    receiving: true,
    icon: <Coin />
  },
  {
    title: "e-bips",
    description: "Cashback de pedágio recebido",
    date: "10/06/2020",
    value: "R$ 20,00",
    receiving: true,
    icon: <Coin />
  },
  {
    title: "Restaurante",
    description: "Pagamento aprovado",
    date: "09/06/2020",
    value: "- R$ 14,00",
    receiving: false,
    icon: <Restaurant />
  },
  {
    title: "e-bips",
    description: "Cashback de pedágio recebido",
    date: "08/06/2020",
    value: "R$ 20,00",
    receiving: true,
    icon: <Coin />
  },
  {
    title: "e-bips",
    description: "Cashback de pedágio recebido",
    date: "06/06/2020",
    value: "R$ 20,00",
    receiving: true,
    icon: <Coin />
  },
  {
    title: "Restaurante",
    description: "Pagamento aprovado",
    date: "06/06/2020",
    value: "- R$ 15,00",
    receiving: false,
    icon: <Restaurant />
  },
  {
    title: "e-bips",
    description: "Cashback de pedágio recebido",
    date: "05/06/2020",
    value: "R$ 20,00",
    receiving: true,
    icon: <Coin />
  },
  {
    title: "e-bips",
    description: "Cashback de pedágio recebido",
    date: "05/06/2020",
    value: "R$ 20,00",
    receiving: true,
    icon: <Coin />
  }
];

const Invoice = () => {
  const [exit, setExit] = useState(true);
  const [category, setCategory] = useState(0);
  const history = useHistory();

  const onExit = () => {
    setExit(true);
    setTimeout(() => history.push(`/dashboard`), 300);
  };

  useEffect(() => {
    setExit(false);
  }, []);

  const historicFiltered = historicList.filter(
    item =>
      !category ||
      (category === 1 && item.receiving) ||
      (category === 2 && !item.receiving)
  );

  return (
    <Fade left when={!exit}>
      <div className="invoice">
        <div className="invoice_header">
          <ArrowBackIcon onClick={onExit} className="invoice_return" />
          <p>Meu Extrato</p>
        </div>
        <div className="invoice_options">
          <div
            className={`option_item ${category === 0 ? "active" : ""}`}
            onClick={() => setCategory(0)}
          >
            Tudo
          </div>
          <div
            className={`option_item ${category === 1 ? "active" : ""}`}
            onClick={() => setCategory(1)}
          >
            Entrada de crédito
          </div>
          <div
            className={`option_item ${category === 2 ? "active" : ""}`}
            onClick={() => setCategory(2)}
          >
            Saída de credito
          </div>
        </div>
        <div className="invoice_list">
          <ul>
            {historicFiltered.map((item, pos) => (
              <>
                <li className="invoice_item">
                  <div className="invoice_first_column">
                    <div className="item_icon">{item.icon}</div>
                    <div className="item_information">
                      <p className="item_title">{item.title}</p>
                      <p className="item_description">{item.description}</p>
                    </div>
                  </div>
                  <div className="item_details">
                    <p className="item_date">{item.date}</p>
                    <p
                      className={`item_value ${
                        item.receiving ? "receiving" : ""
                      }`}
                    >
                      {item.value}
                    </p>
                  </div>
                </li>
                {pos < historicFiltered.length - 1 && (
                  <li className="invoice_pipe">
                    <Pipe />
                  </li>
                )}
              </>
            ))}
          </ul>
        </div>
        <div className="invoice_bottom">
          <div className="invoice_main">
            <span className="main_label">Saldo disponível</span>
            <span className="main_value">R$ 56,00</span>
          </div>
        </div>
      </div>
    </Fade>
  );
};

export default Invoice;
