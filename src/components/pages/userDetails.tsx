 import React, {useEffect, useState} from 'react';
 import moment from 'moment';
import {Table, Row, Col, Button, Typography} from 'antd';
import {useHistory} from 'react-router';
import axios from 'axios';
import { message } from 'antd';
import {List, Card } from 'antd';
const {Title} = Typography;


const UserDetails = () => {
  const history = useHistory();
  const [allData, setAllData] = useState([]);

  const error = (msg: import("history").History.PoorMansUnknown) => {
    message.error(msg);
  };

  useEffect(() => {
    axios.get(`https://chitfor.herokuapp.com/management/member/addedBy/1`).then(res => {
      console.log(res.data.data)
      setAllData(res.data.data);
    }).catch(err => {
      // what now?
      error("Error contacting API")
  });
  },[]);

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      render: (text: React.ReactNode) => <a>{text}</a>
    },
    {
      title: 'Phone',
      dataIndex: 'phone'
    },
    {
      title: 'Email',
      dataIndex: 'email'
    },
    {
      title: 'PAN',
      dataIndex: 'pan'
    },
    {
      title: 'Address',
      dataIndex: 'address'
    },
    {
      title: 'DOB',
      dataIndex: 'dob'
    },
     
  ];

  const data:any = [{
  }];

  allData.map((member: any) => {
    data.push({
     key: member.memberId,
     name: member.name,
     phone: member.phone,
     email: member.email,
     pan: member.pan,
     address: member.address,
     dob: moment(new Date(member.dob)).format('YYYY-MM-DD'),
      
   })
   return data;
 });


  const handleClick = () => {
    history.push('/UserForm')
  }

  return (
    <div>
        <Row gutter={[40, 0]}>
          <Col span={18}>
            <Title level={2}>
            Member details
            </Title>
            </Col>
          <Col span={6}>
          <Button  type="primary" shape="round"  onClick={handleClick} block>Add Member</Button>
          </Col>
        </Row>
        <Row gutter={[40, 0]}>
        <Col span={24}>
        <Table columns={columns} dataSource={data} pagination={false} />
        {/* <List
    grid={{
      gutter: 16,
      xs: 1,
      sm: 2,
      md: 4,
      lg: 4,
      xl: 6,
      xxl: 3,
    }}
    dataSource={data}
    renderItem={item => (
      <List.Item>
        <Card title={item.name}>Card content</Card>
      </List.Item>
    )}
  /> */}
        </Col>
        </Row>
    </div>
  );
}

export default UserDetails;
