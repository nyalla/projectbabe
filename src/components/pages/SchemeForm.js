import React, { useState } from 'react';
import moment from 'moment';
import {
  Form,
  Select,
  Input,
  InputNumber,
  Tooltip,
  Button,
} from 'antd';
import { DatePicker } from 'antd';
import axios from 'axios';
import { message } from 'antd';
import {useHistory} from 'react-router'; 
const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
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

const { Option } = Select;
const SchemeDetails = () => {

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
      schemaName: values.schemeName,
      limit: values.schemeLimit,
      duration: values.duration,
      type: values.typeOfScheme,
      totalMembers: values.totalMembers,
      dateOfPayment:values.payingDate,
      startDate:  moment(values.startDate).format('YYYY-MM-DD'), 
    };
    const stringJson = JSON.stringify(org);
    //console.log('JSON  ',stringJson);
    axios.post(`https://chitfor.herokuapp.com/management/scheme/addedBy/1`, org, {
      headers: {
        'content-type': 'application/json'
      }
    })
    .then(res => {
      console.log(res);
      //console.log(res.data);
      if(res.data.statusCode ==200){
        success(res.data.message);
        history.push('/SchemeDetails');
      }
      
      else
      error(res.data.message);
    }).catch(err => {
      // what now?
      error("Error contacting API")
  })
  };
  
  function disabledDate(current) {
    // Can not select days before today and today
    return current && current < moment().endOf('day');
  }
 
  return (

    <Form
      {...formItemLayout}
      form={form}
      name="register"
      onFinish={onFinish}
      scrollToFirstError
    >
       <Form.Item
        name="schemeName"
        label={
          <span>
            Scheme Name&nbsp;
            <Tooltip title="Please enter your Scheme name">
               
            </Tooltip>
          </span>
        }
        rules={[
          {
            required: true,
            message: 'Please input your Scheme name!',
            whitespace: true,
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="schemeLimit"
        label={
          <span>
            Scheme Limit &nbsp;
            <Tooltip title="Please enter Scheme Limit ">
               
            </Tooltip>
          </span>
        }
        rules={[
          {
            required: true,
            message: 'Please input your Scheme Limit  !',
          },
        ]}
      >
        <InputNumber min={1000} max={9999999} />
      </Form.Item>
       
      <Form.Item
        name="duration"
        label={
          <span>
            Duration (In months) &nbsp;
            <Tooltip title="Please enter Duration (In months)">
               
            </Tooltip>
          </span>
        }
        rules={[
          {
            required: true,
            message: 'Please input Duration (In months)!',
          },
        ]}
      >
        <InputNumber min={1} max={100} />
      </Form.Item>

      <Form.Item
        name="typeOfScheme"
        label="Scheme Type"
        hasFeedback
        rules={[{ required: true, message: 'Please select Scheme Type!' }]}
      >
        <Select placeholder="Please select a Scheme Type">
          <Option value="FIXED">FIXED</Option>
          <Option value="VARIABLE">VARIABLE</Option>
        </Select>
      </Form.Item>

      <Form.Item
        name="totalMembers"
        label={
          <span>
            Total Members  &nbsp;
            <Tooltip title="Please enter No. of members in Scheme">
               
            </Tooltip>
          </span>
        }
        rules={[
          {
            required: true,
            message: 'Please enter No. of members in Scheme"!', 
          },
        ]}
      >
        <InputNumber min={1} max={100} />
      </Form.Item>

      <Form.Item
        name="payingDate"
        label="Date to be paid (of month)"
        hasFeedback
        rules={[{ required: true, message: 'Date to be paid (of month)!' }]}
      >
        <Select placeholder="Please select Date to be paid (of month)">
          <Option value="1">1st of each month</Option>
          <Option value="5">5th of each month</Option>
          <Option value="10">10th of each month</Option>
          <Option value="15">15th of each month</Option>
        </Select>
      </Form.Item>

       <Form.Item  name="startDate" label="Start Date"
       rules={[
        {
          required: true,
          message: 'Please input Start Date!',
        },
      ]}
      >
          <DatePicker disabledDate={disabledDate}/>
        </Form.Item>
 
      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
          Add Scheme
        </Button>
      </Form.Item>
    </Form>
  );
};

export default SchemeDetails;
