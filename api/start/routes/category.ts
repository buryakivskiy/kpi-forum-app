import Route from '@ioc:Adonis/Core/Route'

export default function categoryRoutes() {
  Route.group(() => {
    Route.get('category', 'CategoryController.index')
  })
}