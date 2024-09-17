import chalk from 'chalk';
import {Command} from '../../shared/interfaces/command.interface.js';

export class Help implements Command {
  public async execute(..._params: string[]): Promise<void> {
    console.info(`
      ${chalk.bold('Программа для подготовки данных для REST API сервера.')}

      ${chalk.underline('Пример:')} ${chalk.blue('cli.js --<command> [--arguments]')}

      ${chalk.underline('Команды:')}

       ${chalk.green('--version:                   # выводит номер версии')}
       ${chalk.yellow('--help:                      # печатает этот текст')}
       ${chalk.blue('--import <path>:             # импортирует данные из TSV')}
    `);
  }

  public getName(): string {
    return '--help';
  }
}
