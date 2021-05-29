import React, { useEffect, useState } from "react";
import { Spinner, ButtonGroup, Button } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import queryString from "query-string";
import { isEmpty } from "lodash";
import { useDebouncedCallback } from "use-debounce";

import BasicLayout from "../../layout/BasicLayout";
import ListUsers from "../../components/ListUsers";
import { getFollowsApi } from "../../api/follow";

import "./Users.scss";

export function Users(props) {
  const { setRefreshCheckLogin, location, history } = props;
  const [users, setUsers] = useState(null);
  const params = useUsersQuery(location);
  const [type, setType] = useState(params.type || "follow");
  const [btnLoading, setBtnLoading] = useState(false);

  useEffect(() => {
    getFollowsApi(queryString.stringify(params)).then((response) => {
      // eslint-disable-next-line eqeqeq
      if (params.page == 1) {
        if (!isEmpty(response)) {
          setUsers(response);
          setBtnLoading(false);
        } else setUsers([]);
      } else {
        if (!response) setBtnLoading(0);
        else {
          setUsers([...users, ...response]);
          setBtnLoading(false);
        }
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  const onChangeType = (type) => {
    setUsers(null);
    if (type === "new") setType("new");
    else setType("follow");

    const paramsURL = { type: type, page: 1, search: "" };

    /*Actualizando la URL con history. Esto hace que "location" se actualice
    por tanto se debe disparar el useEffect para que refresque la petición a la API*/
    history.push({
      search: queryString.stringify(paramsURL),
    });
  };

  /*The debounce function delays the processing of the keyup event until the user has 
stopped typing for a predetermined amount of time*/
  const onSearch = useDebouncedCallback(
    // function
    (value) => {
      setUsers(null);
      const paramsURL = { ...params, page: 1, search: value };

      /*Actualizando la URL con history. Esto hace que "location" se actualice
        por tanto se debe disparar el useEffect para que refresque la petición a la API*/
      history.push({
        search: queryString.stringify(paramsURL),
      });
    },
    // delay in ms
    200
  );

  const moreUsers = () => {
    setBtnLoading(true);
    const newPage = parseInt(params.page) + 1;
    const paramsURL = { ...params, page: newPage };

    /*Actualizando la URL con history. Esto hace que "location" se actualice
        por tanto se debe disparar el useEffect para que refresque la petición a la API*/
    history.push({
      search: queryString.stringify(paramsURL),
    });
  };

  return (
    <BasicLayout
      className="users"
      title="Usuarios"
      setRefreshCheckLogin={setRefreshCheckLogin}
    >
      <div className="users__title">
        <h2>Usuarios</h2>
        <input
          type="text"
          placeholder="Busca un usuario..."
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>
      <ButtonGroup className="users__options">
        <Button
          className={type === "follow" && "active"}
          onClick={() => onChangeType("follow")}
        >
          Siguiendo
        </Button>
        <Button
          className={type === "new" && "active"}
          onClick={() => onChangeType("new")}
        >
          Nuevos
        </Button>
      </ButtonGroup>
      {!users ? (
        <div className="users__loading">
          <Spinner animation="border" variant="info" />
          Cargando usuarios
        </div>
      ) : (
        <>
          <ListUsers users={users} />
          {users.length > 0 && (
            <Button onClick={moreUsers} className="load-more">
              {!btnLoading ? (
                btnLoading !== 0 && "Cargar mas usuarios"
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
          )}
        </>
      )}
    </BasicLayout>
  );
}

function useUsersQuery(location) {
  const {
    page = 1,
    type = "follow",
    search,
  } = queryString.parse(location.search);

  return { page, type, search };
}

export default withRouter(Users);
