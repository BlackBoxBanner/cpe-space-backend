import {
    createCommunity,
    deleteCommunity,
    findCommunity,
    updateCommunity,
} from "@/services/communities.service";
import { APIController } from "@/types/responseType";
import {
    CommunitiesFormSchema,
    CommunitiesUpdateFormSchema,
} from "@/types/zodSchema";
import { customError } from "@/utils/customError";
import { Communities, CommunitiesStatus } from "@prisma/client";

export const createCommunityController: APIController<Communities> = async (
    req,
    res,
    _next
) => {
    try {
        const body = req.body;
        const userId = req.cookies["user-id"];

        if (!userId) throw new Error("Unautorized user");

        const validateCommunity = CommunitiesFormSchema.safeParse(body);

        if (!validateCommunity.success)
            throw new Error(
                validateCommunity.error.errors[0].path[0].toString()
            );

        const communities = await createCommunity({
            userId,
            ...validateCommunity.data,
        } as Communities);

        return res.status(201).json({ data: communities });
    } catch (error) {
        return res.status(400).json(customError(error));
    }
};

export const getCommunityController: APIController<Communities[]> = async (
    req,
    res,
    _next
) => {
    try {
        const queries = req.query;

        const query: Partial<Omit<Communities, "createdAt">> = {
            id: req.query.id ? req.query.id.toString() : undefined,
            name: req.query.name ? req.query.name.toString() : undefined,
            status: (req.query.status as CommunitiesStatus)
                ? (req.query.status as CommunitiesStatus)
                : undefined,
        };

        const result = await findCommunity(query);

        return res.status(201).json({ data: result });
    } catch (error) {
        return res.status(400).json(customError(error));
    }
};

export const updateCommunityController: APIController<Communities> = async (
    req,
    res,
    _next
) => {
    try {
        const body = req.body;

        const validateCommunity = CommunitiesUpdateFormSchema.safeParse(body);

        if (!validateCommunity.success)
            throw new Error(
                validateCommunity.error.errors[0].path[0].toString()
            );

        const result = await updateCommunity(
            validateCommunity.data as Communities
        );

        return res.status(201).json({ data: result });
    } catch (error) {
        return res.status(400).json(customError(error));
    }
};

export const deleteCommunityController: APIController<Communities> = async (
    req,
    res,
    _next
) => {
    try {
        const id: string = req.params.id;

        // validate id in param request is required
        if (!id) throw new Error("Id is required");

        const result = await deleteCommunity(id);

        return res.status(201).json({ data: result });
    } catch (error) {
        return res.status(400).json(customError(error));
    }
};
