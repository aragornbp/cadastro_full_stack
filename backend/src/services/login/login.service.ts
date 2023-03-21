import { clientRepository } from "../../repositories/clientRepository"
import jwt from "jsonwebtoken"


export const loginService = async (email: string) => {
  const client = await clientRepository.findOneBy({ email })

  const token = jwt.sign(
    {},
    process.env.SECRET_KEY!,
    { expiresIn: "24h", subject: String(client?.id) }
  );


  return { token: token }
}