import Route from '@ioc:Adonis/Core/Route'

export default function likeRoutes() {
  Route.group(() => {
    Route.get('like', 'LikeController.index')
    Route.get('like/:forumId', 'LikeController.indexByForum')
    Route.post('like', 'LikeController.store')
    Route.delete('like/:id', 'LikeController.destroy')
  })
}