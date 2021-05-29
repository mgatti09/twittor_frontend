import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";

import ConfigModal from "../../Modal/ConfigModal";
import EditUserForm from "../EditUserForm";
import AvatarNotFound from "../../../assets/png/avatar-no-found.png";
import { API_HOST } from "../../../utils/constant";
import { checkFollowApi, followApi, unfollowApi } from "../../../api/follow";

import "./BannerAvatar.scss";

export default function BannerAvatar(props) {
  const { user, loggedUser } = props;
  const [showModal, setShowModal] = useState(false);
  const [following, setFollowing] = useState(null);
  const [reloadFollow, setReloadFollow] = useState(false);

  useEffect(() => {
    if (user)
      checkFollowApi(user?.id).then((response) => {
        const { status } = response;
        setFollowing(status);
      });
    setReloadFollow(false);
  }, [user, reloadFollow]);

  const onFollow = () => {
    followApi(user?.id)
      .then(() => {
        setReloadFollow(true);
      })
      .catch(() =>
        toast.error("Ocurrió un error al intentar seguir al usuario")
      );
  };

  const onUnfollow = () => {
    unfollowApi(user?.id)
      .then(() => {
        setReloadFollow(true);
      })
      .catch(() =>
        toast.error("Ocurrió un error al intentar dejar de seguir al usuario")
      );
  };

  //user? el ? es para evitar que no explote en caso que user sea null
  const bannerUrl = user?.banner ? `${API_HOST}/banner?id=${user.id}` : null;
  const avatarUrl = user?.avatar
    ? `${API_HOST}/avatar?id=${user.id}`
    : AvatarNotFound;

  return (
    <div
      className="banner-avatar"
      style={{ backgroundImage: `url('${bannerUrl}')` }}
    >
      <div
        className="avatar"
        style={{ backgroundImage: `url('${avatarUrl}')` }}
      />
      {user && (
        <div className="options">
          {user.id === loggedUser._id && (
            <Button onClick={() => setShowModal(true)}>Editar Perfil</Button>
          )}
          {user.id !== loggedUser._id &&
            following !== null &&
            (following ? (
              <Button onClick={onUnfollow} className="unfollow">
                <span>Siguiendo</span>
              </Button>
            ) : (
              <Button onClick={onFollow}>Seguir</Button>
            ))}
        </div>
      )}

      <ConfigModal
        show={showModal}
        setShow={setShowModal}
        title="Editar perfil"
      >
        <EditUserForm user={user} setShowModal={setShowModal} />
      </ConfigModal>
    </div>
  );
}
