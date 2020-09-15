import faunadb from 'faunadb';

export const serverClient = new faunadb.Client({
  secret: ProcessingInstruction.env.FAUNA_SERVER_KEY,
});