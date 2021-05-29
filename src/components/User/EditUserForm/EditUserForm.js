import React, { useCallback, useState } from "react";
import { Form, Button, Row, Col, Spinner } from "react-bootstrap";
import DatePicker from "react-datepicker";
import es from "date-fns/locale/es";
import { useDropzone } from "react-dropzone";
import { toast } from "react-toastify";

import { API_HOST } from "../../../utils/constant";
import { Camera } from "../../../utils/icons";
import {
  uploadBannerApi,
  uploadAvatarApi,
  updateProfileApi,
} from "../../../api/user";

import "./EditUserForm.scss";

export default function EditUserForm(props) {
  const { user, setShowModal } = props;
  const [formData, setFormData] = useState(initialValue(user));
  const [bannerUrl, setBannerUrl] = useState(
    user?.banner ? `${API_HOST}/banner?id=${user.id}` : null
  );
  const [bannerFile, setBannerFile] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState(
    user?.avatar ? `${API_HOST}/avatar?id=${user.id}` : null
  );
  const [avatarFile, setAvatarFile] = useState(null);
  const [loading, setLoading] = useState(false);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onDropBanner = useCallback((acceptedFile) => {
    const file = acceptedFile[0];
    //URL.createObjectURL: me crea el Blob de la imagen
    setBannerUrl(URL.createObjectURL(file));
    setBannerFile(file);
  });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onDropAvatar = useCallback((acceptedFile) => {
    const file = acceptedFile[0];
    //URL.createObjectURL: me crea el Blob de la imagen
    setAvatarUrl(URL.createObjectURL(file));
    setAvatarFile(file);
  });

  //Recibe un objeto con la configuración del Hook useDropZone
  const {
    getRootProps: getRootPropsBanner,
    getInputProps: getInputPropsBanner,
  } = useDropzone({
    accept: "image/jpeg, image/png",
    noKeyboard: true,
    multiple: false, //para que reciba una sola imagen
    onDrop: onDropBanner, //La función que definimos anteriomente onDropBanner
  });

  //Recibe un objeto con la configuración del Hook useDropZone
  const {
    getRootProps: getRootPropsAvatar,
    getInputProps: getInputPropsAvatar,
  } = useDropzone({
    accept: "image/jpeg, image/png",
    noKeyboard: true,
    multiple: false, //para que reciba una sola imagen
    onDrop: onDropAvatar, //La función que definimos anteriomente onDropAvatar
  });

  /*La petición debe ser asíncrona porque se debe esperar que primero terminen
  las peticiones de cargar imagenes y datos antes de refrescar la página*/
  const onSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    if (bannerFile)
      await uploadBannerApi(bannerFile).catch(() =>
        toast.error("Ocurrió un error al subir el nuevo banner")
      );
    if (avatarFile)
      await uploadAvatarApi(avatarFile).catch(() =>
        toast.error("Ocurrió un error al subir el nuevo avatar")
      );

    await updateProfileApi(formData)
      .then(() => setShowModal(false))
      .catch(() => toast.error("Error actualizando los datos"));

    setLoading(false);
    //window.location.reload en este caso si recargamos la pagina completa por las imagenes
    window.location.reload();
  };

  const onChange = (e) => {
    /* Recordar que este método genérico solo sirve para los input text */
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  return (
    <div className="edit-user-form">
      <div
        className="banner"
        style={{ backgroundImage: `url('${bannerUrl}')` }}
        {...getRootPropsBanner()}
      >
        <input {...getInputPropsBanner()} />
        <Camera />
      </div>
      <div
        className="avatar"
        style={{ backgroundImage: `url('${avatarUrl}')` }}
        {...getRootPropsAvatar()}
      >
        <input {...getInputPropsAvatar()} />
        <Camera />
      </div>
      <Form onSubmit={onSubmit}>
        <Form.Group>
          <Row>
            <Col>
              <Form.Control
                type="text"
                placeholder="Nombre"
                name="surname"
                defaultValue={formData.surname}
                onChange={onChange}
              />
            </Col>
            <Col>
              <Form.Control
                type="text"
                placeholder="Apellidos"
                name="lastname"
                defaultValue={formData.lastname}
                onChange={onChange}
              />
            </Col>
          </Row>
        </Form.Group>
        <Form.Group>
          <Form.Control
            as="textarea"
            row="3"
            placeholder="agrega tu biografía"
            type="text"
            name="biography"
            defaultValue={formData.biography}
            onChange={onChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            type="text"
            placeholder="Sitio web"
            name="website"
            defaultValue={formData.website}
            onChange={onChange}
          />
        </Form.Group>
        <Form.Group>
          <DatePicker
            placeholder="Fecha de nacimiento"
            locale={es}
            selected={new Date(formData.birthdate)}
            onChange={(date) => setFormData({ ...formData, birthdate: date })}
          />
        </Form.Group>
        <Button className="btn-submit" variant="primary" type="submit">
          {loading && <Spinner animation="border" size="sm" />}
          Actualizar
        </Button>
      </Form>
    </div>
  );
}

const initialValue = (user) => {
  return {
    surname: user.surname || "",
    lastname: user.lastname || "",
    biography: user.biography || "",
    location: user.location || "",
    website: user.website || "",
    birthdate: user.birthdate || "",
  };
};
