import { Answer } from 'src/answers/entities/answer.entity';
import { Profile } from 'src/profile/entities/profile.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

@Entity()
export class Question {
  @PrimaryGeneratedColumn()
  public id!: number;

  @ManyToOne(() => Profile, (profile) => profile.questions)
  public profile!: Profile;

  @Column({ type: 'varchar', length: 180, nullable: true })
  public title: string;

  @Column({ type: 'varchar', length: 300 })
  public question: string;

  @OneToMany(() => Answer, (answer) => answer.question)
  @JoinColumn()
  public answers: Answer[];

  /*
   * Create and Update Date Columns
   */

  @CreateDateColumn({ type: 'timestamp' })
  public createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  public updatedAt!: Date;
}
