import { APIController } from "@/types/responseType";
import { PostFormSchema, PostSchema, PostTopicSchema, PostType } from "@/types/zodSchema";
import { customError } from "@/utils/customError";
import prisma from "@/utils/prisma";

export const createPostController: APIController<any> = async (
    req,
    res,
    _next
) => {
    try {
        const body = req.body;
        const userId = req.cookies["user-id"];

        const validatePost = PostFormSchema.safeParse(body);

        if (!validatePost.success)
            throw new Error(
                validatePost.error.errors[0].path[0].toString()
            );
        
        const post = await prisma.post.create({ data: { ...validatePost.data, userId } });
        
        const postID = post.id;

        const postTopicCreationPromises = validatePost.data.topicId.map(async (topicId) => {
            return prisma.postTopic.create({
                data: {
                    postId: postID,
                    topicId: topicId,
                },
            });
        });

        const postTopics = await Promise.all(postTopicCreationPromises);

        return res.status(201).json({ data: post as PostType });
    } catch (error) {
        return res.status(400).json(customError(error));
    }
};