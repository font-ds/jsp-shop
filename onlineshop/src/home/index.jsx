import React, { useState } from 'react'
import { Layout, Button, message, Menu,Modal,Form,Input } from 'antd'
import { Route, Switch, Link } from 'react-router-dom'

import './index.css'
import axios from 'axios';
import GoodList from './goodList/index'
import Shopcard from './shopcard/index'
import Order from './order/index'
import { useHistory } from 'react-router-dom'

const { Header, Content } = Layout;
const layout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 16 }
}
const tailLayout = {
    wrapperCol: { offset: 8, span: 16 }
}
export default function Home() {
    let [modal,setModal]=React.useState(false)
    React.useEffect(()=>{
        console.log(localStorage.getItem('username'))
        if(!localStorage.getItem('username')){
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

    const modify=()=>{
        setModal(true)
    }

    return (
        <div style={{ minWidth: '1120px' }}>
            <Layout className="layout">
                <Header className='header'>
                    <div style={{ display:'flex' }} className="logo">
                        <h1 style={{marginRight: '30px'}} className='home-logo'>网上购物平台</h1>
                  
                    <Menu style={{ fontSize: '16px' }} theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
                        <Menu.Item key="allgoods"><Link to='/home/allgoods'>商品列表</Link></Menu.Item>
                        <Menu.Item key="shopcard"><Link to='/home/shopcard'>购物车</Link></Menu.Item>
                        <Menu.Item key="order"><Link to='/home/order'>订单</Link></Menu.Item>
                    </Menu>
                    </div>
                    <div  className='welcome'>
                        欢迎，{localStorage.getItem('username') || ''}
                        <span style={{marginLeft:'18px'}} onClick={logOut}>注销</span>
                        <span style={{marginLeft:'18px'}} onClick={modify}>修改</span>

                    </div>
                </Header>
                <Content style={{ padding: '0 20px' }}>
                    <Switch>
                        <Route path='/home/allgoods' key='allgoods'>
                            <GoodList />
                        </Route>
                        <Route path='/home/shopcard' key='shopcard'>
                            <Shopcard />
                        </Route>
                        <Route path='/home/order' key='order'>
                            <Order />
                        </Route>
                    </Switch>

                </Content>
            </Layout>

            <Modal destroyOnClose title={'修改用户信息'} visible={modal} footer={null}>
                    <Form {...layout}>

                        <Form.Item label='姓名' name='goodId'>
                        <Input></Input>

                        </Form.Item>
                        <Form.Item label='年龄' name='goodname'>
                        <Input></Input>

                        </Form.Item>
                        <Form.Item label='性别' name='goodtype' >
                         <Input></Input>
                        </Form.Item>
                        <Form.Item {...tailLayout}>
                            <Button type="primary" htmlType='submit'>
                                修改
                            </Button>
                            <Button style={{ marginLeft: '20px' }} type="primary">
                                取消
                            </Button>
                        </Form.Item>
                    </Form>
                </Modal>
        </div>
    )
}
