import {
  Body,
  Get,
  JsonController,
  Post,
  QueryParams
} from "routing-controllers";
import { getConnection, Repository } from "typeorm";
import { Employee } from "../entities";
import {
  filterCreatedAfterDate,
  filterQuery,
  sortQuery
} from "../shared/util/queryOperations";
import { GetAllEmployeesQueryParams } from "./validation/GetAllEmployeesQueryParams";
import { SaveEmployeeParams } from "./validation/SaveEmployeeParams";

@JsonController()
export class EmployeeController {
  private repository: Repository<Employee>;
  constructor() {
    const connection = getConnection();
    this.repository = connection.getRepository(Employee);
  }
  @Get("/employees")
  public getAll(@QueryParams() query: GetAllEmployeesQueryParams) {
    const queryBuilder = this.repository.createQueryBuilder("employee");
    const {
      language,
      office,
      division,
      gender,
      is_admin,
      sortBy,
      orderBy,
      createdAfter
    } = query;
    const queries = {
      language,
      office,
      division,
      gender,
      is_admin
    };
    const filteredQuery = filterQuery<Employee>(
      queries,
      queryBuilder,
      "employee"
    );
    const sortedQuery = sortQuery<Employee>(sortBy, orderBy, filteredQuery);

    if (createdAfter) {
      const filteredByDate = filterCreatedAfterDate(
        createdAfter,
        sortedQuery,
        "employee"
      );
      return filteredByDate.getMany();
    }
    return sortedQuery.getMany();
  }

  @Post("/employees")
  public async saveEmployee(@Body() employeeInput: SaveEmployeeParams) {
    const queryBuilder = this.repository.createQueryBuilder("employee");
    const {
      first_name,
      last_name,
      gender,
      language,
      office,
      division,
      is_admin
    } = employeeInput;

    let email = employeeInput.email;
    if (!email) {
      email = "";
    }

    let progress = employeeInput.progress;
    if (!progress) {
      progress = 0;
    }
    let employee = null;
    try {
      employee = await queryBuilder
        .insert()
        .into(Employee)
        .values([
          {
            first_name,
            last_name,
            gender,
            language,
            office,
            division,
            is_admin,
            email,
            progress
          }
        ])
        .execute();
    } catch (err) {
      console.log(err);
    }
    if (employee) {
      return employee.raw[0];
    }
    return null;
  }
}
