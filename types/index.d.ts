declare namespace NodeJS {
  interface ProcessEnv {
    NX_PORT: string;
    NX_API_PROTOCOL: string;
    NX_API_HOST: string;
    NX_API_PREFIX: string;
  }
}
