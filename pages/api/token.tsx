import auth0 from '../../utils/auth0';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function token(req: NextApiRequest, res: NextApiResponse) {
  try {
    res.json(await auth0.getSession(req));
  } catch (error) {
    console.error(error)
    res.status(error.status || 500).end(error.message)
  }
}