import React, { useState } from 'react'
import { Table, Button, Input, Modal, Form, message, Upload } from 'antd'
import { UploadOutlined } from '@ant-design/icons';
import './index.css'
import axios from 'axios';


export default function ProductManage() {

    let data=[
        {
            goodtypeId:1,
            goodtype:'女装'
        },
        {
            goodtypeId:2,
            goodtype:'男装'
        },{
            goodtypeId:3,
            goodtype:'母婴'
        },{
            goodtypeId:4,
            goodtype:'美妆'
        },{
            goodtypeId:5,
            goodtype:'彩妆'
        },{
            goodtypeId:6,
            goodtype:'手机'
        },{
            goodtypeId:7,
            goodtype:'数码'
        },{
            goodtypeId:8,
            goodtype:'零食'
        },{
            goodtypeId:9,
            goodtype:'厨具'
        },{
            goodtypeId:10,
            goodtype:'清洁'
        },{
            goodtypeId:11,
            goodtype:'鲜花'
        },{
            goodtypeId:12,
            goodtype:'进口'
        },{
            goodtypeId:13,
            goodtype:'汽车'
        },{
            goodtypeId:14,
            goodtype:'图书'
        },{
            goodtypeId:15,
            goodtype:'房产'
        },{
            goodtypeId:16,
            goodtype:'手表'
        },
    ]

  

    const layout = {
        labelCol: { span: 5 },
        wrapperCol: { span: 16 }
    }
    const tailLayout = {
        wrapperCol: { offset: 8, span: 16 }
    }


    const columns = [
        {
            title: '类别ID',
            dataIndex: 'goodtypeId',
            key: 'goodtypeId',
        },
        {
            title: '类别名称',
            dataIndex: 'goodtype',
            key: 'goodtype',
        },
        {
            title: '操作',
            key: 'tags',
            width:'200px',
            dataIndex: 'tags',
            render: (_, good) => {
                return (
                    <span>
                        <Button type='primary'>删除</Button>
                    </span>)
            }
        }
    ];

    return (
        <div style={{minWidth:'1120px'}}>
            <div className='table-title'>
                <h2>类别列表</h2>
               
            </div>
            <div className="site-layout-content">
                <Table size='small' columns={columns} dataSource={data}></Table>
            </div>
        </div>
    )
}
