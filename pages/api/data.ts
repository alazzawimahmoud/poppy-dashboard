import { NextApiRequest, NextApiResponse } from 'next';
export default async (req: NextApiRequest, res: NextApiResponse) => {
    console.log('server call')
    res.status(200).json({ data: `I'm data, born at: ${new Date().toLocaleTimeString()}!` });
}
