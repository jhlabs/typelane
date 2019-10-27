import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn
} from "typeorm";

@Entity()
export class Employee {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column("varchar", { length: 200 })
  public first_name: string;

  @Column("varchar", { length: 200 })
  public last_name: string;

  @Column("varchar", { length: 200 })
  public email: string;

  @Column("varchar", { length: 20 })
  public gender: string;

  @CreateDateColumn()
  public created_at: string;

  @Column("varchar", { length: 200 })
  public language: string;

  @Column("varchar", { length: 200 })
  public office: string;

  @Column("varchar", { length: 200 })
  public division: string;

  @Column("float")
  public progress: number;

  @Column()
  public is_admin: boolean;
}
