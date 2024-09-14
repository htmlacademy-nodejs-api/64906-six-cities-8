import {Command} from '../../shared/interfaces/command.interface.js';
import {TsvFileReader} from '../../shared/libs/file-reader/index.js';

export class Import implements Command {
  public execute(...params: string[]): void {
    const [filename] = params;
    const fileReader = new TsvFileReader(filename.trim());

    try {
      fileReader.read();
      console.log(fileReader.toArray());
    } catch (error: unknown) {
      if (!(error instanceof Error)) {
        throw error;
      }

      console.error(`Ошибка импорта из файла ${filename}`);
      console.error(`Детали ошибки: ${error.message}`);
    }
  }

  public getName(): string {
    return '--import';
  }
}
