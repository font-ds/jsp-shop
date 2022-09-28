module.exports = app => {
    const { router, controller } = app
    router.get('/default/getAllGoods', controller.default.home.getAllGoods)
    router.post('/default/userRegister', controller.default.home.userRegister)
    router.post('/default/userLogin', controller.default.home.userLogin)
    router.post('/default/addCart', controller.default.home.addCart)
    router.post('/default/delCarts', controller.default.home.delCarts)
    router.post('/default/updateUser', controller.default.home.updateUser)
    router.post('/default/getCartData', controller.default.home.getCartData)
    router.post('/default/modifyShopcart', controller.default.home.modifyShopcart)
    router.post('/default/submitOrder', controller.default.home.submitOrder)
    router.post('/default/getAllOrders', controller.default.home.getAllOrders)
    router.post('/default/delOrder', controller.default.home.delOrder)


}