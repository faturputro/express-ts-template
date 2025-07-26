import { Model } from 'sequelize-typescript'
import { ModelDTO } from './model'
import { BaseQueryParams, Paginated } from './query'

export interface IBaseModelService<T extends Model> {
  getAll(params: BaseQueryParams): Promise<Paginated<T>>
  getDetail?: (id: number) => Promise<T>
  create(dto: ModelDTO<T>): Promise<T>
  update(dto: ModelDTO<T>): Promise<void>
  delete(id: number): Promise<void>
}
