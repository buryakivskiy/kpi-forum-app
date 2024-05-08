import Route from '@ioc:Adonis/Core/Route'

export default function forumRoutes() {
  Route.group(() => {
    Route.get('forum', 'ForumController.index')
    Route.get('forum/:id', 'ForumController.show')
    Route.get('forum/auth/:userId', 'ForumController.indexByUser')
    Route.post('forum', 'ForumController.store')
    Route.put('forum/:id', 'ForumController.update')
    Route.delete('forum/:id', 'ForumController.destroy')
  })
}