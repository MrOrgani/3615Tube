// https://modern-javascript.fr/comment-definir-les-types-de-process-env-avec-typescript-pour-avoir/

declare namespace NodeJS {
  export interface ProcessEnv {
    DB_HOST: string;
    BACK_HOST: string;
    FRONT_HOST: string;
    SESSION_SECRET: string;
  }
}
