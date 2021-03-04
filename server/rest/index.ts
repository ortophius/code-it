import {
  Express, Request, Response, Router,
} from 'express';
import {
  createProject, getProject, editProject, ProjectChanges,
} from '../db/Nodes';

async function createNewProject(req: Request, res: Response) {
  const link = await createProject();
  res.status(201);
  res.send(JSON.stringify({ link }));
}

const projectRouter = Router();

projectRouter.post('/:link/attributes/', async (req, res) => {
  const { link } = req.params;
  const changes: ProjectChanges = req.body;

  try {
    res.send({
      status: true,
      result: await editProject(link, changes),
    });
  } catch (e) {
    res.status(400);
    res.statusMessage = 'Bad Request';
    res.send({
      status: false,
      msg: (e as Error).message,
    });
  }
});

projectRouter.get('*', async (req, res) => {
  const link = req.path.slice(1);

  try {
    const p = await getProject(link);
    res.send(p);
  } catch {
    res.statusCode = 404;
    res.send();
  }
});

const apiRouter = Router();

apiRouter.post('/create', createNewProject);
apiRouter.use('/project', projectRouter);

export default function applyApiRoutes(app: Express) {
  app.use('/v1', apiRouter);
}
