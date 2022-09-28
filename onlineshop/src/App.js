import React from 'react'
import axios from 'axios'
import { HashRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import routes from './routes'
import 'antd/dist/antd.css';


function App() {

  let dataProps = {}
  dataProps.username = 'wangdingkun'
  dataProps.password = '123456'

  const getMessage = () => {
    axios({
      method: 'post',
      data: dataProps,
      url: 'http://localhost:7001/default/userRegister'
    }).then(res => {
      console.log(res)
    })
  }



  let dataProps2 = {}
  dataProps2.goodId = 2
  dataProps2.username = 'wangdingkun'
  dataProps2.goodname = '小汽车'
  dataProps2.goodprice = 100
  dataProps2.goodtype = '汽车'
  dataProps2.imagepath = './image'

  const addCarts = () => {
    axios({
      method: 'post',
      data: dataProps2,
      url: 'http://localhost:7001/default/addCart'
    }).then(res => {
      console.log(res)
    })
  }

  let dataProps3 = {}
  dataProps3.username = 'wangdingkun'
  dataProps3.goodname = '小汽车'
  const delCarts = () => {
    axios({
      method: 'post',
      data: dataProps3,
      url: 'http://localhost:7001/default/delCarts'
    }).then(res => {
      console.log(res)
    })
  }

  let dataProps4 = {}
  dataProps4.goodId = 2
  dataProps4.goodname = '电脑'
  dataProps4.goodtype = '数码产品'
  dataProps4.goodshow = '电脑'
  dataProps4.goodprice = 100
  dataProps4.goodnumber = 100
  dataProps4.imagepath = './image'


  const addGood = () => {
    axios({
      method: 'post',
      data: dataProps4,
      url: 'http://localhost:7001/admin/addGood'
    }).then(res => {
      console.log(res);
    })
  }

  let dataProps5 = {}
  dataProps5.goodId = 2
  const delGood = () => {
    axios({
      method: 'post',
      data: dataProps5,
      url: 'http://localhost:7001/admin/delGood'
    }).then(res => {
      console.log(res);
    })
  }



  dataProps.password = 'ading'

  const updateUser = () => {
    axios({
      method: 'post',
      data: dataProps,
      url: 'http://localhost:7001/default/updateUser'
    })
  }

  dataProps4.goodname = '电脑'
  const updataGood = () => {
    axios({
      method: 'post',
      data: dataProps4,
      url: 'http://localhost:7001/admin/updateGood'
    }).then(res => {
      console.log(res)
    })
  }

  return (
    <div className="App">
      <Router>
        <Switch>
          {routes.map(item => {
            return <Route key={item.path} path={item.path} component={item.route}></Route>
          })}
          <Redirect to="/login" />
        </Switch>
      </Router>
      {/* <button onClick={getMessage}>注册</button>
      <button onClick={login}>登录</button>
      <button onClick={addCarts}>添加</button>
      <button onClick={delCarts}>删除</button>
      <button onClick={addGood}>添加商品</button>
      <button onClick={delGood}>删除产品</button>
      <button onClick={updateUser}>更新</button>
      <button onClick={updataGood}>更新商品</button> */}
    </div>
  )
}
export default App
