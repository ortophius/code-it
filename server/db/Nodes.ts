import {
  Document, model, Types, Schema, ObjectId,
} from 'mongoose';
import { customAlphabet } from 'nanoid';

const nanoid = customAlphabet('0123456789abcdefghiklmnopqrstuvwxyz', 10);

export interface FileDocument extends Document {
  title: string;
  body: string;
  parent: ObjectId | FolderDocument;
  getParent(): FolderDocument;
}

export const FileSchema = new Schema<FileDocument>({
  title: String,
  body: {
    type: String,
    default: '',
  },
  parent: {
    type: Types.ObjectId,
    default: null,
    ref: 'Folder',
  },
});

FileSchema.methods = {
  async getParent(this: FileDocument): Promise<FolderDocument> {
    await this.populate('parent').execPopulate();
    return this.parent as FolderDocument;
  },
};

export interface FolderDocument extends Document {
  title: string;
  children: ObjectId[] | FolderDocument[];
  parent?: ObjectId | FolderDocument;
  files: File[];
  getChildren(): FolderDocument[];
  getParent(): FolderDocument;
  getFiles(): File[];
}

export const FolderSchema = new Schema<FolderDocument>({
  title: String,
  children: [{
    type: Types.ObjectId,
    default: null,
    ref: 'Folder',
  }],
  parent: {
    type: Types.ObjectId,
    default: null,
    ref: 'Folder',
  },
  files: [{
    type: Types.ObjectId,
    default: null,
    ref: 'File',
  }],
});

FolderSchema.methods = {
  async getParent(this: FolderDocument): Promise<FolderDocument> {
    await this.populate('parent').execPopulate();
    return this.parent as FolderDocument;
  },
  async getChildren(this: FolderDocument): Promise<FolderDocument[]> {
    await this.populate('children').execPopulate();
    return this.children as FolderDocument[];
  },
  async getFiles(this: FolderDocument): Promise<File[]> {
    await this.populate('files').execPopulate();
    return this.files as File[];
  },
};

interface ProjectBaseDocument {
  title: string;
  link?: string;
}

export interface ProjectDocument extends ProjectBaseDocument, Document {
  root: ObjectId | FolderDocument;
  getRoot(): FolderDocument;
}

export const ProjectSchema = new Schema<ProjectDocument>({
  title: {
    type: String,
    default: 'Untitled',
  },
  link: {
    type: String,
    required: true,
    unique: true,
  },
  root: {
    type: Types.ObjectId,
    default: null,
    ref: 'Folder',
  },
});

ProjectSchema.methods = {
  async getRoot(this: ProjectDocument): Promise<FolderDocument> {
    await this.populate('root').execPopulate();
    return this.root as FolderDocument;
  },
};

export const Project = model('Project', ProjectSchema);
export const File = model('File', FileSchema);
export const Folder = model('Folder', FolderSchema);

export async function createProject(): Promise<string> {
  async function getProjectLink(rootFolderId: string): Promise<string> {
    let link = nanoid();

    try {
      await new Project({
        link,
        root: rootFolderId,
      }).save();
    } catch {
      link = await getProjectLink(rootFolderId);
    }

    return link;
  }

  const rootFolder = await new Folder({
    title: 'root',
  }).save();

  const projectFiles = ['index.html', 'style.css', 'app.js'];

  const filePromises = projectFiles.map(async (title) => {
    const file = await new File({
      title,
      parent: rootFolder.id,
    }).save();

    await rootFolder.update({ $push: { files: file.id } });
  });

  await Promise.all(filePromises);

  return getProjectLink(rootFolder.id);
}

export async function getProject(link: string) {
  async function populateNodes(rootFolder: FolderDocument) {
    await rootFolder.getFiles();
    await rootFolder.getChildren();

    const childFolders = rootFolder.children as FolderDocument[];
    const promises = childFolders.map(async (childFolder) => { populateNodes(childFolder); });

    await Promise.all(promises);
  }

  const project = await Project.findOne({ link }) as ProjectDocument;

  if (!project) throw new Error(`Project ${link} does not exist`);

  await project.getRoot();
  await populateNodes(project.root as FolderDocument);
  return project;
}

export type ProjectChanges = Partial<ProjectBaseDocument>;

export async function editProject(link: string, changes: ProjectChanges) {
  const allowedAttributes: Array<keyof ProjectChanges> = ['title'];
  const filteredChanges: ProjectChanges = {};

  allowedAttributes.forEach((key) => {
    if (key in changes) filteredChanges[key] = changes[key]!;
  });

  if (Object.keys(filteredChanges).length === 0) throw new Error('Nothing to change');

  if (!filteredChanges.title) throw new Error('Title must not be empty');

  try {
    await Project.updateOne({ link }, filteredChanges);
    return true;
  } catch (e) { throw new Error(e); }
}
