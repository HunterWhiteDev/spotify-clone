import React, { useEffect, useState } from "react";

import "./App.css";
import Login from "./Login";
import { getTokenFromResponse } from "./spotify";
import { useStateValue } from "./StateProvider";
import Player from "./Player";
import SpotifyWebApi from "spotify-web-api-js";
const spotify = new SpotifyWebApi();

function App() {
  // const [token, setToken] = useState();
  const [{ user, token, playlists }, dispatch] = useStateValue();
  const [state] = useStateValue();
  useEffect(() => {
    const hash = getTokenFromResponse();
    console.log("I HAVE HAVE TOEKN >>>>>>>>>>>", token);
    window.location.hash = "";
    const _token = hash.access_token;

    if (_token) {
      dispatch({
        type: "SET_TOKEN",
        token: _token,
      });

      // setToken(_token);
      spotify.setAccessToken(_token);

      spotify.getMe().then((user) => {
        dispatch({
          type: "SET_USER",
          user: user,
          token: _token,
        });
      });

      spotify.getUserPlaylists().then((playlists) => {
        console.log(playlists);
        dispatch({
          type: "SET_PLAYLISTS",
          playlists: playlists,
        });
      });
      spotify.getPlaylist("37i9dQZEVXcJZyENOWUFo7").then((response) =>
        dispatch({
          type: "SET_DISCOVER_WEEKLY",
          discover_weekly: response,
        })
      );
    }
    console.log(state);
  }, []);

  console.log("user +++++ >>>>>. ", user);
  console.log("I HAVE TOKEN +++++ >>>>>>>>>>  ", token);
  console.log("Playlists +++++ >>>>> " + JSON.stringify(playlists));

  return (
    <div className="App">
      {!token && <Login />}
      {token && <Player spotify={spotify} />}
    </div>
  );
}

export default App;
