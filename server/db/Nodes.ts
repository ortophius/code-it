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
    return this.populate('parent').parent as FolderDocument;
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
    return this.populate('parent').parent as FolderDocument;
  },
  async getChildren(this: FolderDocument): Promise<FolderDocument[]> {
    return this.populate('children').children as FolderDocument[];
  },
  async getFiles(this: FolderDocument): Promise<File[]> {
    return this.populate('files').files as File[];
  },
};

export interface ProjectDocument extends Document {
  title: string;
  link?: string;
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
    return this.populate('root').root as FolderDocument;
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

  const files = ['index.html', 'style.css', 'app.js'];

  const filePromises = files.map(async (title) => {
    const file = await new File({
      title,
      parent: rootFolder.id,
    }).save();

    await rootFolder.update({ $push: { children: file } });
  });

  await Promise.all(filePromises);

  return getProjectLink(rootFolder.id);
}
