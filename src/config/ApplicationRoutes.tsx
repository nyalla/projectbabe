import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import List from "../components/pages/list";
import Form from "../components/pages/form";
import SideNav from "../components/layouts/sidebar";
import File from "../components/pages/files";
import Videos from "../components/pages/videos";
import OrganisationDetails from "../components/pages/organisationDetails";
import RegistrationForm from "../components/pages/RegistrationForm";
import OrganiserForm from "../components/pages/OrganiserForm";
import OrganiserDetails from "../components/pages/organiserDetails";
import UserForm from "../components/pages/UserForm";
import UserDetails from "../components/pages/userDetails";
import SchemeForm from "../components/pages/SchemeForm";
import SchemeDetails from "../components/pages/schemeDetails";

import { Layout,Avatar } from 'antd';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,UserOutlined
  } from '@ant-design/icons';

const { Header, Sider, Content,Footer} = Layout;


const ApplicationRoutes = () => {
  const [collapse, setCollapse] = useState(false);

  useEffect(() => {
    window.innerWidth <= 760 ? setCollapse(true) : setCollapse(false);
  }, []);

    const handleToggle = (event: any) => {
        event.preventDefault();
        collapse ? setCollapse(false) : setCollapse(true);
    }
  return (
      <Router>
        <Layout>
          <Sider trigger={null} collapsible collapsed={collapse}>
            <SideNav />
          </Sider>
          <Layout>
            <Header className="siteLayoutBackground" style={{padding: 0, background: "#001529"}}>
                      {React.createElement(collapse ? MenuUnfoldOutlined : MenuFoldOutlined, {
                          className: 'trigger',
                          onClick: handleToggle,
                          style: {color: "#fff"}
                      })}
                      {/* <Title style={{ color: 'red' }} level={3}>Chitfor</Title> */}
                      <Avatar style={{ backgroundColor: '#87d068' ,float: 'right' }} icon={<UserOutlined />} />
                      {/* <Avatar style={{ float: 'right' }}  src="./dp.png" /> */}
                      {/* <Avatar src='../dp.png' /> */}
            </Header>
              <Content style={{margin: '24px 16px', padding: 24, minHeight: "calc(100vh - 114px)", background: "#fff"}}>
                <Switch>
                    <Route path="/list" component={List} />
                    <Route path="/form" component={Form} />
                    <Route path="/files" component={File} />
                    <Route path="/videos" component={Videos} />
                    <Route path="/register" component={RegistrationForm} />
                    <Route path="/organisationDetails" component={OrganisationDetails} />
                    <Route path="/OrganiserForm" component={OrganiserForm} />
                    <Route path="/OrganiserDetails" component={OrganiserDetails} />
                    <Route path="/UserForm" component={UserForm} />
                    <Route path="/UserDetails" component={UserDetails} />
                    <Route path="/SchemeForm" component={SchemeForm} />
                    <Route path="/SchemeDetails" component={SchemeDetails} />
                    <Redirect to="/organisationDetails" from="/" />
                </Switch>
              </Content>
              <Footer style={{ textAlign: 'center' }}>Design By Highlancers Team</Footer>
          </Layout>
        </Layout>
    </Router>
  );
}

export default ApplicationRoutes;