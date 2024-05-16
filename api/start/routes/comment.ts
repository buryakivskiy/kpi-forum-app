import Route from '@ioc:Adonis/Core/Route'

export default function commentRoutes() {
  Route.group(() => {
    Route.get('comment', 'CommentController.index')
    Route.get('comment/:forumId', 'CommentController.indexByForum')
    Route.post('comment', 'CommentController.store')
    Route.put('comment/:id', 'CommentController.update')
    Route.delete('comment/:id', 'CommentController.destroy')
  })
}