import path from 'path';
import { FormController } from './controllers/form-controller';
import { createServer } from './tenon-node-framework';


const bootstrap = async () => {
  const server = await createServer({
    server: {
      port: 9987,
    },
    controllers: [
      FormController,
    ],
    services: [
    ],
    session: {
      key: 'yoqi:ssid',
      sameSite: true,
      maxAge: 6 * 3600 * 1000,
    },
    logger: {
      path: path.resolve(__dirname, "./log"),
    },

    bodyParser: {
      jsonLimit: '20mb'
    }
  });
  server.start();
}

bootstrap();