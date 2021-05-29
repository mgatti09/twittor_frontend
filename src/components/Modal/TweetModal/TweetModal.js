import React, { useState } from "react";
import { Form, Modal, Button } from "react-bootstrap";
import classNames from "classnames";
import { toast } from "react-toastify";

import { Close } from "../../../utils/icons";
import { tweetApi } from "../../../api/tweet";

import "./TweetModal.scss";

export default function TweetModal(props) {
  const { show, setShow } = props;
  const [message, setMessage] = useState("");
  const maxChar = 300;

  const onSubmit = (e) => {
    e.preventDefault();

    if (tweetValid(message, maxChar))
      tweetApi(message)
        .then((response) => {
          if (response?.code >= 200 && response?.code < 300) {
            toast.success(response.message);
            setShow(false);
            window.location.reload();
          }
        })
        .catch(() =>
          toast.warning("Error al enviar el Tweet, inténtenlo mas tarde")
        );
  };
  return (
    <Modal
      className="tweet-modal"
      show={show}
      onHide={() => setShow(false)}
      centered
      size="lg"
    >
      <Modal.Header>
        <Modal.Title>
          <Close onClick={() => setShow(false)} />
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={onSubmit}>
          <Form.Control
            as="textarea"
            rows="6"
            placeholder="¿Que está pensando?"
            onChange={(e) => setMessage(e.target.value)}
          />
          <span
            className={classNames("count", { error: message.length > maxChar })}
          >
            {message.length}
          </span>
          <Button type="submit" disabled={!tweetValid(message, maxChar)}>
            Twittoar
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

const tweetValid = (message, maxChar) => {
  return message.length > 0 && message.length <= maxChar;
};
