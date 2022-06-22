import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import List from 'App/Models/List'
import Desk from "App/Models/Desk";

export default class ListsController {
  public async index({ params, response }:HttpContextContract) {
    const lists = await List.query().where('desk_id', params.desk_id)
    return response.json({ lists })
  }

  public async store({ params, request, response }:HttpContextContract) {
    const desk = await Desk.find(params.desk_id)
    if (!desk) {
      return response.status(404).json({
        message: 'Desk not found'
      })
    }
    const list = await List.create({
      title: request.body().title,
      desk_id: params.desk_id
    })
    return {
      list,
      message: 'Created successfully'
    }
  }

  public async show({ params, response }:HttpContextContract) {
    const list = await List.find(params.id)
    if (!list) {
      return response.status(404).json({
        message: 'List not found'
      })
    }
    return list
  }

  public async update({ params, request, response }:HttpContextContract) {
    const list = await List.find(params.id)
    if (!list) {
      return response.status(404).json({
        message: 'List not found'
      })
    }
    const { title } = request.body()
    list.merge({
      title
    })
    await list.save()
    return {
      list,
      message: 'Updated successfully'
    }
  }

  public async destroy({ params, response }:HttpContextContract) {
    const list = await List.find(params.id)
    if (!list) {
      return response.status(404).json({
        message: 'List not found'
      })
    }
    await list.delete()
    return {
      message: 'Deleted successfully'
    }
  }
}
