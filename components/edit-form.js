import { useState } from 'react';
import Router from 'next/router';
import { useForm } from 'react-hook-form';

const EditForm = ({defaultValues, id}) => {
  const {errorMessage, setErrorMessage} = useState('');

  const {handleSubmit, register, errors} = useForm({
    defaultValues: {
      ...defaultValues,
      creditCardNumber: defaultValues.creditCard.number,
    },
  });

  const onSubmit = handleSubmit(async (formData) => {
    if (errorMessage) setErrorMessage('');

    try {
      const res = await fetch(`/api/customers/${id}/update`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (res.status === 200) {
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
    <>
      <h1>Edit Customer</h1>

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

      <style jsx>{`
        form {
          background-color: #eee;
          border-radius: 4px;
          padding: 2rem;
        }
        label {
          font-size: 0.9rem;
          font-weight: 600;
        }
        input {
          width: 100%;
          border: 1px solid #ccc;
          border-radius: 4px;
          padding: 0.75rem;
          margin: 0.25rem 0 1rem;
        }
        .submit {
          margin-top: 1rem;
          text-align: right;
        }
        .submitButton {
          background-color: #0070f3;
          border: none;
          border-radius: 4px;
          color: #fff;
          font-size: 1rem;
          padding: 0.5rem 1rem;
          cursor: pointer;
        }
        .error,
        .errorMessage {
          color: #d32f2f;
        }
        .error {
          display: block;
          margin-bottom: 1rem;
        }
      `}</style>
    </>
  );
};

export default EditForm;