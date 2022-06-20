import { Profile } from 'src/profile/entities/profile.entity';
import { Question } from 'src/questions/entities/question.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';

@Entity()
export class Answer {
  @PrimaryGeneratedColumn()
  public id!: number;

  @ManyToOne(() => Profile, (profile) => profile.answers)
  public profile!: Profile;

  @ManyToOne(() => Question, (question) => question.id, { onDelete: 'CASCADE' })
  public question!: Question;

  @Column({ type: 'varchar', length: 1000 })
  public answer: string;

  /*
   * Create and Update Date Columns
   */

  @CreateDateColumn({ type: 'timestamp' })
  public createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  public updatedAt!: Date;
}
