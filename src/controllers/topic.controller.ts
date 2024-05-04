import { APIController } from "@/types/responseType";
import { TopicSchema, TopicType } from "@/types/zodSchema";
import { customError } from "@/utils/customError";
import prisma from "@/utils/prisma";
import { Topic } from "@prisma/client";

export const createTopicController: APIController<TopicType> = async (
    req,
    res,
    _next
) => {
    try {
        const body = req.body;

        const validateTopic = TopicSchema.omit({ id: true }).safeParse(body);

        if (!validateTopic.success)
            throw new Error(validateTopic.error.errors[0].path[0].toString());

        const validateTopicData = await prisma.topic.findUnique({
            where: { name: validateTopic.data.name },
        });
        if (validateTopicData) throw new Error("Topic already exists");

        const topic = await prisma.topic.create({ data: validateTopic.data });

        return res.status(201).json({ data: topic });
    } catch (error) {
        return res.status(400).json(customError(error));
    }
};

export const getTopicController: APIController<TopicType[]> = async (
    req,
    res,
    _next
) => {
    try {

        if(req.query.id === undefined && req.query.name === undefined) {
            const topics = await prisma.topic.findMany();
            return res.status(200).json({ data: topics });
        }

        const query: Partial<Topic> = {
            id: req.query.id ? req.query.id.toString() : undefined,
            name: req.query.name ? req.query.name.toString() : undefined,
        };

        const topic = await prisma.topic.findMany({
            where: {
                OR: [
                    {
                        id: {
                            contains: query.id,
                            mode: "insensitive",
                        },
                    },
                    {
                        name: {
                            contains: query.name,
                            mode: "insensitive",
                        },
                    },
                ],
            },
        });

        return res.status(200).json({ data: topic });
    } catch (error) {
        return res.status(400).json(customError(error));
    }
};
