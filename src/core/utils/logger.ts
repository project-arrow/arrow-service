export class Logger {
  private static isDev: boolean;

  constructor() {
    Logger.isDev = process.env.NODE_ENV === 'development';
  }

  static info(msg: string): void {
    if (!this.isDev) return;
    console.info(msg);
  }

  static error(msg: string): void {
    if (!this.isDev) return;
    console.error(msg);
  }

  static warn(msg: string): void {
    if (!this.isDev) return;
    console.warn(msg);
  }

  static debug(msg: string): void {
    if (!this.isDev) return;
    console.debug(msg);
  }
}
