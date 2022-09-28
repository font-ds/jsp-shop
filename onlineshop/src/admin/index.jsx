import React from 'react'

import { Layout, Menu, Breadcrumb } from 'antd';
import { Route, Switch, Link } from 'react-router-dom'
import './index.css'
import ProductManage from './productManage/index'
import UserManage from './userManage/index'
import Order from './order/index'
import Type from './typeManage/index'
import { useHistory } from 'react-router-dom'

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

export default function Amdin() {

    React.useEffect(()=>{
        if(!localStorage.getItem('username')||localStorage.getItem('username')!='admin'){
            history.push('/login')
        }
    },[])

    const history=useHistory()

    const logOut=()=>{
        if(localStorage.getItem('username')){
            localStorage.removeItem('username')
        }
        history.push('/login')

    }
    return (
        <Layout>
            <Header style={{color:'white',display:'flex',justifyContent:'space-between'}}>
                <div className="logo">
                    <h1 className='admin-logo'>网上购物平台管理后台</h1>
                </div>
                <div>
                <span>欢迎管理员</span>
                <span style={{marginLeft:'18px'}} onClick={logOut}>注销</span>
                </div>
            </Header>
            <Layout>
                <Sider width={200} className="site-layout-background">
                    <Menu
                        mode="inline"
                        defaultSelectedKeys={['1']}
                        defaultOpenKeys={['sub1']}
                        style={{ height: '100%', borderRight: 0 }}
                    >
                        <Menu.Item key="userManage"><Link to='/admin/usermanage'>用户管理</Link></Menu.Item>
                        <Menu.Item key="productManage"><Link to='/admin/productmanage'>商品管理</Link> </Menu.Item>
                        <Menu.Item key="order"><Link to='/admin/order'>订单管理</Link> </Menu.Item>
                        <Menu.Item key="type"><Link to='/admin/type'>类别管理</Link> </Menu.Item>


                    </Menu>
                </Sider>
                <Layout style={{ padding: '0 24px 24px' }}>

                    <Content
                        className="site-layout-background"

                    >
                        <Switch>
                            <Route path='/admin/usermanage' key='usermanage'>
                                <UserManage />
                            </Route>
                            <Route path='/admin/productmanage' key='productmanage'>
                                <ProductManage />
                            </Route>
                            <Route path='/admin/order' key='order'>
                                <Order />
                            </Route>
                            <Route path='/admin/type' key='type'>
                                <Type />
                            </Route>
                        </Switch>
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    )
}
