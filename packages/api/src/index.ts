import { CompositionRoot } from '@efuller/api/src/shared/composition/compositionRoot';

const compositionRoot = new CompositionRoot();
const apiServer = compositionRoot.getApiServer();

async function bootstrap() {
  await apiServer.start();
}

bootstrap();