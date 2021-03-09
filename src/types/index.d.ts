// Global types

declare module '*.html' {
  const content: string;
  export default content;
}

interface IExample {
  msg: string;
}

interface ExampleState {
  example: IExample;
}

interface Folder {
  _id: string,
  title: string;
  parent: Folder | null;
  children: Folder[];
  files: File[];
}

interface File {
  _id: string;
  title: string;
  body: string;
  parent: Folder | string;
}

interface ProjectState {
  title: string;
  root?: Folder;
  link: string;
  notFound?: boolean;
}

type RootState = import('store/index').RootState;
