import fs from 'fs';
import path from 'path';

const createUserPath = path.join(__dirname, 'createUser.md');

export const createUser = fs.readFileSync(createUserPath).toString();

