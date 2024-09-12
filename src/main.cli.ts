#!/usr/bin/env node
import {CLIApplication, Help, Version} from './cli/index.js';

function bootstrap(): void {
  const cliApplication = new CLIApplication();
  cliApplication.registerCommands([new Help(), new Version()]);

  cliApplication.processCommand(process.argv);
}

bootstrap();
