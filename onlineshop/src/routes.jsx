import Login from './login'
import Home from './home'
import Admin from './admin'

export default [
    {
        path: '/login',
        route: Login
    },
    {
        path: '/home',
        route: Home
    },
    {
        path: '/admin',
        route: Admin
    },
]