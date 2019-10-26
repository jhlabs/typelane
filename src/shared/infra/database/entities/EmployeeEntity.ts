import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Employee {
  @PrimaryColumn()
  public id: number;

  @Column("varchar", { length: 200 })
  public firstName: string;

  @Column("varchar", { length: 200 })
  public lastName: string;

  @Column("varchar", { length: 200 })
  public email: string;

  @Column("varchar", { length: 20 })
  public gender: string;

  @Column("varchar", { length: 200 })
  public language: string;

  @Column("varchar", { length: 200 })
  public office: string;

  @Column("varchar", { length: 200 })
  public division: string;

  @Column("float")
  public progress: number;

  @Column()
  public isAdmin: boolean;

  @Column("timestamp")
  public createdAt: string;
}
