import auth0 from '../../utils/auth0';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function token(req: NextApiRequest, res: NextApiResponse) {
  // Get User Session from Server
  const session = await auth0.getSession(req);
  
  // Handle Session Not Found
  if (!session) {
    return res.json({ user: null });
  }

  // Handle Session Found
  res.json(session);
}