import React from "react";
import { Card } from "semantic-ui-react";

const HomePage = () => {
  return (
    <div>
      <div className="home-image">
        <h1 style={{ color: "white", fontSize: "6em" }}>TREENDER</h1>
      </div>

      <div className="home-about">
        <Card
          style={{ height: "85%", width: "85%" }}
          href="/products"
          header="Check out our trees!"
          description="Elliot is a sound engineer living in Nashville who enjoys playing guitar and hanging with his cat."
        />
        <Card
          style={{ height: "85%", width: "85%" }}
          href="/signup"
          header="Register Now!"
          description="vieux ca me manque de coder avec toi, chaud on se refait une petite session ?"
        />
        <Card
          style={{ height: "85%", width: "85%" }}
          href="/profile"
          header="Check your current orders and profile!"
          description="Elliot is a sound engineer living in Nashville who enjoys playing guitar and hanging with his cat."
        />
      </div>
    </div>
  );
};

export default HomePage;
