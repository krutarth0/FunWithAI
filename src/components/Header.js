import React from "react";
import Idown from "./Icons/Idown";
import Menu from "./Menu";

export default function Header() {
  return (
    <section className="Header-bar">
      <h1>Fun with AI</h1>
      <div className="Customization">
        <p>Customization</p>
        <div className="customization-arrow">
          <Idown height={20} width={20} />
          <Menu />
        </div>
      </div>
    </section>
  );
}
