import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import LeftMenu from "../../components/LeftMenu/LeftMenu";

import "./BasicLayout.scss";

export default function BasicLayout(props) {
  //children son las etiquetas jsx que se encuentran dentro de <BasicLayout> </BasicLayout>
  //Prop className tendra el nombre de la clase scss que se envía desde la página a renderizar
  const { children, className, setRefreshCheckLogin } = props;
  return (
    <Container className={`basic-layout ${className}`}>
      <Row>
        <Col xs={3} className="basic-layout__menu">
          <LeftMenu setRefreshCheckLogin={setRefreshCheckLogin} />
        </Col>
        <Col xs={9} className="basic-layout__content">
          {children}
        </Col>
      </Row>
    </Container>
  );
}
