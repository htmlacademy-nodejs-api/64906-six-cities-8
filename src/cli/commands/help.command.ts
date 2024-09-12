import {Command} from '../../shared/interfaces/command.interface.js';

export class Help implements Command {
  public async execute(..._params: string[]): Promise<void> {
    console.info(`
      Программа для подготовки данных для REST API сервера.

      Пример: cli.js --<command> [--arguments]

      Команды:

       --version:                   # выводит номер версии
       --help:                      # печатает этот текст
       --import <path>:             # импортирует данные из TSV
       --generate <n> <path> <url>  # генерирует произвольное количество тестовых данных
    `);
  }

  public getName(): string {
    return '--help';
  }
}
