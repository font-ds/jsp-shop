import React, { useState } from 'react'
import { Button, message } from 'antd'
import axios from 'axios';



export default function Index() {
    let [data, setData] = useState([])

    let allType=[
        {name:'全部'},
        {name:'女装'},
        {name:'男装'},
        {name:'母婴'},
        {name:'美妆'},
        {name:'彩妆'},
        {name:'手机'},
        {name:'数码'},
        {name:'零食'},
        {name:'厨具'},
        {name:'清洁'},
        {name:'鲜花'},
        {name:'进口'},
        {name:'汽车'},
        {name:'图书'},
        {name:'房产'},
        {name:'手表'},
    ]

    const getData = () => {
        if (localStorage.getItem('username')) {
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
        getData()
    }, [])

    const addCart = (goodId, goodname, goodtype, goodprice, imagepath) => {
        return () => {
            let dataProps = {}
            dataProps.username = localStorage.getItem('username')
            dataProps.goodId = goodId
            dataProps.goodname = goodname
            dataProps.goodtype = goodtype
            dataProps.goodprice = goodprice
            dataProps.imagepath = imagepath
            dataProps.number = 1
            if (localStorage.getItem('username')) {
                axios({
                    method: 'post',
                    data: dataProps,
                    url: 'http://localhost:7001/default/addCart'
                }).then(res => {
                    if (res.data.data == '添加成功') {
                        message.success('加入购物车成功')
                    }
                    else message.error('加入购物车失败')
                })
            }
        }
    }

    return (
        <div style={{ height: '90vh' }}>
           <div className='table-title'>
                <h2>商品类别</h2>
            </div>
            <div style={{display:'flex',justifyContent:'space-around',width:'1000px'}}>
                {allType.map((item,index)=>{
                    if(index===0){
                        return  <span style={{color:'rgb(86,125,180)'}} key={index}>{item.name}</span>
                    }else return <span style={{color:'rgb(86,125,180)'}}  key={index}>/&nbsp;&nbsp;&nbsp;{item.name}</span>
                })}
            </div>
            <div className='table-title'>
                <h2>商品列表</h2>

            </div>
            <div className='all-goods'>
                {
                    data.map((item, index) => {
                        return <div className='good-item' key={(index + 1)}>
                            <div>
                                <img className='goodImage' src={item.imagepath} alt="" />
                            </div>
                            <p className='goodshow' style={{ color: '#808080', width: '250px' }}>{item.goodshow}</p>
                            <div style={{ marginTop: '-10px' }}>
                                <span style={{ marginTop: '5px', fontSize: '17px' }}>{item.goodname}</span>
                                <span style={{ color: 'orange', marginLeft: '8px' }}>￥<span style={{ fontSize: '18px' }}>{item.goodprice}</span></span>
                                <Button style={{ float: 'right' }} size='small' onClick={addCart(item.goodId, item.goodname, item.goodtype, item.goodprice, item.imagepath)}>加入购物车</Button>
                            </div>
                        </div>
                    })
                }
            </div>
        </div>
    )
}
