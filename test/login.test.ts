import bcrypt from 'bcrypt';
import createHttpServer from '@/server';
import { API_TOKEN_ENV } from '@/utils/env';
import { IncomingMessage, Server, ServerResponse } from 'http';
import { agent } from 'supertest';
import { prismaMock } from "@/../singleton"
import { User } from '@prisma/client';
import { faker } from '@faker-js/faker';

const httpServer: Server<typeof IncomingMessage, typeof ServerResponse> = createHttpServer("5101");

afterAll(done => {
  httpServer.close(done);
});

const request = agent(httpServer);

describe('app', () => {

  it("should be successfully login user.", async () => {
    const password = faker.internet.password()

    const user: User = {
      id: faker.string.uuid(),
      email: faker.internet.email(),
      image: faker.image.avatar(),
      name: faker.person.fullName(),
      password: await bcrypt.hash(password, 10),
      phone: faker.phone.number(),
      program: "INTERNATIONAL",
      role: "STUDENT",
      touched: false,
      studentid: "64070503450",
      student: "ENROLLED"
    }

    prismaMock.user.findUnique.mockResolvedValue(user)

    return request.post('/api/auth/login').set("Authorization", `Bearer ${API_TOKEN_ENV}`).send({
      password: password, studentid: user.studentid
    }).expect(200)
  })

  it("should be return 400 - password", async () => {
    const password = faker.internet.password()

    const user: User = {
      id: faker.string.uuid(),
      email: faker.internet.email(),
      image: faker.image.avatar(),
      name: faker.person.fullName(),
      password: await bcrypt.hash(password, 10),
      phone: faker.phone.number(),
      program: "INTERNATIONAL",
      role: "STUDENT",
      touched: false,
      studentid: "64070503450",
      student: "ENROLLED"
    }

    prismaMock.user.findUnique.mockResolvedValue(user)

    const res = await request.post('/api/auth/login').set("Authorization", `Bearer ${API_TOKEN_ENV}`).send({
      password: "somepassword..", studentid: user.studentid
    })

    console.log(res.body);

    expect(res.body).toStrictEqual({ error: { customError: "password doest not match" } })
  })

  it("should be return 400 - studentid", async () => {
    const password = faker.internet.password()

    prismaMock.user.findUnique.mockResolvedValue(null)

    const res = await request.post('/api/auth/login').set("Authorization", `Bearer ${API_TOKEN_ENV}`).send({
      password: password, studentid: "user.studentid"
    }).expect(400)

    expect(res.body).toStrictEqual({ error: { customError: "user does not exist" } })
  })


});