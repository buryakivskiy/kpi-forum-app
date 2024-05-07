import Route from '@ioc:Adonis/Core/Route'

export default function forumRoutes() {
  Route.group(() => {
    Route.get('forum', 'ForumController.index')
    Route.post('forum', 'ForumController.store')
  })
}