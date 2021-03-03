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
  title: string;
  parent: Folder | null;
  children: Folder[];
  files: File[];
}

interface File {
  title: string;
  body: string;
  parent: Folder;
}

interface ProjectState {
  title: string;
  root?: Folder;
  notFound?: boolean;
}

type RootState = import('store/index').RootState;
