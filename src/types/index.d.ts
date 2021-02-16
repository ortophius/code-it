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
