import React, { useEffect, useState } from 'react'
import { Table, Button, Input, Modal, Form, message } from 'antd'
import axios from 'axios'



export default function UserManage() {
    const layout = {
        labelCol: { span: 5 },
        wrapperCol: { span: 16 }
    }
    const tailLayout = {
        wrapperCol: { offset: 8, span: 16 }
    }

    // 控制Modal弹窗显示
    let [isAddModalVisible, setIsAddModalVisible] = useState(false)
    // 修改时暂存需要修改的成员的数据
    let [nowModifyGood, setNowModifyGood] = useState(false)
    // Table组件渲染的数据源
    let [data, setData] = useState([])

    const getData = () => {
        if (localStorage.getItem('username') == 'admin') {
            axios({
                method: 'get',
                url: 'http://localhost:7001/admin/getAllUsers'
            }).then(res => {
                console.log(res.data.data)
                setData(res.data.data)
            }
            )
        }
    }

    useEffect(() => {
        getData()
    }, [])


    const delUser = (values) => {
        if (localStorage.getItem('username') == 'admin') {

            axios({
                method: 'post',
                data: values,
                url: 'http://localhost:7001/admin/delUser'
            }).then(res => {
                if (res.data.data === '删除成功') {
                    message.success('删除成功')
                    let newData = data
                    newData.splice(newData.indexOf(values), 1)
                    setData([...newData])
                } else {
                    message.error('删除失败')
                }
            })
        }
    }

    const setPassword = (user) => {
        if (localStorage.getItem('username') == 'admin') {

            axios({
                method: 'post',
                data: user,
                url: 'http://localhost:7001/admin/setPassword'
            }).then(res => {
                if (res.data.data === '修改成功') {
                    message.success('修改成功')
                } else {
                    message.error('修改失败')
                }
            })
        }
    }

    const columns = [
        {
            title: '用户名',
            dataIndex: 'username',
            key: 'username',
        },
        {
            title: '密码',
            dataIndex: 'password',
            key: 'password',
        },
        {
            title: '昵称',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '年龄',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: '性别',
            dataIndex: 'sex',
            key: 'sex',
        },
        {
            title: '操作',
            key: 'tags',
            dataIndex: 'tags',
            render: (_, user) => {
                return (
                    <span>
                        <Button type='primary' onClick={() => delUser(user)}>删除</Button>
                        <Button className='table-btn' type='primary' onClick={() => setPassword(user)}>重置密码</Button>
                    </span>)
            }
        }
    ];

    return (
        <div>
            <div className='table-title'>
                <h2>用户列表</h2>
            </div>
            <div className="site-layout-content">
                <Table columns={columns} dataSource={data}></Table>
            </div>
        </div>
    )
}
