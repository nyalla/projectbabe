 import React, {useEffect, useState} from 'react';
 import moment from 'moment';
import {Table, Row, Col, Button, Typography} from 'antd';
import {useHistory} from 'react-router';
import axios from 'axios';
import { message } from 'antd';
import {List, Card } from 'antd';
const {Title} = Typography;


const SchemeDetails = () => {
  const history = useHistory();
  const [allData, setAllData] = useState([]);

  const error = (msg: import("history").History.PoorMansUnknown) => {
    message.error(msg);
  };

  useEffect(() => {
    axios.get(`https://chitfor.herokuapp.com/management/scheme/addedBy/1`).then(res => {
      console.log(res.data.data)
      setAllData(res.data.data);
    }).catch(err => {
      // what now?
      error("Error contacting API")
  });
  },[]);

  const columns = [
    {
      title: 'Scheme Name',
      dataIndex: 'schemaName',
      render: (text: React.ReactNode) => <a>{text}</a>
    },
    {
      title: 'Limit',
      dataIndex: 'limit'
    },
    {
      title: 'Duration',
      dataIndex: 'duration'
    },
    {
      title: 'Start Date',
      dataIndex: 'startDate'
    },
    {
      title: 'Type',
      dataIndex: 'type'
    },
    {
      title: 'Date Of Payment',
      dataIndex: 'dateOfPayment'
    },
    {
      title: 'Total Members',
      dataIndex: 'totalMembers'
    },
    {
      title: 'Amount',
      dataIndex: 'amount'
    },
     
  ];

  const data:any = [{
  }];

  allData.map((scheme: any) => {
    data.push({
      schemaName: scheme.schemaName,
     limit: scheme.limit,
     duration: scheme.duration,
     type: scheme.type,
     dateOfPayment: scheme.dateOfPayment,
     totalMembers: scheme.totalMembers,
     amount: scheme.amount,
     startDate: moment(new Date(scheme.startDate)).format('YYYY-MM-DD'),
      
   })
   return data;
 });

  const handleClick = () => {
    history.push('/SchemeForm')
  }

  return (
    <div>
        <Row gutter={[40, 0]}>
          <Col span={18}>
            <Title level={2}>
            Scheme details
            </Title>
            </Col>
          <Col span={6}>
          <Button  type="primary" shape="round"  onClick={handleClick} block>Add Scheme</Button>
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

export default SchemeDetails;
