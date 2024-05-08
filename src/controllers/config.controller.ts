import { APIController } from '@/types/responseType';
import { getCookies } from '@/utils/cookies';
import { util } from 'node-forge';

export const configGetRsaKeyController: APIController<string> = async (
  req,
  res,
  _next,
) => {
  const cookies = getCookies(req.headers.cookie);
  const publicKeyPem = cookies['rsa-public-key'];

  if (!publicKeyPem || publicKeyPem !== req.app.get('publicKeyPem')) {
    res.cookie('rsa-public-key', util.encode64(req.app.get('publicKeyPem')), {
      httpOnly: false,
      secure: true,
    });
  }

  return res
    .status(200)
    .json({ data: util.encode64(req.app.get('publicKeyPem')) });
};
