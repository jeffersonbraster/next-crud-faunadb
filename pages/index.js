import useSWR from 'swr';
import Layout from '../components/layout';
import DataRow from '../components/data-row';

const fetcher = (url) => fetch(url).then((r) => r.json());


const Home = () => {

  const {data, error} = useSWR('/api/customers', fetcher);

  if(error) return <div>Erro ao carregar lista</div>;

  return (
    <Layout>
      <h1>Next Fauna Crud</h1>

      <div className="table">
        <h2>Dados do cliente</h2>

        <div className="headerRow">
          <h4>name</h4>
          <h4>telefone</h4>
          <h4 className="creditCard">Cartão de crédito</h4>
        </div>
      

        {data ? (data.map((d) => (
            <DataRow
              key={d.ref['@ref'].id}
              id={d.ref['@ref'].id}
              firstName={d.data.firstName}
              lastName={d.data.lastName}
              telephone={d.data.telephone}
              creditCard={d.data.creditCard.number}
            />
          ))
        ) : (
          <>
            <DataRow loading />
            <DataRow loading />
            <DataRow loading />
          </>
        )}
        </div>
   </Layout>
  );
};

export default Home;
