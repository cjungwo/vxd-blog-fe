import { setupServer } from 'msw/node';
import { mswHandler } from './handlers';

export const mockServer = setupServer(...mswHandler);