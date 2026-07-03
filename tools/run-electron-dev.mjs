import { spawn } from 'node:child_process';
import electronPath from 'electron';

function appendNodeOption(currentValue, option) {
  return currentValue?.trim() ? `${currentValue} ${option}` : option;
}

const child = spawn(electronPath, ['electron/main.ts'], {
  stdio: 'inherit',
  env: {
    ...process.env,
    NODE_OPTIONS: appendNodeOption(process.env.NODE_OPTIONS, '--import tsx'),
  },
});

child.on('exit', (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
    return;
  }

  process.exit(code ?? 0);
});

child.on('error', (error) => {
  console.error(error);
  process.exit(1);
});
