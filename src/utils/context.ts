import { ContextKey } from '@/types/enums';
import { AsyncLocalStorage } from 'node:async_hooks';

const store = new Map<ContextKey, unknown>();
const als = new AsyncLocalStorage();
als.enterWith(store);

export default als.getStore() as Map<ContextKey, unknown>;
