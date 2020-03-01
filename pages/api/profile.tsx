import auth0 from '../../utils/auth0';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function profile(req: NextApiRequest, res: NextApiResponse) {
  await auth0.handleProfile(req, res, {});
}