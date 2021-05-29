import React, { useEffect, useState } from "react";
import { Button, Spinner } from "react-bootstrap";

import BasicLayout from "../../layout/BasicLayout";
import ListTweets from "../../components/ListTweets/ListTweets";
import { getTweetsIFollowApi } from "../../api/tweet";

import "./Home.scss";

export default function Home(props) {
  const { setRefreshCheckLogin } = props;
  const [tweets, setTweets] = useState(null);
  const [page, setPage] = useState(1);
  const [loadingTweets, setLoadingTweets] = useState(false);

  useEffect(() => {
    getTweetsIFollowApi(page)
      .then((response) => {
        if (!tweets && response) setTweets(formatModel(response));
        else {
          if (!response) setLoadingTweets(0);
          else {
            const data = formatModel(response);
            setTweets([...tweets, ...data]);
            setLoadingTweets(false);
          }
        }
      })
      //este catch se agrego porque cuando cerraba sesion desde usuarios daba un error
      .catch(() => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const moreTweets = () => {
    setLoadingTweets(true);
    setPage(page + 1);
  };

  return (
    <BasicLayout className="home" setRefreshCheckLogin={setRefreshCheckLogin}>
      <div className="home__title">
        <h2>Inicio</h2>
      </div>
      {tweets && <ListTweets tweets={tweets} />}
      <Button onClick={moreTweets} className="load-more">
        {!loadingTweets ? (
          loadingTweets !== 0 ? (
            "Obtener mas Tweets"
          ) : (
            "No hay mas tweets"
          )
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
    </BasicLayout>
  );
}

function formatModel(tweets) {
  const tweetModel = {
    _id: "",
    userid: "",
    message: "",
    date: "",
  };

  const tweetsModel = tweets.map((tweet) => {
    return {
      _id: tweet._id,
      userid: tweet.userFollowingID,
      message: tweet.Tweet.message,
      date: tweet.Tweet.date,
    };
  });
  return tweetsModel;
}
