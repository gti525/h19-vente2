import { Request, Response } from "express";
import { getManager } from "typeorm";
import { Admin } from "../entity/Admin";
import { hashPassword } from "../lib/tools";


export async function adminLogin(request: Request, response: Response) {

  console.log(`POST /admins/_login`);
  const adminRepository = getManager().getRepository(Admin);

  let auth: string = request.header("Authorization");
  if (!auth) {
    response.status(401);
    response.json({
      message: "Il manque les données d'authorisation dans l'en-tête."
    });
    response.end();
    return;
  }
  auth = auth.substring(auth.indexOf(" ") + 1);
  const credentials = new Array<string>();
  credentials.push(auth.substring(0, auth.indexOf(":")));
  credentials.push(auth.substring(auth.indexOf(":") + 1));
  // console.log(credentials);

  const admin = await adminRepository.findOne({
    username: credentials[0]
  });

  if (!admin) {
    response.status(401);
    response.json({
      message: "Le nom d'usager ou le mot de passe est incorrecte.",
    });
    response.end();
    return;
  }

  const hashedPassword = hashPassword(credentials[1], admin.salt);
  if (hashedPassword !== admin.hashedPassword) {
    response.status(401);
    response.json({
      message: "Le nom d'usager ou le mot de passe est incorrecte.",
    });
    response.end();
    return;
  }

  response.status(204);
  response.end();
  return;
}

export async function adminCreate(request: Request, response: Response) {

  console.log(`POST /admins/_create`);
  const adminRepository = getManager().getRepository(Admin);

  if (!request.body.username || !request.body.password) {
    response.status(400);
    response.json({
      message: "Le corps de la requête est incomplet.",
      example: Admin.example
    });
    response.end();
    return;
  }

  const salt = hashPassword(request.body.username, (new Date()).toISOString());
  const hashedPassword = hashPassword(request.body.password, salt);

  const admin = new Admin();
  admin.username = request.body.username;
  admin.hashedPassword = hashedPassword;
  admin.salt = salt;

  try {
    const dbResponse = await adminRepository.save(admin);
  } catch (error) {
    response.status(500);
    response.json({
      message: "Probably an encoding error."
    })
    response.end();
    return;
  }


  response.status(201);
  response.end();
  return;

}
