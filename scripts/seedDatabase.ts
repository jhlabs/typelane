import parse from "csv-parse/lib/sync";
import dotenv from "dotenv";
dotenv.config();
import fs from "fs";
import { Connection, getConnection } from "typeorm";
import { connectionFactory } from "../src/shared/infra/database/createConnection";

function loadCSVFile(fileName: string): string | undefined {
  try {
    const file: string = fs.readFileSync(`./seed-data/${fileName}.csv`, "utf8");
    return file;
  } catch (err) {
    console.log("Error loading CSV file", err);
  }
}

function removeEmptyStrings(text: string): string {
  return text.replace(/,,/g, ",0,");
}

function parseCSVFile(file: string): any[] {
  let tableRows: any[] = [];
  tableRows = parse(file, {
    cast: true,
    cast_date: true,
    columns: true,
    quote: false,
    trim: true,
    relax: true
  });
  return tableRows;
}

async function writeToDatabase(
  connect: () => Connection,
  dbRow: any
): Promise<void> {
  const connection = connect();
  try {
    await connection
      .createQueryBuilder()
      .insert()
      .into("employee")
      .values(dbRow)
      .execute();
  } catch (err) {
    console.log(err);
  }
}

connectionFactory(() => {
  const CSVString = loadCSVFile("MOCK_DATA");

  if (CSVString) {
    const sanitizedCSV = removeEmptyStrings(CSVString);
    console.log(sanitizedCSV);
    const parsedCSV = parseCSVFile(sanitizedCSV);
    console.log(parsedCSV);
    parsedCSV.forEach(async (item: any) => {
      writeToDatabase(getConnection, item);
    });
  }

  return;
});
