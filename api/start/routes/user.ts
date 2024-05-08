import Route from '@ioc:Adonis/Core/Route'

export default function userRoutes() {
  Route.group(() => {
    Route.put('user/:id', 'UserController.update')
    Route.delete('user/:id', 'UserController.destroy')
  })
}