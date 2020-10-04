import React, { useState, useEffect } from 'react';
import { Row, Col } from 'antd';
import { Result, Button } from 'antd';
import ApplicationRoutes from "../../config/ApplicationRoutes";
import { Layout, Avatar } from 'antd';
const { Header, Sider, Content, Footer } = Layout;


const Land = () => {

  return (
  
        
    <Row  justify="center" align="middle">
    <Col span={24}> 
    <Result
           
           title="Please introduce yourself to the Chitfor"
           subTitle="One stop place for all your financial management.....!"
           extra={[
             <Button type="primary" >
               Register
       </Button>,
             <Button key="login">Login</Button>,
           ]}
         />
    </Col>
  </Row>

       
      
    
  );
};

export default Land;