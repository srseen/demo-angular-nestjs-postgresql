import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EquipmentEntity } from '../equipment/equipment.entity/equipment.entity';

@Injectable()
export class EquipmentService {
  constructor(
    @InjectRepository(EquipmentEntity)
    private equipmentRepo: Repository<EquipmentEntity>,
  ) {}

  create(data: Partial<EquipmentEntity>) {
    return this.equipmentRepo.save(data);
  }

  findAll() {
    return this.equipmentRepo.find();
  }

  findOne(id: number) {
    return this.equipmentRepo.findOneBy({ id });
  }

  update(id: number, data: Partial<EquipmentEntity>) {
    return this.equipmentRepo.update(id, data);
  }

  delete(id: number) {
    return this.equipmentRepo.delete(id);
  }
}
