import React, { useState, useEffect } from 'react'
import { Table, Button, message,Modal,Form ,Input} from 'antd'
import axios from 'axios'

const layout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 16 }
}
const tailLayout = {
    wrapperCol: { offset: 8, span: 16 }
}

export default function Index() {

    let [cartData, setCartData] = useState([])

    let [chooseGood, setChooseGood] = useState([])
    let [allMoney, setAllMoney] = useState(0)
    let [isAddModalVisible,setIsAddModalVisible]=useState(false)

    const openCart = () => {
        if (localStorage.getItem('username'))
            axios({
                method: 'post',
                data: { username: localStorage.getItem('username') },
                url: 'http://localhost:7001/default/getCartData'
            }).then(res => {
                console.log(res)
                setCartData(res.data.data)
                
            })
    }

    useEffect(() => {
        openCart()
    }, [])

    const delCart = (goodId) => {
     
            console.log(goodId)
            if (localStorage.getItem('username'))
                axios({
                    method: 'post',
                    data: { username: localStorage.getItem('username'), goodId },
                    url: 'http://localhost:7001/default/delCarts'
                }).then(res => {
                    if (res.data.data == '删除成功') {
                        openCart()
                    }
                    else message.error('删除失败')
                })
        
    }

    const inputChange = (value,data) => {
        data.number=value
        data.username=localStorage.getItem('username')
        if (localStorage.getItem('username')) {
            axios({
                method: 'post',
                url: 'http://localhost:7001/default/modifyShopcart',
                data
            }).then(res => {
                openCart()
            }
            )
        }
    }

    const allMoneyChange=(value,data)=>{
        let arr=cartData
        arr[arr.indexOf(data)].number=value
        setCartData([...arr])
        if(chooseGood.indexOf(data)!=-1){
            let arr1=chooseGood
            arr1[arr1.indexOf(data)].number=value
            setChooseGood([...arr1])
            let money = 0
            arr1.map(item => {
                return money = money + item.goodprice * item.number
            })
            setAllMoney(money)
        }
    
    }

    const submitDelCart=()=>{
        console.log(chooseGood)
        let arr=[]
        chooseGood.map(item=>{
            return arr.push(item.goodId)
        })
        delCart(arr)
    }


    const handleCancel=()=>{
        setIsAddModalVisible(false)
    }
    const openOrder=()=>{
        setIsAddModalVisible(true)
    }

    const onFinish=(values)=>{
        values.username=localStorage.getItem('username')
        values.goods=chooseGood
        console.log(values.username)
        axios({
            method:'post',
            url: 'http://localhost:7001/default/submitOrder',
            data:values
        }).then(res=>{
            if(res.data.data=='订单提交成功'){
                submitDelCart()
                message.success('订单提交成功')
                setIsAddModalVisible(false)
                setAllMoney(0)
            }
        })
    }

    const columns = [
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
            render: (_, good) => {
                return <input style={{ width: '80px', outline: 'none', border: '1px solid lightgrey' }} type='number' defaultValue={good.number} onBlur={(e)=>inputChange(e.target.value,good)} onChange={(e)=>allMoneyChange(e.target.value,good)}></input>
            }
        },
        {
            title: '操作',
            key: 'tags',
            dataIndex: 'tags',
            render: (_, good) => {
                return (
                    <span>
                        <Button danger size='small' onClick={() => delCart(good.goodId)}>删除</Button>
                    </span>)
            }
        }
    ];


    const rowSelection = {
        onChange: (_, selectedRows) => {
            
            console.log(selectedRows)
             setChooseGood(selectedRows)
             let money = 0
             selectedRows.map(item => {
                 return money = money + item.goodprice * item.number
             })
             setAllMoney(money)
        },
    };



    return (
        <div style={{ height: '90vh' }}>
            <Table
                rowSelection={{
                    type: 'checkbox',
                    ...rowSelection,
                }}
                size='default'
                className='admin-table'
                columns={columns}
                dataSource={cartData}
                rowKey='goodname'
                pagination={false} />

            <span style={{ marginTop: '20px' }}>总金额：&nbsp;￥<span style={{ fontSize: '20px' }}>{allMoney}</span></span>
            <Button size='default' type='primary' style={{ marginTop: '5px', float: 'right' }} onClick={openOrder}>提交订单</Button>

            <Modal destroyOnClose title='填写收货信息' visible={isAddModalVisible} footer={null} onCancel={handleCancel}>
            <Form onFinish={onFinish} {...layout}>

                <Form.Item label='姓名' name='name'  rules={[{ required: true, message: '请输入姓名' }]}>
                   <Input /> 
                </Form.Item>
                <Form.Item label='电话' name='phone'  rules={[{ required: true, message: '请输入电话' }]}>
                <Input /> 
                </Form.Item>
                <Form.Item label='收货地址' name='address' rules={[{ required: true, message: '请输入收货地址' }]}>
                <Input /> 
                </Form.Item>
                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType='submit'>
                        提交
                    </Button>
                    <Button style={{ marginLeft: '20px' }} type="primary" onClick={handleCancel}>
                        取消
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
        </div>

       
    )
}
