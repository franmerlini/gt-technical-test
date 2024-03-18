export const databaseConfig = () => ({
  db: {
    type: 'postgres' as const,
    host: process.env.NX_DB_HOST,
    port: parseInt(process.env.NX_DB_PORT),
    username: process.env.NX_DB_USER,
    password: process.env.NX_DB_PASSWORD,
    database: process.env.NX_DB_DATABASE,
  },
});
