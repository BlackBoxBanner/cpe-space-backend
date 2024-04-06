import { APIController, PostBody } from "@/types/responseType";
import { decrypt } from "@/utils/decryption";

export const mainGetController: APIController<any> = async (
  req,
  res,
  _next,
) => {
  return res.status(200).json({
    data: {
      message: "Hello World",
    },
  });
};

export const mainPostController: APIController<unknown> = async (req, res, _next) => {
  const body = req.body.data

  const decrypted = decrypt(body);

  return res.status(200).json({ data: decrypted });
};
