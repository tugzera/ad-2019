import React, { useState } from "react";
import { Layout, Menu, Typography } from "antd";

import { TeamOutlined, HomeOutlined } from "@ant-design/icons";

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
        <Menu theme="dark" defaultSelectedKeys={["0"]} mode="inline">
          <Menu.Item key="2" onClick={() => history.push("/")}>
            <HomeOutlined style={{ fontSize: 28 }} />
            <Text style={{ fontSize: 18, color: "#ffff" }}>Home</Text>
          </Menu.Item>

          <Menu.Item key="1" onClick={() => history.push("/friends")}>
            <TeamOutlined style={{ fontSize: 28 }} />
            <Text style={{ fontSize: 18, color: "#ffff" }}>Amigo secreto</Text>
          </Menu.Item>
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

export default Navigation;
