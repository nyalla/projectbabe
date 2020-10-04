 import React, {useEffect, useState} from 'react';
import {Table, Row, Col, Button, Typography} from 'antd';
import {useHistory} from 'react-router';
import axios from 'axios';
import { message } from 'antd';

const {Title} = Typography;


const OrganisationDetails = () => {
  const history = useHistory();
  const [allData, setAllData] = useState([]);

  const error = (msg: import("history").History.PoorMansUnknown) => {
    message.error(msg);
  };

  useEffect(() => {
    axios.get(`https://chitfor.herokuapp.com/management/organisation/organisationId/1`).then(res => {
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
      dataIndex: 'orgName'
    },
    {
      title: 'Legal ID',
      dataIndex: 'legalId'
    },
    {
      title: 'Establishsed Year',
      dataIndex: 'estdDate'
    },
    {
      title: 'Chairman Name',
      dataIndex: 'chairmanName'
    },
    {
      title: 'Super Username',
      dataIndex: 'userName'
    },
  ];

  const data = [{
  }];

  allData.map((organisation: any) => {
    data.push({
     key: organisation.orgId,
     orgName: organisation.orgName,
     legalId: organisation.legalId,
     estdDate: new Date(organisation.estdDate).getFullYear(),
     chairmanName: organisation.chairmanName,
     userName: organisation.userName,
   })
   return data;
 });

  const handleClick = () => {
    history.push('/form')
  }

  return (
    <div>
        <Row gutter={[40, 0]}>
          <Col span={18}>
            <Title level={2}>
            Organisation details
            </Title>
            </Col>
          <Col span={6}>
          {/* <Button onClick={handleClick} block>Add User</Button> */}
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

export default OrganisationDetails;
