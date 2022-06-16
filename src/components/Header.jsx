import React from "react";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <header className="site-header">
      <div className="site-identity">
        <h1>
          <Link to="/">Smart-Meet</Link>
        </h1>
      </div>
    </header>
  );
};
