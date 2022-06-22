/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.group(() => {
    Route.resource('/desks', 'DesksController')
    Route.resource('/:desk_id/lists', 'ListsController')
    Route.resource('/:list_id/cards', 'CardsController')
    Route.resource('/:card_id/tasks', 'TasksController')
  }).middleware('auth')

  Route.post('/login', 'AuthController.login')
  Route.post('/register', 'AuthController.register')
  Route.post('/logout', 'AuthController.logout')
}).prefix('/api')
