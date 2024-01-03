import { Show } from 'src/show/entities/show.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Reservation } from './reservation.entity';
import { User } from 'src/user/entities/user.entity';

@Entity()
export class Seat {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  setnum: number;

  @Column({ type: 'boolean', default: false })
  isReserved: boolean;

  @Column({ type: 'int' })
  showid: number;

  // @OneToMany(() => Reservation, (reservation) => reservation.seats)
  // reservation: Reservation;

  @ManyToOne(() => User, (user) => user.reserv)
  reserv: User;

  // @ManyToOne(() => Show, (show) => show.seats)
  // show: Show;
}
