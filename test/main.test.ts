import createHttpServer from '@/server';
import { API_TOKEN_ENV } from '@/utils/env';
import { IncomingMessage, Server, ServerResponse } from 'http';
import { agent } from 'supertest';

const httpServer: Server<typeof IncomingMessage, typeof ServerResponse> = createHttpServer("5101");

afterAll(done => {
  httpServer.close(done);
});

const request = agent(httpServer);

describe('app', () => {

  it('should return a successful response for GET /', async () => {
    return request.get('/').set("Authorization", `Bearer ${API_TOKEN_ENV}`).expect(200)
  });

  it("should return a reject response for GET /", async () => {
    const res = await request.get('/').expect(401)
    expect(res.body).toStrictEqual({ error: { customError: 'Unauthorized' } })
  })
});