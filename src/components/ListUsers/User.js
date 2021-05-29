import React, { useEffect, useState } from "react";
import { Media, Image } from "react-bootstrap";
import { Link } from "react-router-dom";

import { API_HOST } from "../../utils/constant";
import { getUserApi } from "../../api/user";
import AvatarNotFound from "../../assets/png/avatar-no-found.png";

export default function User(props) {
  const { user } = props;
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    if (user)
      getUserApi(user.id).then((response) => {
        setUserInfo(response);
      });
  }, [user]);
  return (
    <Media as={Link} to={`/profile/${user.id}`} className="list-users__user">
      <Image
        width={64}
        height={64}
        roundedCircle
        className="mr-3"
        src={
          userInfo?.avatar ? `${API_HOST}/avatar?id=${user.id}` : AvatarNotFound
        }
        alt={`${user.surname} ${user.lastname}`}
      />
      <Media.Body>
        <h5>
          {user.surname} {user.lastname}
        </h5>
        <p>{userInfo?.biography}</p>
      </Media.Body>
    </Media>
  );
}
