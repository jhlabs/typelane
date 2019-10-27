import { Get, JsonController, QueryParam } from "routing-controllers";
import { getConnection, Repository, SelectQueryBuilder } from "typeorm";
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
    @QueryParam("isAdmin") isAdmin?: boolean,
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
      isAdmin
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
}
