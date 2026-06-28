import * as fs from 'fs'
import * as path from 'path'

export type FixtureType = 'golden' | 'invalid' | 'edge-cases'

// Loads contract fixtures from the standardized file system structure.
export class FixtureLoader {
  constructor(private readonly basePath: string) {}

  public loadFixture<T>(contractName: string, type: FixtureType, fileName: string): T {
    const targetPath = path.join(this.basePath, contractName, type, `${fileName}.json`)

    if (!fs.existsSync(targetPath)) {
      throw new Error(`Fixture not found: ${targetPath}`)
    }

    const rawData = fs.readFileSync(targetPath, 'utf-8')
    return JSON.parse(rawData) as T
  }

  public getGolden<T>(contractName: string, fileName = 'default'): T {
    return this.loadFixture<T>(contractName, 'golden', fileName)
  }

  public getInvalid<T>(contractName: string, fileName: string): T {
    return this.loadFixture<T>(contractName, 'invalid', fileName)
  }

  public getEdgeCase<T>(contractName: string, fileName: string): T {
    return this.loadFixture<T>(contractName, 'edge-cases', fileName)
  }
}
