import React from 'react';
import { Menu } from 'antd';
import {SnippetsOutlined  } from '@ant-design/icons';
import {useHistory}  from 'react-router';

const SideNav = () => {
    const history = useHistory();
    const handleSchemeClick = () => {
        history.push('/SchemeForm');
    }

  return (
      <div>
        <div style={{height: "32px", background: "rgba(255, 255, 255, 0.2)", margin: "16px"}}></div>
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['5']}> 
                <Menu.Item key="5" onClick={handleSchemeClick}>
                <SnippetsOutlined />
                    <span> Project Build</span>
                </Menu.Item>       
            </Menu>
        </div>
  );
}

export default SideNav;
