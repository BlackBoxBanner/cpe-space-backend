import { APIController } from "@/types/responseType";
import { customError } from "@/utils/customError";
import prisma from "@/utils/prisma";
import { PostLikesSchema } from "@/types/zodSchema";
import { z } from "zod";
import { PostLikes } from "@prisma/client";

type PostLikesType = z.infer<typeof PostLikesSchema>;


// This function can add or remove a like from a post
export const createLikeController: APIController<any> = async (
    req,
    res,
    _next
) => {
    try {
        const postId = req.params.id;
        const userId = req.cookies["user-id"];

        if (!userId) throw new Error("Unautorized user");

        const existsLike = await prisma.postLikes.findFirst({ where: { userId, postId } })
        if(existsLike) {
            const deletelike = await prisma.postLikes.delete({ where: { ...existsLike } });

            if(!deletelike) throw new Error("Failed to remove like");

            const post = await prisma.post.update({where: {id: postId}, data: {likes: {decrement: 1}}});

            return res.status(201).json({ data: "deletelike" });
        };

        const like = await prisma.postLikes.create({ data: { postId, userId }})

        if(!like) throw new Error("Failed to create like");

        const post = await prisma.post.update({where: {id: postId}, data: {likes: {increment: 1}}});

        return res.status(201).json({ data: "like" });
    } catch (error) {
        return res.status(400).json(customError(error));
    }
};

// export const removeLikeController: APIController<PostLikesType> = async (
//     req,
//     res,
//     _next
// ) => {
//     try {
//         const postId = req.params.id;
//         const userId = req.cookies["user-id"];

//         if (!userId) throw new Error("Unautorized user");

//         const existsLike = await prisma.postLikes.findFirst({ where: { userId, postId } })
//         if(!existsLike) throw new Error("You did not like this post");

//         const deletelike = await prisma.postLikes.delete({ where: { ...existsLike } });

//         return res.status(201).json({ data: deletelike });
//     } catch (error) {
//         return res.status(400).json(customError(error));
//     }
// };