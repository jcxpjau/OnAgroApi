declare global {
    namespace NodeJS {
      interface ProcessEnv {
        environment: string;
        db: string;
        PORT: Int16Array;
      }
    }
  }
  export {};