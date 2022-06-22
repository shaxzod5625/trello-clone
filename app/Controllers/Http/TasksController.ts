import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Task from "App/Models/Task";
import Card from "App/Models/Card";

export default class TasksController {
  public async index ({ params, response }:HttpContextContract) {
    const tasks = await Task.query().where('card_id', params.card_id)
    return response.json({ tasks })
  }

  public async store ({ params, request, response }:HttpContextContract) {
    const card = await Card.find(params.card_id)
    if (!card) {
      return response.status(404).json({
        message: 'Card not found'
      })
    }
    const task = await Task.create({
      title: request.body().title,
      description: request.body().description,
      card_id: params.card_id
    })
    return {
      task,
      message: 'Created successfully'
    }
  }

  public async show ({ params, response }:HttpContextContract) {
    const task = await Task.find(params.id)
    if (!task) {
      return response.status(404).json({
        message: 'Task not found'
      })
    }
    return task
  }

  public async update ({ params, request, response }:HttpContextContract) {
    const task = await Task.find(params.id)
    if (!task) {
      return response.status(404).json({
        message: 'Task not found'
      })
    }
    const { title, description } = request.body()
    task.title = title
    task.description = description
    await task.save()
    return {
      task,
      message: 'Updated successfully'
    }
  }

  public async destroy ({ params, response }:HttpContextContract) {
    const task = await Task.find(params.id)
    if (!task) {
      return response.status(404).json({
        message: 'Task not found'
      })
    }
    await task.delete()
    return {
      message: 'Deleted successfully'
    }
  }
}
