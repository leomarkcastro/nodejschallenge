import { Answer } from 'src/answers/entities/answer.entity';
import { Question } from 'src/questions/entities/question.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  JoinColumn,
  OneToOne,
  Column,
} from 'typeorm';

@Entity()
export class Profile {
  @PrimaryGeneratedColumn()
  public id!: number;

  @OneToOne(() => User, (user) => user.profile)
  @JoinColumn()
  public user!: User;

  @Column({ type: 'varchar', length: 100 })
  public name: string;

  @OneToMany(() => Question, (question) => question.profile)
  public questions!: Question[];

  @OneToMany(() => Answer, (answer) => answer.profile)
  public answers!: Answer[];

  @CreateDateColumn({ type: 'timestamp' })
  public createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  public updatedAt!: Date;
}
