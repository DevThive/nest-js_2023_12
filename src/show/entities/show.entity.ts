// import { User } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  //   ManyToOne,
  OneToMany,
  //   OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { showDate } from './showtime.entity';
import { Reservation } from 'src/reservation/entity/reservation.entity';

@Entity({
  name: 'shows',
})
export class Show {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100, nullable: false })
  title: string;

  //   @OneToMany(() => ShowDate, (showDate) => showDate.date)
  //   showDate: ShowDate[];

  //   @Column({
  //     type: 'text',
  //     nullable: false,
  //     transformer: {
  //       to: (value: Date[]) => value.map((date) => date.toDateString()),
  //       from: (value: string[]) =>
  //         value.map((dateString) => new Date(dateString)),
  //     },
  //   })
  //   dateAndTime: Date[];

  @OneToMany(() => showDate, (showdate) => showdate.show, {
    cascade: true,
  })
  showDate: showDate[];

  @Column({ type: 'varchar', length: 100, nullable: false })
  venue: string;

  @Column({ type: 'varchar', nullable: false })
  creator: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  price: number;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  image: string;

  @OneToMany(() => Reservation, (reservat) => reservat.show)
  reservation: Reservation[];

  @Column({ type: 'varchar', nullable: false })
  category: string;

  @Column({ type: 'varchar', default: 'Res_poss' })
  state: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt?: Date;
}
