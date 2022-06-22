import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Card from 'App/Models/Card'
import List from 'App/Models/List'

export default class CardsController {
  public async index ({ params, response }: HttpContextContract) {
    const cards = await Card.query().where('list_id', params.list_id)
    return response.json({ cards })
  }

  public async store ({ params, request, response }: HttpContextContract) {
    const list = await List.find(params.list_id)
    if (!list) {
      return response.status(404).json({
        message: 'List not found'
      })
    }
    const card = await Card.create({
      title: request.body().title,
      list_id: params.list_id
    })
    return {
      card,
      message: 'Created successfully'
    }
  }

  public async show ({ params, response }: HttpContextContract) {
    const card = await Card.find(params.id)
    if (!card) {
      return response.status(404).json({
        message: 'Card not found'
      })
    }
    return card
  }

  public async update ({ params, request, response }: HttpContextContract) {
    const card = await Card.find(params.id)
    if (!card) {
      return response.status(404).json({
        message: 'Card not found'
      })
    }
    const { title } = request.body()
    card.title = title
    await card.save()
    return {
      card,
      message: 'Updated successfully'
    }
  }

  public async destroy ({ params, response }: HttpContextContract) {
    const card = await Card.find(params.id)
    if (!card) {
      return response.status(404).json({
        message: 'Card not found'
      })
    }
    await card.delete()
    return {
      message: 'Deleted successfully'
    }
  }
}
