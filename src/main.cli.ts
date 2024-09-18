#!/usr/bin/env node
import {CLIApplication, Help, Version} from './cli/index.js';
import {Import} from './cli/commands/import.command.js';

function bootstrap(): void {
  const cliApplication = new CLIApplication();
  cliApplication.registerCommands([
    new Help(),
    new Version(),
    new Import()
  ]);

  cliApplication.processCommand(process.argv);
}

bootstrap();
