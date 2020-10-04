 import React, {useEffect, useState} from 'react';
import {Table, Row, Col, Button, Typography} from 'antd';
import {useHistory} from 'react-router';
import axios from 'axios';
import { message } from 'antd';
import moment from 'moment';

const {Title} = Typography;


const OrganiserDetails = () => {
  const history = useHistory();
  const [allData, setAllData] = useState([]);

  const error = (msg: import("history").History.PoorMansUnknown) => {
    message.error(msg);
  };

  useEffect(() => {
    axios.get(`https://chitfor.herokuapp.com/management/organiser/orgId/1`).then(res => {
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
       render: (text: React.ReactNode) => <a>{text}</a>,
    },
    {
      title: 'Experience in Field',
      dataIndex: 'ageInField'
    },
    {
      title: 'phone',
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
    {
      title: 'Joined On',
      dataIndex: 'doj'
    },
  ];

  const data = [{
  }];

  allData.map((organiser: any) => {
    data.push({
     key: organiser.organiserId,
     name: organiser.name,
     orgName: organiser.orgName,
     ageInField: organiser.ageInField,
     phone: organiser.phone,
     email: organiser.email,
     pan: organiser.pan,
     address: organiser.address,
     dob:  moment(new Date(organiser.dob)).format('YYYY-MM-DD'), 
     doj: moment(new Date(organiser.doj)).format('YYYY-MM-DD'), 
 
   })
   return data;
 });

  const handleClick = () => {
    history.push('/OrganiserForm')
  }

  return (
    <div>
        <Row gutter={[40, 0]}>
          <Col span={18}>
            <Title level={2}>
            Organiser  details
            </Title>
            </Col>
          <Col span={6}>
          <Button  type="primary" shape="round"   onClick={handleClick} block>Add Organiser</Button>
          </Col>
        </Row>
        <Row gutter={[40, 0]}>
        <Col span={24}>
        <Table columns={columns} dataSource={data} pagination={false} />
        </Col>
        </Row>
    </div>
  );
}

export default OrganiserDetails;
