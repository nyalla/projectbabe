import React, { useState } from 'react';
import moment from 'moment';
import {
  Form,
  Input,
  Tooltip,
  Checkbox,
  Button,
} from 'antd';
import { DatePicker } from 'antd';
import axios from 'axios';
import { message } from 'antd';
 
const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const RegistrationForm = () => {
  const [form] = Form.useForm();
  
  const success = (msg) => {
    message.success(msg);
  };

  const error = (msg) => {
    message.error(msg);
  };
  const onFinish = values => {
    const org = {
      orgName: values.orgName,
      legalId: values.legalId,
      estdDate:  moment(values.estDate).format('YYYY-MM-DD'),
      chairmanName: values.chairMan,
      userName: values.userName,
    };
    const stringJson = JSON.stringify(org);
    //console.log('JSON  ',stringJson);
    axios.post(`https://chitfor.herokuapp.com/management/organisation`, org, {
      headers: {
        'content-type': 'application/json'
      }
    })
    .then(res => {
      console.log(res);
      //console.log(res.data);
      if(res.data.statusCode ==200)
      success(res.data.message);
      else
      error(res.data.message);
    }).catch(err => {
      // what now?
      error("Error contacting API")
  })
  };
  
 
  return (

    <Form
      {...formItemLayout}
      form={form}
      name="register"
      onFinish={onFinish}
      scrollToFirstError
    >
       <Form.Item
        name="orgName"
        label={
          <span>
            Organisation Name&nbsp;
            <Tooltip title="Please enter your orgnasiation name">
               
            </Tooltip>
          </span>
        }
        rules={[
          {
            required: true,
            message: 'Please input your orgnasiation name!',
            whitespace: true,
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="legalId"
        label={
          <span>
            Legal ID of Organisation &nbsp;
            <Tooltip title="Please enter your Legal ID ">
               
            </Tooltip>
          </span>
        }
        rules={[
          {
            required: true,
            message: 'Please input your Legal ID!',
            whitespace: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
        
       <Form.Item  name="estDate" label="Established Date"
       rules={[
        {
          required: true,
          message: 'Please input your Date est!',
        },
      ]}
      >
          <DatePicker picker = "year"/>
        </Form.Item>

      <Form.Item
        name="chairMan"
        label={
          <span>
            Chairman name of Organisation &nbsp;
            <Tooltip title="Please enter your  Chairman name of Organisation ">
               
            </Tooltip>
          </span>
        }
        rules={[
          {
            required: true,
            message: 'Please input your  Chairman name of Organisation !',
            whitespace: true,
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="userName"
        label={
          <span>
            User name of Organisation &nbsp;
            <Tooltip title="Please enter your   User name of Organisation ">
               
            </Tooltip>
          </span>
        }
        rules={[
          {
            required: true,
            message: 'Please input your  User name of Organisation !',
            whitespace: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
  
      <Form.Item
        name="agreement"
        valuePropName="checked"
        rules={[
          {
            validator: (_, value) =>
              value ? Promise.resolve() : Promise.reject('Should accept agreement'),
          },
        ]}
        {...tailFormItemLayout}
      >
        <Checkbox>
          I have read the <a href="">agreement</a>
        </Checkbox>
      </Form.Item>
      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
          Register
        </Button>
      </Form.Item>
    </Form>
  );
};

export default RegistrationForm;
