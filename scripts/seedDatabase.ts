import parse from "csv-parse/lib/sync";
import dotenv from "dotenv";
dotenv.config();
import fs from "fs";
import { Connection, getConnection } from "typeorm";
import { connectionFactory } from "../src/database/createConnection";

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

async function clearTable(connect: () => Connection) {
  const connection = connect();
  try {
    await connection.query("DELETE from employee;");
    // await connection.query("ALTER SEQUENCE employee_id_seq RESTART 1;");
  } catch (err) {
    console.log(err);
  }
}

async function setSequence(connect: () => Connection) {
  const connection = connect();
  try {
    await connection.query("ALTER SEQUENCE employee_id_seq RESTART 1001;");
  } catch (err) {
    console.log(err);
  }
}

connectionFactory(() => {
  const CSVString = loadCSVFile("MOCK_DATA");
  clearTable(getConnection);
  if (CSVString) {
    const sanitizedCSV = removeEmptyStrings(CSVString);
    const parsedCSV = parseCSVFile(sanitizedCSV);

    parsedCSV.forEach(async (item: any) => {
      writeToDatabase(getConnection, item);
    });
    // setSequence(getConnection);
  }

  return;
});
