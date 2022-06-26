import * as React from "react";
import { Link } from "react-router-dom";
import logo from "./codepath.svg";

export default function Logo() {
  return (
    <div className="logo">
      <Link to="/">
        <img src={logo} />
      </Link>
    </div>
  );
}
