import React, { useEffect, useState } from "react";
import { Button, Spinner } from "react-bootstrap";
import { withRouter } from "react-router";
import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";

import BasicLayout from "../../layout/BasicLayout";
import BannerAvatar from "../../components/User/BannerAvatar/BannerAvatar";
import InfoUser from "../../components/InfoUser/InfoUser";
import ListTweets from "../../components/ListTweets";
import { getUserApi } from "../../api/user";
import { getTweetsApi } from "../../api/tweet";

import "./User.scss";

function User(props) {
  const { setRefreshCheckLogin } = props;
  const {
    match: {
      params: { id: userId },
    },
  } = props;
  const loggedUser = useAuth();
  const [user, setUser] = useState(null);
  const [tweets, setTweets] = useState(null);
  const [page, setPage] = useState(1);
  const [loadingTweets, setLoadingTweets] = useState(false);

  useEffect(() => {
    getUserApi(userId)
      .then((response) => {
        if (!response) toast.error("El usuario solicitado no existe");
        setUser(response);
      })
      .catch(() => {
        toast.error("El usuario solicitado no existe");
      });
  }, [userId]);

  useEffect(() => {
    if (userId)
      getTweetsApi(userId, 1)
        .then((response) => {
          setTweets(response);
        })
        .catch(() => setTweets([]));
  }, [userId]);

  const moreTweets = () => {
    const pageTemp = page + 1;
    setLoadingTweets(true);

    getTweetsApi(userId, pageTemp).then((response) => {
      if (!response) setLoadingTweets(0);
      else {
        setTweets([...tweets, ...response]);
        setPage(pageTemp);
        setLoadingTweets(false);
      }
    });
  };

  return (
    <BasicLayout className="user" setRefreshCheckLogin={setRefreshCheckLogin}>
      <div className="user__title">
        <h2>
          {user ? `${user.surname} ${user.lastname}` : "El usuario no existe"}
        </h2>
      </div>
      <BannerAvatar user={user} loggedUser={loggedUser} />
      <InfoUser user={user} />
      <div className="user__tweets">
        <h3>Tweets</h3>
        {tweets && <ListTweets tweets={tweets} />}
        <Button onClick={moreTweets}>
          {!loadingTweets ? (
            loadingTweets !== 0 && "Obtener mas Tweets"
          ) : (
            <Spinner
              as="span"
              animation="grow"
              size="sm"
              role="status"
              aria-hidden="true"
            />
          )}
        </Button>
      </div>
    </BasicLayout>
  );
}

//Con withRouter obtengo todas las propiedades de Router, entre esos los params
export default withRouter(User);
