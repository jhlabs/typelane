import { SelectQueryBuilder } from "typeorm";
import { OrderBy } from "../constants/enum";

function filterQuery<T>(
  queries: { [key: string]: string | boolean | undefined },
  query: SelectQueryBuilder<T>,
  table: string
) {
  const filteredQuery: SelectQueryBuilder<T> = Object.assign(query);
  Object.keys(queries).map(field => {
    if (queries[field]) {
      filteredQuery.andWhere(`LOWER(${table}.${field}) = LOWER(:${field})`, {
        [field]: queries[field]
      });
    }
  });
  return filteredQuery;
}

function sortQuery<T>(
  key: string = "created_at",
  orderBy: OrderBy = OrderBy.desc,
  query: SelectQueryBuilder<T>
) {
  return query.orderBy(key, orderBy);
}

function filterCreatedAfterDate<T>(
  date: Date,
  query: SelectQueryBuilder<T>,
  table: string
) {
  return query.where(`${table}.created_at >= :date`, { date });
}

export { filterQuery, sortQuery, filterCreatedAfterDate };
