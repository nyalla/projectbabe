import React from 'react';
import { Menu } from 'antd';
import { ClusterOutlined,TeamOutlined ,UserOutlined,SnippetsOutlined  } from '@ant-design/icons';
import {useHistory}  from 'react-router';

const SideNav = () => {
    const history = useHistory();

    
    const handleRegisterClickClick = () => {
        history.push('/register');
    }
    const handleOrganisationDetailsClick = () => {
        history.push('/organisationDetails');
    }
    const handleOrganiserClick = () => {
        history.push('/OrganiserDetails');
    }
    const handleUserClick = () => {
        history.push('/UserDetails');
    }
    const handleSchemeClick = () => {
        history.push('/SchemeDetails');
    }

  return (
      <div>
        <div style={{height: "32px", background: "rgba(255, 255, 255, 0.2)", margin: "16px"}}></div>
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['2']}>
            <Menu.Item key="1" onClick={handleRegisterClickClick}>
                    <ClusterOutlined />
                    <span> Organisation</span>
                </Menu.Item>
                <Menu.Item key="2" onClick={handleOrganisationDetailsClick}>
                    <ClusterOutlined />
                    <span> Organisation Details</span>
                </Menu.Item>
                <Menu.Item key="3" onClick={handleOrganiserClick}>
                    <TeamOutlined />
                    <span> Organisers</span>
                </Menu.Item>
                <Menu.Item key="4" onClick={handleUserClick}>
                    <UserOutlined />
                    <span> Members</span>
                </Menu.Item>  
                <Menu.Item key="5" onClick={handleSchemeClick}>
                <SnippetsOutlined />
                    <span> Schemes</span>
                </Menu.Item>       
            </Menu>
        </div>
  );
}

export default SideNav;
