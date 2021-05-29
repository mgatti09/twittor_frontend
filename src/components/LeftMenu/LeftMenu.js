import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faUser,
  faUsers,
  faPowerOff,
} from "@fortawesome/free-solid-svg-icons";
import TweetModal from "../Modal/TweetModal/TweetModal";

import { logoutApi } from "../../api/auth";
import useAuth from "../../hooks/useAuth";
import LogoWhite from "../../assets/png/logo-white.png";

import "./LeftMenu.scss";

export default function LeftMenu(props) {
  const { setRefreshCheckLogin } = props;
  const [showModal, setShowModal] = useState(false);
  //Hook personalizado para obtener los valores del usuario logueado almacenado en el context
  const user = useAuth();

  const logout = () => {
    logoutApi();
    setRefreshCheckLogin(true);
  };
  return (
    <div className="left-menu">
      <img className="logo" src={LogoWhite} alt="logo" />

      <Link to="/">
        <FontAwesomeIcon icon={faHome} /> Inicio
      </Link>
      <Link to="/users">
        <FontAwesomeIcon icon={faUsers} /> Usuarios
      </Link>
      {/*user?._id el ? valida que si el _id no viene entonces no hace nada, para evitar que reviente */}
      <Link to={`/profile/${user?._id}`}>
        <FontAwesomeIcon icon={faUser} /> Perfil
      </Link>
      <Link to="" onClick={logout}>
        <FontAwesomeIcon icon={faPowerOff} /> Cerrar sesión
      </Link>

      <Button onClick={() => setShowModal(true)}>Twittoar</Button>
      <TweetModal show={showModal} setShow={setShowModal} />
    </div>
  );
}
