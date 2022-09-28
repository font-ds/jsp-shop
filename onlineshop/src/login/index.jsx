import React from 'react'
import { Form, Input, Button, message, Modal } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import axios from 'axios'
import { useHistory } from 'react-router-dom'

import './index.css'


export default function Login(props) {

    let [state, setState] = React.useState(true)
    let [visiable, setVisiable] = React.useState(false)

    const history = useHistory()


    const onFinish = (values) => {
        console.log(values, 1)
        if (values.username == 'admin') {
            if (values.password === '108719') {
                message.success('管理员登陆成功')
                history.push('/admin/usermanage')
                localStorage.setItem('username', values.username)
            } else message.error('密码错误')
        }
        else {
            //登录

            axios({
                method: 'post',
                data: values,
                url: 'http://localhost:7001/default/userLogin'
            }).then(res => {
                // 判断一下管理员
                if (res.data.data == '登录成功') {
                    localStorage.setItem('username', values.username)
                    history.push('/home/allgoods')
                }
                else message.error('用户名不存在或密码错误')
            })
        }
    }



    const register = (values) => {
        console.log(values, 2)
        if (values.username === 'admin') message.error('用户名已存在')
        else {
            axios({
                method: 'post',
                data: values,
                url: 'http://localhost:7001/default/userRegister'
            }).then(res => {
                console.log(res)
                if (res.data.data = '注册成功') {
                    message.success('注册成功，请前往登录')
                    setVisiable(false)
                }
                else message.error('用户名已存在')
            })
        }
    }

    const goRegister = () => {
        setVisiable(true)
    }

    const layout = {
        labelCol: {
            span: 8,
        },
        wrapperCol: {
            span: 20,
            offset: 2
        },
    }

    const bottomLayout = {
        wrapperCol: {
            span: 10,
            offset: 8,
        },
    }

    return (
        <div className='login-wapper'>
            <h1 className='login-title'>网上购物平台</h1>
            <h2 className='form-title'>用户登录</h2>
            <Form
                name="normal_login"
                className="login-form"
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                {...layout}
            >
                <Form.Item
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Username!',
                        },
                    ]}
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Password!',
                        },
                    ]}
                >
                    <Input

                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="Password"
                    />
                </Form.Item>
                <Form.Item {...bottomLayout}>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        登录
                    </Button>
                    <Button onClick={() => goRegister()} className='button-right'>去注册</Button>
                </Form.Item>
            </Form>

            <Modal destroyOnClose title='用户注册' visible={visiable} onCancel={() => setVisiable(false)} footer={null}>
                <Form
                    name="register"
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={register}
                // {...layout}
                >
                    <Form.Item
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Username!',
                            },
                        ]}
                        label='账号'
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Password!',
                            },
                        ]}
                        label='密码'
                    >
                        <Input

                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="Password"
                        />
                    </Form.Item>
                    <Form.Item
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your name!',
                            },
                        ]}
                        label='昵称'
                    >
                        <Input

                            prefix={<LockOutlined className="site-form-item-icon" />}
                        />
                    </Form.Item>
                    <Form.Item
                        name="sex"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your sex!',
                            },
                        ]}
                        label='性别'
                    >
                        <Input

                            prefix={<LockOutlined className="site-form-item-icon" />}
                        />
                    </Form.Item>
                    <Form.Item
                        name="age"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your age!',
                            },
                        ]}
                        label='年龄'
                    >
                        <Input

                            prefix={<LockOutlined className="site-form-item-icon" />}
                        />
                    </Form.Item>
                    <Form.Item {...bottomLayout}>
                        <Button htmlType="submit" className='button-right'>注册</Button>
                    </Form.Item>
                </Form>
            </Modal>

        </div>
    )
}
