import Route from '@ioc:Adonis/Core/Route'

export default function authRoutes() {
  Route.group(() => {
    Route.post('auth/register', 'AuthController.register')
    Route.post('auth/login', 'AuthController.login')
  })
}