import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Category from 'App/Models/Category'

export default class CategorySeeder extends BaseSeeder {
  public async run () {
    await Category.createMany([
      {
        name: 'Абітурієнтам',
        description: 'Дискусії про вступ, необхідні документи та вибір спеціальності',
        tag: 'abit'
      },
      {
        name: 'Студентам',
        description: 'Обговорення навчання та студентського життя',
        tag: 'stud'
      },
      {
        name: 'Дипломна робота',
        description: 'Все про отримання диплому, переддипломне проектування',
        tag: 'duplom'
      },
      {
        name: 'Інше',
        description: 'Спілкування по іншим темам кафедри',
        tag: 'other'
      }
    ])
  }
}
