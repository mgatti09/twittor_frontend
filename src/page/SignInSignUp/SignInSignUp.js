import React, { useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faUsers,
  faComment,
} from "@fortawesome/free-solid-svg-icons";
import BasicModal from "../../components/Modal/BasicModal";
import SignUpForm from "../../components/SignUpForm";
import SignInForm from "../../components/SignInForm/SignInForm";
import LogoTwittor from "../../assets/png/logo.png";
import LogoTwittorWhite from "../../assets/png/logo-white.png";

import "./SignInSignUp.scss";

export default function SignInSignUp(props) {
  const { setRefreshCheckLogin } = props;
  const [showModal, setShowModal] = useState(false);
  const [contentModal, setContentModal] = useState(null);

  const openModal = (content) => {
    setShowModal(true);
    setContentModal(content);
  };
  return (
    <>
      <Container className="signin-signup" fluid>
        <Row>
          <LeftComponent />
          <RightComponent
            openModal={openModal}
            setShowModal={setShowModal}
            setRefreshCheckLogin={setRefreshCheckLogin}
          />
        </Row>
      </Container>
      <BasicModal show={showModal} setShow={setShowModal}>
        {contentModal}
      </BasicModal>
    </>
  );
}

const LeftComponent = () => {
  return (
    <Col className="signin-signup__left">
      <img src={LogoTwittor} alt="Twittor" />
      <div>
        <h2>
          <FontAwesomeIcon icon={faSearch} />
          Sigue lo que te interesa.
        </h2>
        <h2>
          <FontAwesomeIcon icon={faUsers} />
          Conéctate con tus amigos e influencers.
        </h2>
        <h2>
          <FontAwesomeIcon icon={faComment} />
          Únete a la conversación
        </h2>
      </div>
    </Col>
  );
};

const RightComponent = (props) => {
  const { openModal, setShowModal, setRefreshCheckLogin } = props;

  return (
    <Col className="signin-signup__right">
      <div>
        <img src={LogoTwittorWhite} alt="Twittor" />
        <h2>Mira lo que está pasando en el mundo en este momento</h2>
        <h3>Únete a Twittor hoy mismo</h3>
        <Button
          variant="primary"
          onClick={() => openModal(<SignUpForm setShowModal={setShowModal} />)}
        >
          Regístrate
        </Button>
        <Button
          variant="outline-primary"
          onClick={() =>
            openModal(
              <SignInForm setRefreshCheckLogin={setRefreshCheckLogin} />
            )
          }
        >
          Iniciar Sesión
        </Button>
      </div>
    </Col>
  );
};
