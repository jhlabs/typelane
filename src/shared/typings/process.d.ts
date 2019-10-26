declare namespace NodeJS {
  export interface ProcessEnv {
    DB_HOST: string;
    DB_PORT: string;
    DB_USERNAME: string;
    DB_PASSWORD: string;
    DB_DATABASE_NAME: string;
    DB_ENTITIES_LOCATION: string;
    DB_MIGRATIONS_LOCATION: string;
  }
}
