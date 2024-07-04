import { CompositionRoot } from '@efuller/api/src/shared/composition/compositionRoot';

async function bootstrap() {
  const compositionRoot = await CompositionRoot.create();
  const apiServer = compositionRoot.getApiServer();

  await apiServer.start()
    .catch((err) => {
      console.error('Server Start: ', err);
    });
}

bootstrap();