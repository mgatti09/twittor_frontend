import React, { useState } from "react";
import { Row, Col, Form, Button, Spinner } from "react-bootstrap";
import { values, size } from "lodash";
import { toast } from "react-toastify";
import { isValidEmail } from "../../utils/validation";
import { signUpApi } from "../../api/auth";

import "./SignUpForm.scss";

export default function SignUpForm(props) {
  const { setShowModal } = props;
  const [formData, setFormData] = useState(initialFormValue());
  const [signUpLoading, setSignUpLoading] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();

    let validCount = 0;

    //Hace un bucle por todas las keys de nuestro objeto y comprueba si tiene contenido.
    values(formData).some((value) => {
      value && validCount++;
      return null;
    });

    if (validCount !== size(formData))
      toast.warning("Completa todos los campos del formulario");
    else if (!isValidEmail(formData.email)) toast.warning("Email inválido");
    else if (formData.password !== formData.repeatPassword)
      toast.warning("Las contraseñas deben ser iguales");
    else if (size(formData.password) < 6)
      toast.warning("La contraseña debe tener al menos 6 caracteres");
    else {
      setSignUpLoading(true);
      signUpApi(formData)
        .then((response) => {
          if (response.code) toast.warning(response.message);
          else {
            toast.success("Usuario creado exitosamente");
            setShowModal(false);
            setFormData(initialFormValue());
          }
        })
        .catch(() => toast.error("Error del servidor, inténtelo mas tarde"))
        .finally(() => setSignUpLoading(false));
    }
  };

  /* Tener en cuenta que se puede invocar la función onChange a nivel de evento onChange
  del formulario porque todos los campos son Input. En caso que existiera de otro tipo
  el onchage se debe poner por cada elemento y no a nivel de formulario */
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="sign-up-form">
      <h2>Crea tu cuenta</h2>
      <Form onSubmit={onSubmit} onChange={onChange}>
        <Form.Group>
          <Row>
            <Col>
              <Form.Control
                type="text"
                placeholder="Nombres"
                name="surname"
                defaultValue={formData.surname}
                required
              />
            </Col>
            <Col>
              <Form.Control
                type="text"
                placeholder="Apellidos"
                name="lastname"
                defaultValue={formData.lastname}
                required
              />
            </Col>
          </Row>
        </Form.Group>
        <Form.Group>
          <Form.Control
            type="email"
            placeholder="Email"
            name="email"
            defaultValue={formData.email}
            required
          />
        </Form.Group>
        <Form.Group>
          <Row>
            <Col>
              <Form.Control
                type="password"
                placeholder="Contraseña"
                name="password"
                defaultValue={formData.password}
                required
              />
            </Col>
            <Col>
              <Form.Control
                type="password"
                placeholder="Repetir contraseña"
                name="repeatPassword"
                defaultValue={formData.repeatPassword}
                required
              />
            </Col>
          </Row>
        </Form.Group>
        <Button variant="primary" type="submit">
          {!signUpLoading ? "Registrarse" : <Spinner animation="border" />}
        </Button>
      </Form>
    </div>
  );
}

const initialFormValue = () => {
  return {
    surname: "",
    lastname: "",
    email: "",
    password: "",
    repeatPassword: "",
  };
};
