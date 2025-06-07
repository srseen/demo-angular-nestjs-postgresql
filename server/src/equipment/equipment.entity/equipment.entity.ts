import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class EquipmentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column()
  quantity: number;

  @Column({ type: 'date' })
  purchaseDate: string;
}
