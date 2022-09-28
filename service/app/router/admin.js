module.exports = app => {
    const { router, controller } = app
    app.get('/admin/getAllUsers', controller.admin.main.getAllUsers)
    app.post('/admin/setPassword', controller.admin.main.setPassword)
    app.post('/admin/delUser', controller.admin.main.delUser)
    app.post('/admin/addGood', controller.admin.main.addGood)
    app.post('/admin/delGood', controller.admin.main.delGood)
    app.post('/admin/updateGood', controller.admin.main.updateGood)
    app.get('/admin/getAllOrders', controller.admin.main.getAllOrders)

}