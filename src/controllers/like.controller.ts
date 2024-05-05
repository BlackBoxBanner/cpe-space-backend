import { APIController } from "@/types/responseType";
import { CommunitiesFormSchema, PostLikesSchema } from "@/types/zodSchema";
import { customError } from "@/utils/customError";
import prisma from "@/utils/prisma";
import { Communities } from "@prisma/client";

export const createLikeController: APIController<any> = async (
    req,
    res,
    _next
) => {
    try {
        const body = req.body;
        const userId = req.cookies["user-id"];

        if (!userId) throw new Error("Unautorized user");

        const validateLike = PostLikesSchema.omit({ id: true, userId: true }).safeParse(body);


        if (!validateLike.success)
            throw new Error(
                validateLike.error.errors[0].path[0].toString()
            );

        const like = await prisma.postLikes.create({ data: { ...validateLike.data, userId } })

        if(!like) throw new Error("Failed to create like");

        const post = await prisma.post.update({data ,where: { id: like.postId } });

        return res.status(201).json({ data: like });
    } catch (error) {
        return res.status(400).json(customError(error));
    }
};