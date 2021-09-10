import faker from "faker";
import jwt from "jsonwebtoken";


export async function generateToken(id:number) {
   const token = jwt.sign({
        userId:id
      }, process.env.JWT_SECRET);

     return token
}
