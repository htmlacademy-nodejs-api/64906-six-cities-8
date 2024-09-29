import got from 'got';
import { Command } from '../../shared/interfaces/command.interface.js';
import { MockServerData } from '../../shared/types/mock-server-data.type.js';
import { TsvOfferGenerator } from '../../shared/libs/offer-generator/tsv-offer-generator.js';
import { appendFile } from 'node:fs/promises';
import { TsvFileWriter } from '../../shared/libs/file-writer/file-writer.js';
import { getErrorMessage } from '../../shared/helpers/common.js';

export class Generate implements Command {
  private initialData!: MockServerData;

  private async load(url: string) {
    try {
      this.initialData = await got.get(url).json();
    } catch {
      throw new Error(`Не могу получить данные с адреса ${url}`);
    }
  }

  private async write(filepath: string, offerCount: number) {
    const tsvOfferGenerator = new TsvOfferGenerator(this.initialData);
    const tsvFileWriter = new TsvFileWriter(filepath);

    for (let i = 0; i < offerCount; i++) {
      await tsvFileWriter.write(tsvOfferGenerator.generate());
    }
  }

  public getName(): string {
    return '--generate';
  }

  public async execute(...params: string[]): Promise<void> {
    const [count, filepath, url] = params;
    const offerCount = Number.parseInt(count, 10);

    try {
      await this.load(url);
      await this.write(filepath, offerCount);
      console.info(`Файл ${filepath} успешно создан!`);
    } catch (error: unknown) {
      console.error(`Не могу сгенерировать данные ${error}`);
      console.error(getErrorMessage(error));
    }
  }
}
