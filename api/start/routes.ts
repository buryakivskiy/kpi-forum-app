import Route from '@ioc:Adonis/Core/Route'
import authRoutes from './routes/auth'

Route.group(() => {
  authRoutes()
}).prefix('api')
