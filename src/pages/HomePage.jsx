import React from "react";

const HomePage = () => {
  return (
    <div>
      <div
        style={{
          backgroundColor: "green",
          height: "50vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ color: "white", fontSize: "4em" }}>TREENDER</div>
      </div>
      <div style={{ display: "grid", gridAutoColumns: "200px" }}>
        <div>Hello</div>
        <div>Hello</div>
        <div>Hello</div>
      </div>
    </div>
  );
};

export default HomePage;
