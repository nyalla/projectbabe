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
import {useHistory} from 'react-router';
 
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

const OrganiserForm = () => {
  const history = useHistory();

  const [form] = Form.useForm();
  
  const success = (msg) => {
    message.success(msg);
  };

  const error = (msg) => {
    message.error(msg);
  };
  const onFinish = values => {
    const org = {
      name: values.name,
      ageInField: values.ageInField,
      phone: values.phone,
      email: values.email,
      pan: values.pan,
      address: values.address,
      dob:  moment(values.dob).format('YYYY-MM-DD'),
      doj:  moment(values.doj).format('YYYY-MM-DD'),
       
    };
    const stringJson = JSON.stringify(org);
    //console.log('JSON  ',stringJson);
    axios.post(`https://chitfor.herokuapp.com/management/organiser/orgId/1`, org, {
      headers: {
        'content-type': 'application/json'
      }
    })
    .then(res => {
      console.log(res);
      //console.log(res.data);
      if(res.data.statusCode ==200){
        success(res.data.message);
        history.push('/OrganiserDetails');
      }
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
        name="name"
        label={
          <span>
            Organiser Name&nbsp;
            <Tooltip title="Please enter your Organiser name">
               
            </Tooltip>
          </span>
        }
        rules={[
          {
            required: true,
            message: 'Please input your Organiser name!',
            whitespace: true,
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="ageInField"
        label={
          <span>
            Experience in the field &nbsp;
            <Tooltip title="Please enter Experience in the field">
               
            </Tooltip>
          </span>
        }
        rules={[
          {
            required: true,
            message: 'Please enter Experience in the field!',
            whitespace: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="phone"
        label={
          <span>
            phone &nbsp;
            <Tooltip title="Please enter phone in the field">
               
            </Tooltip>
          </span>
        }
        rules={[
          {
            required: true,
            message: 'Please enter phone in the field!',
            whitespace: true,
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="email"
        label={
          <span>
            Email &nbsp;
            <Tooltip title="Please enter email in the field">
               
            </Tooltip>
          </span>
        }
        rules={[
          {
            required: true,
            message: 'Please enter email in the field!',
            whitespace: true,
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="pan"
        label={
          <span>
            PAN &nbsp;
            <Tooltip title="Please enter pan in the field">
               
            </Tooltip>
          </span>
        }
        rules={[
          {
            required: true,
            message: 'Please enter pan in the field!',
            whitespace: true,
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="address"
        label={
          <span>
            Address &nbsp;
            <Tooltip title="Please enter address in the field">
               
            </Tooltip>
          </span>
        }
        rules={[
          {
            required: true,
            message: 'Please enter address in the field!',
            whitespace: true,
          },
        ]}
      >
        <Input />
      </Form.Item>

       <Form.Item  name="dob" label="DOB"
       rules={[
        {
          required: true,
          message: 'Please input your Date of Birth!',
        },
      ]}
      >
          <DatePicker />
        </Form.Item>

        <Form.Item  name="doj" label="DOJ"
       rules={[
        {
          required: true,
          message: 'Please input your Date of Joining!',
        },
      ]}
      >
          <DatePicker/>
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

export default OrganiserForm;
