import { MyDurableObject } from '.';

type Env = {
  MY_DURABLE_OBJECT: DurableObjectNamespace<MyDurableObject>;
};

declare module 'cloudflare:test' {
  interface ProvidedEnv extends Env {}
}
