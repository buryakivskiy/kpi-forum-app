import Route from '@ioc:Adonis/Core/Route'
import authRoutes from './routes/auth'
import forumRoutes from './routes/forum'
import userRoutes from './routes/user'
import commentRoutes from './routes/comment'
import likeRoutes from './routes/like'
import categoryRoutes from './routes/category'

Route.group(() => {
  authRoutes(),
  forumRoutes(),
  userRoutes(),
  commentRoutes(),
  likeRoutes(),
  categoryRoutes()
}).prefix('api')
