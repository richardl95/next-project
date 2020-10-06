import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { Breadcrumb, Layout, Menu } from 'antd'
import Link from 'next/link'
import React, { useState } from 'react'
const { Header, Content, Footer, Sider } = Layout
const { SubMenu } = Menu
interface Props {}

const AdminLayout: React.FC = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false)
  const onCollapse = (collapsed) => {
    setCollapsed(collapsed)
  }
  const menuOnClick = () => {}
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
        }}
        collapsible
        collapsed={collapsed}
        onCollapse={onCollapse}>
        <div className="logo" />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
          <Menu.Item key="1" icon={<PieChartOutlined />}>
            <Link href="/admin">Dashboard</Link>
          </Menu.Item>

          <Menu.Item key="2" icon={<DesktopOutlined />}>
            <Link href="/admin/categories">Category</Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<DesktopOutlined />}>
            Option 2
          </Menu.Item>
          <Menu.Item key="4" icon={<DesktopOutlined />}>
            Option 2
          </Menu.Item>
          <Menu.Item key="5" icon={<DesktopOutlined />}>
            Option 2
          </Menu.Item>
          <Menu.Item key="6" icon={<DesktopOutlined />}>
            Option 2
          </Menu.Item>
          <Menu.Item key="7" icon={<DesktopOutlined />}>
            Option 2
          </Menu.Item>
          <Menu.Item key="8" icon={<DesktopOutlined />}>
            Option 2
          </Menu.Item>
          <Menu.Item key="9" icon={<DesktopOutlined />}>
            Option 2
          </Menu.Item>
          <Menu.Item key="10" icon={<DesktopOutlined />}>
            Option 2
          </Menu.Item>
          <Menu.Item key="11" icon={<DesktopOutlined />}>
            Option 2
          </Menu.Item>
          <SubMenu key="sub1" icon={<UserOutlined />} title="User">
            <Menu.Item key="3">Tom</Menu.Item>
            <Menu.Item key="4">Bill</Menu.Item>
            <Menu.Item key="5">Alex</Menu.Item>
          </SubMenu>
          <SubMenu key="sub2" icon={<TeamOutlined />} title="Team">
            <Menu.Item key="6">Team 1</Menu.Item>
            <Menu.Item key="8">Team 2</Menu.Item>
          </SubMenu>
          <Menu.Item key="9" icon={<FileOutlined />} />
        </Menu>
      </Sider>
      <Layout
        className="site-layout"
        style={{
          marginLeft: collapsed ? 80 : 200,
          transition: 'all ease-out 0.3s',
        }}>
        <Header
          className="site-layout-background"
          style={{ padding: 0 }}
        />
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb>
          <div
            className="site-layout-background"
            style={{ padding: 24, minHeight: 360 }}>
            {children}
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  )
}

export default AdminLayout
