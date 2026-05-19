import fs from 'fs'
import path from 'path'

const DATA_DIR = path.join(process.cwd(), 'src', 'data')

export function readData<T>(filename: string): T {
  const file = path.join(DATA_DIR, filename)
  return JSON.parse(fs.readFileSync(file, 'utf-8')) as T
}

export function writeData(filename: string, data: unknown): void {
  const file = path.join(DATA_DIR, filename)
  fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf-8')
}
