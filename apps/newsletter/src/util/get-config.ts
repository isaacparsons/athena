import path from 'path'
const configPath = path.join(__dirname, '..', '..', '..', '..', 'config')
process.env["NODE_CONFIG_DIR"] = configPath
import config from 'config'
import { Config } from '../types/types';

export function getConfig(): Config {
  return {
    app: config.util.toObject(config.get('app')),
    db: config.util.toObject(config.get('db')),
    google: config.util.toObject(config.get('google')),
    gcs: config.util.toObject(config.get('gcs')),
    client: config.util.toObject(config.get('client')),
  }
}