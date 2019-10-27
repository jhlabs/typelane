import {
  BodyParam,
  Get,
  JsonController,
  Post,
  QueryParam
} from "routing-controllers";
import {
  getConnection,
  Repository,
  SelectQueryBuilder,
  AdvancedConsoleLogger
} from "typeorm";
import { Employee } from "../entities";
import { OrderBy } from "../shared/constants/enum";
import {
  filterCreatedAfterDate,
  filterQuery,
  sortQuery
} from "../shared/util/queryOperations";

@JsonController()
export class EmployeeController {
  private repository: Repository<Employee>;
  constructor() {
    const connection = getConnection();
    this.repository = connection.getRepository(Employee);
  }
  @Get("/employees")
  public getAll(
    @QueryParam("language") language?: string,
    @QueryParam("office") office?: string,
    @QueryParam("division") division?: string,
    @QueryParam("gender") gender?: string,
    @QueryParam("is_admin") is_admin?: boolean,
    @QueryParam("sort_by") sortBy?: string,
    @QueryParam("order_by") orderBy?: OrderBy,
    @QueryParam("created_after") createdAfter?: Date
  ) {
    const queryBuilder = this.repository.createQueryBuilder("employee");
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
  public async saveEmployee(
    @BodyParam("first_name") first_name: string,
    @BodyParam("last_name") last_name: string,
    @BodyParam("gender") gender: string,
    @BodyParam("language") language: string,
    @BodyParam("office") office: string,
    @BodyParam("division") division: string,
    @BodyParam("is_admin") is_admin: boolean,
    @BodyParam("email") email?: string,
    @BodyParam("progress") progress?: number
  ) {
    const queryBuilder = this.repository.createQueryBuilder("employee");
    if (!email) {
      email = "";
    }

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
