import { IsNotEmpty, IsString } from 'class-validator';

export class CreateAnswerDto {
  @IsString()
  @IsNotEmpty()
  public question: string;

  @IsString()
  public answer: string;
}
