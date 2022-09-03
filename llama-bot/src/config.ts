import { config } from "dotenv";

export interface ILlamaConfig {
  DATABASE_URL: string;
  NODE_ENV: string;
  DISCORD_TOKEN: string;
  TTV_CLIENT_ID: string;
  TTV_CLIENT_SECRET: string;
}

export class LlamaConfig {
  constructor(
    private _nodeEnv: string = "",
    private _databaseUrl: string = "",
    private _discordToken: string = ""
  ) {}

  get isProd(): boolean {
    return this._nodeEnv === "production";
  }

  get databaseUrl(): string {
    return this._databaseUrl;
  }

  get discordToken(): string {
    return this._discordToken;
  }
}

const parsedConfig: ILlamaConfig = {} as ILlamaConfig;
try {
  const dotEnvConfigOutput = config();

  parsedConfig.NODE_ENV =
    process.env.NODE_ENV || dotEnvConfigOutput.parsed?.NODE_ENV || "";
  parsedConfig.DATABASE_URL =
    process.env.DATABASE_URL || dotEnvConfigOutput.parsed?.DATABASE_URL || "";
  parsedConfig.DISCORD_TOKEN =
    process.env.DISCORD_TOKEN || dotEnvConfigOutput.parsed?.DISCORD_TOKEN || "";

  const missingConfigs = Object.values(parsedConfig).filter((val) => !val);
  if (missingConfigs.length) {
    throw new Error(
      "Provide config for keys:\n" +
        Object.keys(parsedConfig).reduce((keys, key) => keys + key + ",", "")
    );
  }
} catch (error) {
  throw Error(
    "Unexpected error while reading .env\nPlease provide .env config or set environment variables"
  );
}

const AppConfig: LlamaConfig = new LlamaConfig(
  parsedConfig.NODE_ENV,
  parsedConfig.DATABASE_URL,
  parsedConfig.DISCORD_TOKEN
);

export default AppConfig;
