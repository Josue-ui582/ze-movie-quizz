import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.session?.userId) {
    res.status(200).json({ user: { id: req.session.userId } });
  } else {
    res.status(401).json({ user: null });
  }
}