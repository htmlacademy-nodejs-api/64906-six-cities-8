import {readFileSync} from 'node:fs';
import {resolve} from 'node:path';
import {Command} from '../../shared/interfaces/command.interface.js';

type PackageJSONConfig = {
  version: string;
}

export class Version implements Command {
  constructor(private filePath: string = 'package.json') {}

  public async execute(..._params: string[]): Promise<void> {
    try {
      const version: string = this.readVersion();
      console.info(`Текущая версия: ${version}`);

    } catch (err: unknown) {
      console.error(`Не могу прочитать версию из файла ${this.filePath}`);

      if (err instanceof Error) {
        console.error(err.message);
      }
    }
  }

  public getName(): string {
    return '--version';
  }

  private isPackageJSONConfig(value: unknown): value is PackageJSONConfig {
    return (typeof value === 'object' && value !== null && !Array.isArray(value) && Object.hasOwn(value, 'version'));
  }

  private readVersion(): string {
    const serializedContent: string = readFileSync(resolve(this.filePath), { encoding: 'utf-8' });
    const importedContent: unknown = JSON.parse(serializedContent);

    if (!this.isPackageJSONConfig(importedContent)) {
      throw new Error('Ошибка парсинга JSON');
    }

    return importedContent.version;
  }
}
