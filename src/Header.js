import { Avatar } from "@material-ui/core";
import { SearchRounded } from "@material-ui/icons";
import React from "react";
import "./Header.css";
import { useStateValue } from "./StateProvider";
//        {/* <Avatar src={user?.images[0]?.url} alt="" /> */}npm
function Header() {
  const [{ user }, dispatch] = useStateValue();

  return (
    <div className="header">
      <div className="header__left">
        <SearchRounded />
        <input placeholder="Search for Artists, Songs or genres" type="text" />
      </div>

      <div className="header__right">
        <Avatar src={user?.images[0]?.url} />
        <h4>{user?.display_name} </h4>
      </div>
    </div>
  );
  console.log(user);
}

export default Header;
