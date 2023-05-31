import { InjectionToken } from '@angular/core';
import Rollbar from 'rollbar';

const rollbarConfig: Rollbar.Configuration = {
  accessToken: 'e573c2a5268b48f297b0ed00b40f111e',
  captureUncaught: true,
  captureUnhandledRejections: true,
  autoInstrument: true,
};

export function rollbarFactory() {
  return new Rollbar(rollbarConfig);
}

export const RollbarService = new InjectionToken<Rollbar>('rollbar');
