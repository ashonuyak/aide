import { readFileSync } from 'node:fs';

import { Version } from './utils/version';

const { version } = JSON.parse(readFileSync('./package.json', 'utf8'));

export const SERVER_VERSION = Version.fromString(version);

export const IS_DEV = process.env.NODE_ENV !== 'production';

export const WEB_ROOT = process.env.AIDE_WEB_ROOT || '/usr/src/app/www';

export const HOST = process.env.HOST;

export const SERVER_PORT = process.env.SERVER_PORT || 3001;
