import auth0 from '../../utils/auth0';
import { NextApiResponse, NextApiRequest } from 'next'

export default async function login(req: NextApiRequest, res: NextApiResponse) {
  await auth0.handleLogin(req, res, {});
}