function getInt(value: string) {
  const num = parseInt(value);
  if (isNaN(num)) throw new Error(`${value} is not an int`);
  return num;
}

function checkEnvVariable(name: string, value: string) {
  if (value.length === 0) throw new Error(`${name} must be specified`);
  return value;
}

export function parseEnv() {
  const DB_HOST = checkEnvVariable('DB_HOST', process.env.DB_HOST);
  const DB_PORT = getInt(checkEnvVariable('DB_PORT', process.env.DB_PORT));
  const DB_NAME = checkEnvVariable('DB_NAME', process.env.DB_NAME);
  const DB_USERNAME = checkEnvVariable('DB_USERNAME', process.env.DB_USERNAME);
  const DB_PASSWORD = checkEnvVariable('DB_PASSWORD', process.env.DB_PASSWORD);

  return {
    db: {
      host: DB_HOST,
      port: DB_PORT,
      name: DB_NAME,
      username: DB_USERNAME,
      password: DB_PASSWORD,
    },
  };
}
