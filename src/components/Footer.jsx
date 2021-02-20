import React from "react";
import { Card } from "semantic-ui-react";

function Footer() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "50% 50%",
        height: "5%",
        placeItems: "center",
      }}
    >
      <Card
        style={{ height: "70%" }}
        href="#card-example-link-card"
        header="Maximilian Gruber"
        meta="Full Stack Web Developer"
      />
      <Card
        style={{ height: "70%" }}
        href="#card-example-link-card"
        header="Timothée Nicole"
        meta="Full Stack Web Developer"
      />
    </div>
  );
}

export default Footer;
