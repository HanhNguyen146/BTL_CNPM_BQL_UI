import { existsSync, readFileSync, writeFileSync } from 'fs';
import path from 'path';

const dataDir = path.join(process.cwd(), 'data');

export function readDb<T>(name: string): T[] {
  const filePath = path.join(dataDir, `${name}.json`);
  if (!existsSync(filePath)) return [];
  return JSON.parse(readFileSync(filePath, 'utf-8')) as T[];
}

export function writeDb<T>(name: string, data: T[]): void {
  const filePath = path.join(dataDir, `${name}.json`);
  writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
}
