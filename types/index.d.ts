declare namespace NodeJS {
  interface ProcessEnv {
    // App
    NX_PORT: string;
    NX_API_PROTOCOL: string;
    NX_API_HOST: string;
    NX_API_PREFIX: string;

    // DB
    NX_DB_HOST: string;
    NX_DB_PORT: string;
    NX_DB_USERNAME: string;
    NX_DB_PASSWORD: string;
    NX_DB_NAME: string;
  }
}
