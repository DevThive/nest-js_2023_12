import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Show } from './show.entity';
import { Exclude } from 'class-transformer';

@Entity({
  name: 'dateAndTime',
})
export class showDate {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  date: string;

  @ManyToOne(() => Show, (show) => show.showDate, {
    onDelete: 'CASCADE',
  })
  @Exclude({ toPlainOnly: true })
  show: Show;
}
