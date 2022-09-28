'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
    async index() {
        this.ctx.body = 'success'
    }

    // 查询所有商品
    async getAllGoods() {
        let sql = 'SELECT goods.goodId as goodId,' +
            'goods.goodname as goodname,' +
            'goods.goodtype as goodtype,' +
            'goods.goodprice as goodprice,' +
            'goods.goodnumber as goodnumber,' +
            'goods.goodshow as goodshow,' +
            'goods.imagepath as imagepath ' +
            'FROM goods'

        const results = await this.app.mysql.query(sql)
        this.ctx.body = { data: results }
    }

    // 判断用户登录
    async userLogin() {
        console.log(this.ctx.request.body)
        let username = this.ctx.request.body.username
        let password = this.ctx.request.body.password
        const sql = " SELECT username FROM users WHERE username = '" + username +
            "' AND password = '" + password + "'"
        const res = await this.app.mysql.query(sql)
        if (res.length > 0) {
            this.ctx.body = { 'data': '登录成功' }
        } else {
            this.ctx.body = { data: '登录失败' }
        }
    }

    // 用户注册
    async userRegister() {
        console.log(1, this.ctx.request.body)
        let username = this.ctx.request.body.username
        let password = this.ctx.request.body.password

        let sql = " SELECT username FROM users WHERE username = '" + username + "'"
        const res = await this.app.mysql.query(sql)
        console.log(res.length)
        if (res.length != 0) {
            console.log(res, 1)
            this.ctx.body = {
                data: '注册失败'
            }

        } else {
            console.log(res, 0)
            const result = await this.app.mysql.insert('users', this.ctx.request.body)
            const insertSuccess = result.affectedRows === 1
            this.ctx.body = {
                isSuccess: insertSuccess,
                data: '注册成功'
            }
        }
    }

    // 用户修改密码
    async updateUser() {
        let username = this.ctx.request.body.username
        let password = this.ctx.request.body.password
        const sql = " UPDATE users SET password = '" + password + "' WHERE username = '" + username + "'"
        const res = await this.app.mysql.query(sql)
        console.log(res)
        this.ctx.body = {
            data: '修改成功'
        }
    }

    // 添加商品到购物车
    async addCart() {
        let username = this.ctx.request.body.username
        let goodname = this.ctx.request.body.goodname
        const sql = " SELECT username FROM shopcart WHERE username = '" + username +
            "' AND goodname = '" + goodname + "'"
        const res = await this.app.mysql.query(sql)
        if (res.length == 0) {
            const result = await this.app.mysql.insert('shopcart', this.ctx.request.body)
            const insertSuccess = result.affectedRows === 1
            this.ctx.body = {
                isSuccess: insertSuccess,
                data: '添加成功'
            }
        } else {
            const sql2 = " SELECT number FROM shopcart WHERE username = '" + username +
                "' AND goodname = '" + goodname + "'"
            const res2 = await this.app.mysql.query(sql2)
            let obj = this.ctx.request.body
            obj.number = res2[0].number + 1
            const result = await this.app.mysql.update('shopcart', obj, {
                where: {
                    username: obj.username,
                    goodname: obj.goodname
                } //修改查询条件
            });
            this.ctx.body = {
                data: '添加成功'
            }
        }
    }

    // 从购物车删除
    async delCarts() {
        let username = this.ctx.request.body.username
        let goodId = this.ctx.request.body.goodId

        if(typeof(goodId)=='object'){
            for(let i=0;i<goodId.length;i++){
                this.app.mysql.delete('shopcart', { 'username': username, 'goodId': goodId[i] })
            }
        }
        else {
            this.app.mysql.delete('shopcart', { 'username': username, 'goodId': goodId })
        }
        // const res = await this.app.mysql.delete('shopcart', { 'username': username, 'goodId': goodId })
        this.ctx.body = {
            data: '删除成功'
        }
    }

    // 获取购物车中的内容
    async getCartData() {
        let username = this.ctx.request.body.username
        let sql = 'SELECT shopcart.goodId as goodId,' +
            'shopcart.goodname as goodname,' +
            'shopcart.goodtype as goodtype,' +
            'shopcart.goodprice as goodprice,' +
            'shopcart.imagepath as imagepath, ' +
            'shopcart.number as number ' +
            'FROM shopcart WHERE username = "' + username + '"'
        const res = await this.app.mysql.query(sql)
        this.ctx.body = { data: res }
    }

    // 购物车数量改变
    async modifyShopcart(){
        const data = this.ctx.request.body
        const result = await this.app.mysql.update('shopcart', data, {
            where: {
                goodId: data.goodId,
                username:data.username
            } //修改查询条件
        });
        this.ctx.body = {
            data: '修改成功'
        }
    }

    // 提交订单
    async submitOrder(){
        const data = this.ctx.request.body
        let goods=data.goods
        for(let i=0;i<goods.length;i++){
            this.app.mysql.insert('orders', Object.assign({name:data.name,phone:data.phone,address:data.address,username:data.username},goods[i]))
        }
        // const result = await this.app.mysql.insert('orders', data)
        this.ctx.body = {
            data: '订单提交成功'
        }
    }

    // 查看所有订单
    async getAllOrders(){
        let username=this.ctx.request.body.username
        let sql = 'SELECT orders.name as name,' +
        'orders.phone as phone,' +
        'orders.address as address,' +
        'orders.goodId as goodId,' +
        'orders.Id as id,' +
        'orders.goodname as goodname,' +
        'orders.goodtype as goodtype,' +
        'orders.goodprice as goodprice,' +
        'orders.number as number,' +
        'orders.imagepath as imagepath ' +
        'FROM orders WHERE username = "' + username + '"'
        console.log(username)
    const results = await this.app.mysql.query(sql)
    this.ctx.body = { data: results }
    }

    // 删除订单
    async delOrder(){
        let id = this.ctx.request.body.id
        const res = await this.app.mysql.delete('orders', { 'Id':id })
        this.ctx.body={data:'订单删除成功'}
    }
}

module.exports = HomeController;
