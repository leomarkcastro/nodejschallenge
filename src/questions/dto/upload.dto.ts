import { IsNotEmpty, IsString } from 'class-validator';

export class UploadDto {
  @IsString()
  @IsNotEmpty()
  public title: string;

  @IsString()
  public question: string;
}
