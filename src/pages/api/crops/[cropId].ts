import { NextApiRequest, NextApiResponse } from "next";
import { deleteGrowingCrop, setCrop } from "@/controller/crop.controller";

export default async function cropsHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  switch (method) {
    case "POST":
      await setCrop(req, res);
      break;
    case "DELETE":
      await deleteGrowingCrop(req, res);
      break;
    default:
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
