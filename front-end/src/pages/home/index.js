import React from "react";
import { Typography } from "antd";

const { Title } = Typography;
const Home = () => {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Title>Seja bem-vindo ao App de sorteio de amigo secreto!</Title>
    </div>
  );
};

export default Home;
