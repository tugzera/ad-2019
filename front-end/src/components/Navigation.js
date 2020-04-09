import React, { useState } from "react";
import { Layout, Menu, Typography } from "antd";
import { FaDice, FaUserFriends } from "react-icons/fa";
import styled from "styled-components";

import history from "../services/history";

const { Header, Footer, Sider, Content } = Layout;

const { Text } = Typography;

const Navigation = ({ children }) => {
  const [collapse, setCollapse] = useState(false);
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapse}
        onCollapse={() => setCollapse(!collapse)}
      >
        <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
          <StyledMenuItem key="1" onClick={() => history.push("/friends")}>
            <div
              className="container"
              style={{
                flex: 1,
                flexDirection: "row"
              }}
            >
              <FaUserFriends size={32} style={{ paddingRight: 5 }} />
              <Text style={{ fontSize: 28, color: "#ffff", paddingVertical: 10 }}>Amigos</Text>
            </div>
          </StyledMenuItem>

          <StyledMenuItem key="2" onClick={() => history.push("/game")}>
            <div className="container">
              <FaDice size={32} />
              <Text style={{ fontSize: 28, color: "#ffff" }}>Jogar</Text>
            </div>
          </StyledMenuItem>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header
          className="site-layout-background"
          style={{ padding: 0, height: 45 }}
        />
        <Content style={{ margin: "0 16px" }}>
          <div
            className="site-layout-background"
            style={{ padding: 24, minHeight: 360 }}
          >
            {children}
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Adireto Challange ©2020 Created by Damasceno
        </Footer>
      </Layout>
    </Layout>
  );
};

const StyledMenuItem = styled(Menu.Item)`
  height: 500;
`;

export default Navigation;
