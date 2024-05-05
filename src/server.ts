import app from '@/app';
import http from 'http';
import { env } from '@/utils/env';

export function createHttpServer(port = env.PORT) {
  const httpServer: http.Server = app.listen(port, () =>
    console.log(`Sever is running on http://localhost:${port}/`),
  );

  return httpServer;
}

if (require.main === module) {
  createHttpServer();
}

export default createHttpServer;
