import { Show } from 'src/show/entities/show.entity';
import { showDate } from 'src/show/entities/showtime.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Seat } from './seat.entity';

@Entity({
  name: 'reservation',
})
export class Reservation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int', nullable: false })
  showid: number;

  @Column({ type: 'varchar', nullable: false })
  showtitle: string;

  @Column({ type: 'varchar', nullable: false })
  username: string;

  @Column({ type: 'varchar', nullable: false })
  reservationname: string;

  @Column({ type: 'varchar', nullable: false })
  venue: string;

  @Column({ type: 'int', nullable: false })
  seatid: number;

  // @OneToMany(() => Seat, (seat) => seat.reservation)
  // seats: Seat;

  @OneToMany(() => showDate, (showdate) => showdate.reservation)
  showdate: showDate[];

  @ManyToOne(() => Show, (show) => show.reservation)
  show: Show;
}
