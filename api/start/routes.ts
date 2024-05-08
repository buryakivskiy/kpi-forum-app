import Route from '@ioc:Adonis/Core/Route'
import authRoutes from './routes/auth'
import forumRoutes from './routes/forum'
import userRoutes from './routes/user'

Route.group(() => {
  authRoutes(),
  forumRoutes(),
  userRoutes()
}).prefix('api')
