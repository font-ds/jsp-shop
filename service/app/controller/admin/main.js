'use strict'

const Controller = require('egg').Controller
let fs = require('fs')
let mv = require('mv')

class MainController extends Controller {

    async index() {
        this.ctx.body = 'success'
    }

    // 查询所有用户
    async getAllUsers() {
        let sql = 'SELECT users.username as username,' +
            'users.password as password,' +
            'users.name as name,' +
            'users.age as age,' +
            'users.sex as sex ' +
            'FROM users'

        const results = await this.app.mysql.query(sql)
        this.ctx.body = { data: results }
    }

    // 删除用户
    async delUser() {
        let username = this.ctx.request.body.username
        const res = await this.app.mysql.delete('users', { 'username': username })
        this.ctx.body = {
            data: '删除成功'
        }
    }

    // 用户重置密码
    async setPassword() {
        const data = this.ctx.request.body
        data.password = '123456'
        const result = await this.app.mysql.update('users', data, {
            where: {
                username: data.username
            } //修改查询条件
        });
        this.ctx.body = {
            data: '修改成功'
        }
    }

    // 添加产品
    async addGood() {
        const formData = this.ctx.multipart()
        let goodData = {}
        let part;
        while ((part = await formData()) != null) {
            if (part.length) {
                // console.log(JSON.parse(formData))
                if (part[0] == 'imagepath') {
                    let filename = JSON.parse(part[1]).file.name
                    let imgData = JSON.parse(part[1]).file.thumbUrl.replace(/^data:image\/\w+;base64,/, "");
                    let buffer = Buffer.from(imgData, 'base64')
                    fs.writeFile(filename, buffer, function (err) {
                        if (err) {
                            console.log(err)
                            console.log('保存失败')

                        } else {
                            console.log('保存成功')
                            mv(`C:\\Users\\HUAWEI\\Desktop\\jsp-onlineShop\\service\\${filename}`,
                                `C:\\Users\\HUAWEI\\Desktop\\jsp-onlineShop\\service\\app\\public\\${filename}`,
                                function (err) {
                                    console.log(err)
                                })
                        }
                    });
                    goodData.imagepath = `http://127.0.0.1:7001/public/${filename}`
                } else {
                    goodData[part[0]] = part[1]
                }
            } else {

            }
        }
        let goodId = goodData.goodId
        const sql = "SELECT goodId FROM goods WHERE goodId= '" + goodId + "'"
        const res = await this.app.mysql.query(sql)
        console.log(res)
        if (res.length == 0) {

            const result = await this.app.mysql.insert('goods', goodData)
            const insertSuccess = result.affectedRows === 1
            this.ctx.body = {
                isSuccess: insertSuccess,
                data: '添加商品成功'
            }
        } else {
            this.ctx.body = {
                data: '添加商品失败'
            }
        }

    }

    // 产品更新
    async updateGood() {
        const formData = this.ctx.multipart()
        let goodData = {}
        let part;
        while ((part = await formData()) != null) {
            if (part.length) {
                if (part[0] == 'imagepath') {
                    if(JSON.parse(part[1]).file!=undefined){
                    let filename = JSON.parse(part[1]).file.name
                    let imgpath = `http://127.0.0.1:7001/public/${filename}`
                    const sql = "SELECT goodId FROM goods WHERE imagepath= '" + imgpath + "'"
                    const res = await this.app.mysql.query(sql)
                    if (res.length == 0) {
                        
                        let imgData = JSON.parse(part[1]).file.thumbUrl.replace(/^data:image\/\w+;base64,/, "");
                        let buffer = Buffer.from(imgData, 'base64')
                        fs.writeFile(filename, buffer, function (err) {
                            if (err) {
                                console.log(err)
                                console.log('保存失败')

                            } else {
                                console.log('保存成功')
                                mv(`C:\\Users\\HUAWEI\\Desktop\\jsp-onlineShop\\service\\${filename}`,
                                    `C:\\Users\\HUAWEI\\Desktop\\jsp-onlineShop\\service\\app\\public\\${filename}`,
                                    function (err) {
                                        console.log(err)
                                    })
                            }
                        });
                        goodData.imagepath = `http://127.0.0.1:7001/public/${filename}`
                    } 
                    else {
                        goodData.imagepath=part[1]
                     }
                }
                } else {
                    goodData[part[0]] = part[1]
                }
            } else {

            }
        }
        let goodId = goodData.goodId

        const result = await this.app.mysql.update('goods', goodData, {
            where: {
                goodId: goodId
            } //修改查询条件
        });
        this.ctx.body = {
            data: '修改成功'
        }
    }

    // 删除产品
    async delGood() {
        let goodId = this.ctx.request.body.goodId
        const res = await this.app.mysql.delete('goods', this.ctx.request.body)
        this.ctx.body = {
            data: '删除成功'
        }
    }

    async getAllOrders(){
        let sql = 'SELECT orders.name as name,' +
        'orders.username as username,' +
        'orders.phone as phone,' +
        'orders.address as address,' +
        'orders.goodId as goodId,' +
        'orders.Id as id,' +
        'orders.goodname as goodname,' +
        'orders.goodtype as goodtype,' +
        'orders.goodprice as goodprice,' +
        'orders.number as number,' +
        'orders.imagepath as imagepath ' +
        'FROM orders '
    const results = await this.app.mysql.query(sql)
    this.ctx.body = { data: results }
    }

}

module.exports = MainController




