import {
  IsBoolean,
  IsDate,
  IsEnum,
  IsOptional,
  IsString
} from "class-validator";
import { Gender, OrderBy } from "../../shared/constants/enum";

export class GetAllEmployeesQueryParams {
  @IsString()
  @IsOptional()
  public language?: string;

  @IsOptional()
  @IsString()
  public office?: string;

  @IsOptional()
  @IsString()
  public division?: string;

  @IsOptional()
  @IsEnum(Gender)
  public gender?: Gender;

  @IsOptional()
  @IsBoolean()
  public is_admin?: boolean;

  @IsOptional()
  @IsString()
  public sortBy?: string;

  @IsOptional()
  @IsEnum(OrderBy)
  public orderBy?: OrderBy;

  @IsOptional()
  @IsDate()
  public createdAfter?: Date;
}
