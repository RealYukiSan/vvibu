import { Listr } from "listr2";

interface Ctx {}

const tasks = new Listr<Ctx>([
  {
    title: "Welcome! what do you want to do?",
    task: (ctx) => {},
  },
]);
