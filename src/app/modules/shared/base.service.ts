import { BaseEntity, DeleteResult, Repository } from 'typeorm';
import { IBaseService } from './i.base.service';
import { EntityId } from 'typeorm/repository/EntityId';
import { NotFoundException } from '@nestjs/common';

export class BaseService<T extends BaseEntity, R extends Repository<T>>
  implements IBaseService<T>
{
  protected readonly repository: R;

  constructor(repository: R) {
    this.repository = repository;
  }

  findAll(): Promise<T[]> {
    return this.repository.find();
  }

  findById(id: EntityId): Promise<T> {
    return this.repository.findOne(id);
  }

  async findOrFailById(id: EntityId) {
    const entity = await this.findById(id);
    if (!entity) {
      throw new NotFoundException();
    }

    return entity;
  }

  store(payload: any): Promise<T> {
    return this.repository.save(payload);
  }

  async update(id: EntityId, payload: any): Promise<T> {
    await this.repository.update(id, payload);
    return this.findById(id);
  }

  delete(id: EntityId): Promise<DeleteResult> {
    return this.repository.delete(id);
  }
}
