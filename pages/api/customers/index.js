import {query as q} from 'faunadb';
import {serverClient} from '../../../utils/fauna-auth';

export default async(req, res) => {
  try {
    const customers = await serverClient.query(
      q.Map(
        //iterar cada item do resultado
        q.Paginate(
        //cria paginação
        q.Match(
          //indice de consulta
          q.Index('all_customers') //especifica a fonte
        )
      ),
      (ref) => q.Get(ref) //procura cada resultado pela sua referência
    )
   );
   //ok
   res.status(200).json(customers.data);
  } catch (err) {
    //caso ocorra algum erro inesperado
    res.status(500).json({error: err.message});
  }
};