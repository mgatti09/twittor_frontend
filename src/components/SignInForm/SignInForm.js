import React, { useState } from "react";
import { Form, Button, Spinner } from "react-bootstrap";
import { values, size } from "lodash";
import { toast } from "react-toastify";
import { isValidEmail } from "../../utils/validation";

import "./SignInForm.scss";
import { setTokenApi, singInApi } from "../../api/auth";

export default function SignInForm(props) {
  const { setRefreshCheckLogin } = props;
  const [formData, setFormData] = useState(initialFormValue());
  const [signInLoading, setSignInLoading] = useState(false);

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
    else {
      setSignInLoading(true);
      singInApi(formData)
        .then((response) => {
          if (response.code) toast.warning(response.message);
          else {
            setTokenApi(response.token);
            setFormData(initialFormValue());
            //Al setear a true va a disparar el useEffect que se encuentra en app.js
            setRefreshCheckLogin(true);
          }
        })
        .catch(() => toast.error("Error del servidor, inténtelo mas tarde"))
        .finally(() => setSignInLoading(false));
    }
  };

  /* Tener en cuenta que se puede invocar la función onChange a nivel de evento onChange
  del formulario porque todos los campos son Input. En caso que existiera de otro tipo
  el onchage se debe poner por cada elemento y no a nivel de formulario */
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="sign-in-form">
      <h2>Entrar</h2>
      <Form onSubmit={onSubmit} onChange={onChange}>
        <Form.Group>
          <Form.Control
            type="email"
            placeholder="email"
            name="email"
            defaultValue={formData.email}
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            type="password"
            placeholder="password"
            name="password"
            defaultValue={formData.password}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          {!signInLoading ? "Iniciar Sesión" : <Spinner animation="border" />}
        </Button>
      </Form>
    </div>
  );
}

const initialFormValue = () => {
  return {
    email: "",
    password: "",
  };
};
