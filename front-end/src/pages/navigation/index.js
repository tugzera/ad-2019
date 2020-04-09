import React, { useState } from "react";
import { Layout, Menu, Card } from "antd";
import { UserOutlined, SmileOutlined } from "@ant-design/icons";

import "./styles.css";

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const Home = () => {
  const [collapse, setCollapse] = useState(false);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapse}
        onCollapse={() => setCollapse(!collapse)}
      >
        <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
          <Menu.Item key="1">
            <UserOutlined />
            <span>Amigos</span>
          </Menu.Item>

          <Menu.Item key="2">
            <SmileOutlined />
            <span>Jogar</span>
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
            {/* <Card
              title="Default size card"
              extra={
                <>
                  <a href="#">More</a>
                  <a href="#">More</a>
                </>
              }
              style={{ width: 300 }}
            >
              <p>Card content</p>
              <p>Card content</p>
              <p>Card content</p>
            </Card> */}
          </div>
        </Content>
        {/* <Footer style={{ textAlign: "center" }}>
          Ant Design ©2018 Created by Ant UED
        </Footer> */}
      </Layout>
    </Layout>
  );
};

export default Home;
