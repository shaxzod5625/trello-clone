import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Desk from 'App/Models/Desk'

export default class DesksController {
  public async index ({}: HttpContextContract) {
    return await Desk.all()
  }

  public async store ({ request }: HttpContextContract) {
    const title = request.input('title')
    const desk = await Desk.create({ title })
    return {
      desk,
      message: 'Created successfully'
    }
  }

  public async show ({ params, response }: HttpContextContract) {
    const desk = await Desk.find(params.id)
    if (!desk) {
      return response.status(404).json({
        message: 'Desk not found'
      })
    }
    return desk
  }

  public async update ({ params, request, response }: HttpContextContract) {
    const desk = await Desk.find(params.id)
    if (!desk) {
      return response.status(404).json({
        message: 'Desk not found'
      })
    }
    const { title } = request.body()
    desk.title = title
    await desk.save()
    return {
      desk,
      message: 'Updated successfully'
    }
  }

  public async destroy ({ params, response }: HttpContextContract) {
    const desk = await Desk.find(params.id)
    if (!desk) {
      return response.status(404).json({
        message: 'Desk not found'
      })
    }
    await desk.delete()
    return {
      message: 'Deleted successfully'
    }
  }
}
