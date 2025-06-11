import "next";

declare module "next" {
  interface NextApiRequest {
    session: {
      userId?: number;
      [key: string]: any;
    };
  }
}