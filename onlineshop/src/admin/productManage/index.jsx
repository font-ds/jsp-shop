import React, { useState } from 'react'
import { Table, Button, Input, Modal, Form, message, Upload } from 'antd'
import { UploadOutlined } from '@ant-design/icons';
import './index.css'
import axios from 'axios';


export default function ProductManage() {

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
                url: 'http://localhost:7001/default/getAllGoods'
            }).then(res => {
                console.log(res.data.data)
                setData(res.data.data)
            }
            )
        }
    }

    React.useEffect(() => {
        console.log(1)
        getData()
    }, [])

    const modifyGood = (good, bool) => {
        // 通过bool判断修改或添加
        if (bool === true) setNowModifyGood(good)
        console.log(good)
        setIsAddModalVisible(true)
    }


    const onFinish = async (values) => {
        let formData = new FormData()
        formData.append('goodId', values.goodId)
        formData.append('goodname', values.goodname)
        formData.append('goodtype', values.goodtype)
        formData.append('goodprice', values.goodprice)
        formData.append('goodnumber', values.goodnumber)
        formData.append('goodshow', values.goodshow)
        formData.append('imagepath', JSON.stringify(values.imagepath))

        if (!nowModifyGood) {
            if (localStorage.getItem('username') == 'admin') {
                setTimeout(() => {
                    axios({
                        method: 'post',
                        data: formData,
                        url: 'http://localhost:7001/admin/addGood',
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },

                    }).then(res => {
                        if (res.data.data == '添加商品成功') {
                            message.success('添加商品成功')
                            getData()
                            setIsAddModalVisible(false)
                        }
                        else message.error('添加商品失败')
                    })
                }, 1000)

            }
        }
        // 修改
        if (nowModifyGood) {
            let formData1 = new FormData()
            formData1.append('goodId', values.goodId!=null?values.goodId:nowModifyGood.goodId)
            formData1.append('goodname', values.goodname!=null?values.goodname:nowModifyGood.goodname)
            formData1.append('goodtype', values.goodtype!=null?values.goodtype:nowModifyGood.goodtype)
            formData1.append('goodprice', values.goodprice!=null?values.goodprice:nowModifyGood.goodprice)
            formData1.append('goodnumber', values.goodnumber!=null?values.goodnumber:nowModifyGood.goodnumber)
            formData1.append('goodshow', values.goodshow!=null?values.goodshow:nowModifyGood.goodshow)
            formData1.append('imagepath', JSON.stringify(values.imagepath!=null?values.imagepath:nowModifyGood.imagepath))

            if (localStorage.getItem('username') == 'admin') {
                setTimeout(() => {
                    axios({
                        method: 'post',
                        data: formData,
                        url: 'http://localhost:7001/admin/updateGood',
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },

                    }).then(res => {
                        if (res.data.data == '修改成功') {
                            message.success('修改商品成功')
                            getData()
                            setIsAddModalVisible(false)
                        }
                        else message.error('修改商品失败')
                    })
                }, 1000)
            }
        }
    }

    const handleCancel = () => {
        setNowModifyGood(false)
        setIsAddModalVisible(false)
    }



    const delGood = (values) => {
        if (localStorage.getItem('username') == 'admin') {

            axios({
                method: 'post',
                data: values,
                url: 'http://localhost:7001/admin/delGood'
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

    const columns = [
        {
            title: '商品编号',
            dataIndex: 'goodId',
            className:'minWidth',
            key: 'goodId',
        },
        {
            title: '商品名称',
            className:'minWidth',
            dataIndex: 'goodname',
            key: 'goodname',
        },
        {
            title: '商品类型',
            className:'minWidth',
            dataIndex: 'goodtype',
            key: 'goodtype',
        },
        {
            title: '商品价格',
            className:'minWidth',
            dataIndex: 'goodprice',
            key: 'goodprice',
        },
        {
            title: '商品数量',
            className:'minWidth',
            dataIndex: 'goodnumber',
            key: 'goodnumber',
        },
        {
            title: '商品简介',
            dataIndex: 'goodshow',
            key: 'goodshow',
        },
        {
            title: '商品图片',
            className:'minWidth',
            dataIndex: 'imagepath',
            key: 'imagepath',
            render: (_, good) => {
                console.log(1, good.imagepath)
                return <img onClick={() => { window.open(good.imagepath, '_blank') }} style={{ width: '50px', height: '50px' }} src={good.imagepath} alt="" />
            }
        },
        {
            title: '操作',
            key: 'tags',
            width:'200px',
            dataIndex: 'tags',
            render: (_, good) => {
                return (
                    <span>
                        <Button type='primary' onClick={() => delGood(good)}>删除</Button>
                        <Button className='table-btn' type='primary' onClick={() => modifyGood(good, true)}>修改</Button>
                    </span>)
            }
        }
    ];

    return (
        <div style={{minWidth:'1120px'}}>
            <div className='table-title'>
                <h2>商品列表</h2>
                <Button type='primary' className='addBtn' onClick={() => modifyGood(null, false)}>添加商品</Button>
            </div>
            <div className="site-layout-content">
                <Table size='large' columns={columns} dataSource={data}></Table>
                <Modal destroyOnClose title={nowModifyGood === false ? "添加商品" : '修改商品'} visible={isAddModalVisible} footer={null} onCancel={handleCancel}>
                    <Form onFinish={onFinish} {...layout}>

                        <Form.Item label='商品编号' name='goodId' rules={nowModifyGood===false?[{ required: true, message: 'Not allowed null' }]:null}>
                            {nowModifyGood === false ? <Input /> : <Input disabled='true' defaultValue={nowModifyGood.goodId} />}
                        </Form.Item>
                        <Form.Item label='商品名称' name='goodname' rules={nowModifyGood===false?[{ required: true, message: 'Not allowed null' }]:null}>
                            {nowModifyGood === false ? <Input /> : <Input defaultValue={nowModifyGood.goodname} />}
                        </Form.Item>
                        <Form.Item label='商品类型' name='goodtype' rules={nowModifyGood===false?[{ required: true, message: 'Not allowed null' }]:null}>
                            {nowModifyGood === false ? <Input /> : <Input defaultValue={nowModifyGood.goodtype} />}
                        </Form.Item>
                        <Form.Item label='商品价格' name='goodprice' rules={nowModifyGood===false?[{ required: true, message: 'Not allowed null' }]:null}>
                            {nowModifyGood === false ? <Input /> : <Input defaultValue={nowModifyGood.goodprice} />}
                        </Form.Item>
                        <Form.Item label='商品数量' name='goodnumber' rules={nowModifyGood===false?[{ required: true, message: 'Not allowed null' }]:null}>
                            {nowModifyGood === false ? <Input /> : <Input defaultValue={nowModifyGood.goodnumber} />}
                        </Form.Item>
                        <Form.Item label='商品简介' name='goodshow' rules={nowModifyGood===false?[{ required: true, message: 'Not allowed null' }]:null}>
                            {nowModifyGood === false ? <Input /> : <Input defaultValue={nowModifyGood.goodshow} />}
                        </Form.Item>
                        <Form.Item label='商品图片' name='imagepath' rules={nowModifyGood===false?[{ required: true, message: 'Not allowed null' }]:null}>
                            {/* {nowModifyGood === false ? <Input /> : <Input defaultValue={nowModifyGood.goodshow} />} */}
                            <Upload
                                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                listType="picture"
                                maxCount={1}
                            >
                                <Button icon={<UploadOutlined />}>Upload</Button>
                            </Upload>
                        </Form.Item>
                        <Form.Item {...tailLayout}>
                            <Button type="primary" htmlType='submit'>
                                {nowModifyGood === false ? '添加' : '修改'}
                            </Button>
                            <Button style={{ marginLeft: '20px' }} type="primary" onClick={handleCancel}>
                                取消
                            </Button>
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        </div>
    )
}
