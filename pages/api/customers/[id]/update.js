import { query as q } from 'faunadb';
import { serverClient } from '../../../../utils/fauna-auth';

export default async(req, res) => {
  const {
    query: {id},
  } = req;

  const {firstName, lastName, telephone, creditCardNumber} = req.body;

  try {
    await serverClient.query(
      q.Update(q.Ref(q.Collection('customers'), id), {
        data: {
          firstName,
          lastName,
          telephone,
          creditCardNumber: {
            number: creditCardNumber,
          },
        },
      })
    );
    res.status(200).end();
  } catch (error) {
    res.status(500).json({error: error.message});
    
  }
};