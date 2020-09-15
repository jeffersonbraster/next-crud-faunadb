import {useRouter} from 'next/router';
import useSWR from 'swr';
import Layout from '../../../components/layout';

const fetcher = (url) => fetch(url).then((r) => r.json());

const Customer = () => {
  const router = useRouter();
  const {id} = router.query;

  const {data, error} = useSWR(`/api/customers/${id}`, fetcher);

  if (error) return <div>failed to load</div>;

  return (
    <Layout>
      <h1>Customers</h1>
      <hr/>

      {data? (
        <div>
          <p className="name">
            {data.firstName} {data.lastName}
          </p>

          <p className="num">{data.telephone}</p>
          <p className="num">{data.creditCard.number}</p>
        </div>
      ) : (
        <div>Carregando...</div>
      )}
    </Layout>
  );
};

export default Customer;