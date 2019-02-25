declare module '*.worker.ts' {
  class WebpackWorker extends Worker {
    constructor();
  }

  export default WebpackWorker;
}

declare module '*.mdx' {
  let MDXComponent: (props) => JSX.Element;
  export const meta: object;
  export default MDXComponent;
}
