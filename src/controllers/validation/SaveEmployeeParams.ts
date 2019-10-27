import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString
} from "class-validator";
import { Gender } from "../../shared/constants/enum";

export class SaveEmployeeParams {
  @IsString()
  public first_name: string;

  @IsString()
  public last_name: string;

  @IsEnum(Gender)
  public gender: Gender;

  @IsString()
  public language: string;

  @IsString()
  public office: string;

  @IsString()
  public division: string;

  @IsBoolean()
  public is_admin: boolean;

  @IsOptional()
  @IsEmail()
  public email?: string;

  @IsOptional()
  @IsNumber()
  public progress?: number;
}
