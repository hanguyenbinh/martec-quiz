import { readFileSync } from "fs";
import { join } from "path";
import { DataSource } from "typeorm";
import * as yaml from "js-yaml";

let yamlConfigFileName = 'config.yaml';
if (process.env.NODE_ENV == 'production') {
    yamlConfigFileName = 'config.production.yaml';
}

if (process.env.NODE_ENV == 'staging') {
    yamlConfigFileName = 'config.staging.yaml';
}

let config:any = yaml.load(
    readFileSync(join(__dirname, yamlConfigFileName), 'utf8'),
);
export default new DataSource( config.database);