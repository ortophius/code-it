import { Express, Request, Response } from 'express';
import { createProject } from '../db/Nodes';

async function createNewProject(req: Request, res: Response) {
  const link = await createProject();
  res.status(201);
  res.send(JSON.stringify({ link }));
}

export default function applyRoutes(app: Express) {
  app.post('/create', createNewProject);
}
