import chalk from 'chalk';
import {Command} from '../../shared/interfaces/command.interface.js';
import {TsvFileReader} from '../../shared/libs/file-reader/index.js';
import { Offer } from '../../shared/types/offer.type.js';
import { getErrorMessage } from '../../shared/helpers/common.js';

export class Import implements Command {
  private onImportedOffer(offer: Offer): void {
    console.info(offer);
  }

  private onCompleteImport(count: number) {
    console.info(`${count} строк импортировано.`);
  }

  public async execute(...params: string[]): Promise<void> {
    const [filename] = params;
    const fileReader = new TsvFileReader(filename.trim());

    fileReader.on('line', this.onImportedOffer);
    fileReader.on('end', this.onCompleteImport);


    try {
      fileReader.read();
    } catch (error: unknown) {
      if (!(error instanceof Error)) {
        throw error;
      }

      console.error(chalk.red.underline(`Ошибка импорта из файла ${filename}`));
      console.error(chalk.red.underline(getErrorMessage));
    }
  }

  public getName(): string {
    return '--import';
  }
}
