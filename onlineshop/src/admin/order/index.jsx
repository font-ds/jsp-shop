import axios from 'axios'
import React,{useEffect,useState} from 'react'
import {Table,Button, message} from 'antd'

export default function Index() {
    let [order,setOrder]=useState([])

    const getAllOrder=()=>{
        axios({
            method:'get',
            url: 'http://localhost:7001/admin/getAllOrders',
        }).then(res=>{
            console.log(res.data.data)
            setOrder(res.data.data)
        })
    }
    useEffect(()=>{
       getAllOrder()
    },[])

    const delOrder=(value)=>{
        axios({
            method:'post',
            url: 'http://localhost:7001/default/delOrder',
            data:{id:value}
        }).then(res=>{
            if(res.data.data=='订单删除成功') {
                message.success('订单删除成功')
                getAllOrder()
            }
            else message.error('订单删除失败')
        })
    }

    const columns=[
        {
            title: '姓名',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '电话',
            dataIndex: 'phone',
            key: 'phone',
        }, {
            title: '地址',
            dataIndex: 'address',
            key: 'address',
        }, 
        {
            title: '用户姓名',
            dataIndex: 'username',
            key: 'username',
        }, 
        
        {
            title: '商品图片',
            dataIndex: 'imagepath',
            key: 'imagepath',
            render: (_, good) => {
                return <img src={good.imagepath} style={{ width: '60px', height: '60px' }} alt="" />
            }
        },
        {
            title: '商品名称',
            dataIndex: 'goodname',
            key: 'goodname',
        },
        {
            title: '商品单价',
            dataIndex: 'goodprice',
            key: 'goodprice',
            render: (_, good) => {
                return <span>￥{good.goodprice}</span>
            }
        },
        {
            title: '购买数量',
            dataIndex: 'number',
            key: 'number',
        },
        {
            title: '订单总额',
            dataIndex: 'allMoney',
            key: 'allMoney',
            render: (_, good) => {
                return <span>￥{good.goodprice*good.number}</span>
            }
        },
        {
            title: '操作',
            key: 'tags',
            dataIndex: 'tags',
            render: (_, good) => {
                return (
                    <span>
                        <Button danger size='small' onClick={() => delOrder(good.id)}>删除</Button>
                    </span>)
            }
        }
    ]
    return (
        <div style={{ height: '90vh' }}>
            <Table
            size='default'
            className='admin-table'
            columns={columns}
            dataSource={order}
            rowKey='goodname'
            pagination={false}>
            </Table>
        </div>
    )
}
