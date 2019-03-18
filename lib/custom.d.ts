declare module '*.worker.ts' {
  class WebpackWorker extends Worker {
    public constructor();
  }

  export default WebpackWorker;
}

declare module '*.mdx' {
  let MDXComponent: (props) => JSX.Element;
  export const meta: object;
  export default MDXComponent;
}

declare namespace NodeJS {
  interface Process {
    browser: boolean;
  }

  interface Global {
    readonly localStorage: Storage;
  }
}
