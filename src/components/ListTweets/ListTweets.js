import React, { useEffect, useState } from "react";
import { Image } from "react-bootstrap";
import moment from "moment";

import AvatarNotFound from "../../assets/png/avatar-no-found.png";
import { API_HOST } from "../../utils/constant";
import { getUserApi } from "../../api/user";
import { replaceURLWithHTMLLinks } from "../../utils/functions";

import "./ListTweets.scss";

export default function ListTweets(props) {
  const { tweets } = props;

  return (
    <div className="list-tweets">
      {tweets.map((tweet, idx) => (
        <Tweet key={idx} tweet={tweet} />
      ))}
    </div>
  );
}

function Tweet(props) {
  const { tweet } = props;
  const [userInfo, setUserInfo] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState(null);

  useEffect(() => {
    if (tweet)
      getUserApi(tweet.userid).then((response) => {
        setUserInfo(response);
        setAvatarUrl(
          response?.avatar
            ? `${API_HOST}/avatar?id=${response.id}`
            : AvatarNotFound
        );
      });
  }, [tweet]);

  return (
    <div className="tweet">
      <Image className="avatar" src={avatarUrl} roundedCircle />
      <div>
        <div className="name">
          {userInfo?.surname} {userInfo?.lastname}
          <span>{moment(tweet.date).calendar()}</span>
        </div>
        <div
          dangerouslySetInnerHTML={{
            __html: replaceURLWithHTMLLinks(tweet.message),
          }}
        />
      </div>
    </div>
  );
}
