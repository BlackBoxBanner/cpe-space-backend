import { APIController } from '@/types/responseType';
import { customError } from '@/utils/customError';
import prisma from '@/utils/prisma';
import { User } from '@prisma/client';

export const usersGetController: APIController<
  Omit<User, 'password'>[]
> = async (req, res, _next) => {
  try {
    const queries = req.query;

    const query: Partial<Omit<User, 'password'>> = {
      id: queries.id ? queries.id.toString() : undefined,
      studentid: queries.studentid ? queries.studentid.toString() : undefined,
      email: queries.email ? queries.email.toString() : undefined,
      name: queries.name ? queries.name.toString() : undefined,
      program: queries.program
        ? (queries.program as User['program'])
        : undefined,
      role: queries.role ? (queries.role as User['role']) : undefined,
      touched: queries.touched ? (queries.touched ? true : false) : undefined,
    };

    const userData = await prisma.user.findMany({
      where: {
        ...query,
      },
      select: {
        id: true,
        studentid: true,
        name: true,
        email: true,
        phone: true,
        program: true,
        image: true,
        touched: true,
        role: true,
        class: true,
      },
    });

    return res.status(200).json({ data: userData });
  } catch (error) {
    return res.status(400).json(customError(error));
  }
};

export const searchUserGetController: APIController<
  Omit<User, 'password'>[]
> = async (req, res, _next) => {
  try {
    const queries = req.query;

    const userData = await prisma.user.findMany({
      where: {
        OR: [
          {
            name: { contains: queries.search?.toString(), mode: 'insensitive' },
          },
          {
            email: {
              contains: queries.search?.toString(),
              mode: 'insensitive',
            },
          },
          {
            studentid: {
              contains: queries.search?.toString(),
              mode: 'insensitive',
            },
          },
          {
            class: {
              contains: queries.search?.toString(),
              mode: 'insensitive',
            },
          },
        ],
      },
      select: {
        id: true,
        studentid: true,
        name: true,
        email: true,
        phone: true,
        program: true,
        image: true,
        touched: true,
        role: true,
        class: true,
      },
    });

    return res.status(200).json({ data: userData });
  } catch (error) {
    return res.status(400).json(customError(error));
  }
};

export const updateUserController: APIController<
  Omit<User, 'password'>,
  { data: Omit<User, 'password'> }
> = async (req, res, _next) => {
  try {
    const { data } = req.body;

    const updateUser = await prisma.user.update({
      where: { id: data.id },
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        program: data.program,
        image: data.image,
        touched: data.touched,
        role: data.role,
        class: data.class,
      },
      select: {
        id: true,
        studentid: true,
        name: true,
        email: true,
        phone: true,
        program: true,
        image: true,
        touched: true,
        role: true,
        class: true,
      },
    });

    return res.status(200).json({ data: updateUser });
  } catch (error) {
    return res.status(400).json(customError(error));
  }
};
