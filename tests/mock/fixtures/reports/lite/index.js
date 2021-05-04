import fs from 'fs';
import path from 'path';

const createUserPath = path.join(__dirname, 'createUser.md');

// eslint-disable-next-line no-sync
export const createUser = fs.readFileSync(createUserPath).toString();

