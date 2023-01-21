import { getToken } from 'next-auth/jwt';

const secret = process.env.NEXTAUTH_SECRET;
let accessToken;

export default async (req, res) => {
  const token = await getToken({ req, secret });
  accessToken = token.accessToken;
  console.log(token)

  res.status(200).json(accessToken);
};