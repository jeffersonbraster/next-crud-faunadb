import {useState} from 'react';
import Router from 'next/router';
import {useForm} from 'react-hook-form';
import Layout from '../../components/layout';

const Create = () => {
  const [errorMessage, setErrorMessage] = useState('');

  const {handleSubmit, register, errors} = useForm();

  const onSubmit = handleSubmit(async(FormData) => {
    if(errorMessage) setErrorMessage('');

    try {
      const res = await fetch('/api/customers/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(FormData),
      });


      if(res.status === 200) {
        Router.push('/');
      } else {
        throw new Error(await res.text());
      }
    } catch (error) {
      console.error(error);
      setErrorMessage(error.message);
    }
  });

  return (
    <Layout>
      <h1>Criar Customer</h1>

      <form onSubmit={onSubmit}>
        <div>
          <label>First Name</label>
          <input type="text" name="firstName" 
          placeholder="Primeiro nome" ref={register({required: 'Insira o primeiro nome'})} />

          {errors.firstName && (
            <span role="alert" className="error">
              {errors.firstName.message}
            </span>
          )}
        </div>

        <div>
          <label>Last Name</label>
          <input
            type="text"
            name="lastName"
            placeholder="Ultimo nome"
            ref={register({ required: 'Insira o seu sobrenome' })}
          />
          {errors.lastName && (
            <span role="alert" className="error">
              {errors.lastName.message}
            </span>
          )}
        </div>

        <div>
          <label>Telephone</label>
          <input
            type="text"
            name="telephone"
            placeholder="Insira seu número celular"
            ref={register({ required: 'Insira o seu telefone' })}
          />
          {errors.telephone && (
            <span role="alert" className="error">
              {errors.telephone.message}
            </span>
          )}
        </div>

        <div>
          <label>Credit Card Number</label>
          <input
            type="text"
            name="creditCardNumber"
            placeholder="Insira os n° do seu cartão"
            ref={register}
          />
          {errors.creditCardNumber && (
            <span role="alert" className="error">
              {errors.creditCardNumber.message}
            </span>
          )}
        </div>

        <div className="submit">
          <button type="submit" className="submitButton">
            Criar
          </button>
        </div>

      </form>

      {errorMessage && (
        <p role="alert" className="errorMessage">
          {errorMessage}
        </p>
      )}
    </Layout>
  )
}

export default Create;