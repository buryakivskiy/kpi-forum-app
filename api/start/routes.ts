import Route from '@ioc:Adonis/Core/Route'
import authRoutes from './routes/auth'
import forumRoutes from './routes/forum'

Route.group(() => {
  authRoutes(),
  forumRoutes()
}).prefix('api')
