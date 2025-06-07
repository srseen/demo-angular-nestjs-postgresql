import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EquipmentEntity } from './equipment.entity/equipment.entity';
import { EquipmentController } from './equipment.controller';
import { EquipmentService } from './equipment.service';

@Module({
  imports: [TypeOrmModule.forFeature([EquipmentEntity])],
  controllers: [EquipmentController],
  providers: [EquipmentService],
})
export class EquipmentModule {}
