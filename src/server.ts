import app from "@/app"
import { PORT_ENV } from "@/utils/env";
import http from 'http';

export function createHttpServer(port = PORT_ENV) {
  const httpServer: http.Server = app.listen(port, () => console.log(`Sever is running on http://localhost:${port}/`))

  return httpServer;
}

if (require.main === module) {
  createHttpServer();
}

export default createHttpServer;