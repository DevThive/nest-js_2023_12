import { Show } from 'src/show/entities/show.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class Seat {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 2 })
  row: string;

  @Column({ type: 'int' })
  number: number;

  @Column({ type: 'boolean', default: false })
  isReserved: boolean;

  @ManyToOne(() => Show, (show) => show.seats)
  show: Show;
}
