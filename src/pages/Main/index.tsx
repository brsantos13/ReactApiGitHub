import React, {
  useState,
  useEffect,
  ChangeEvent,
  FormEvent,
} from 'react';

import { Link } from 'react-router-dom';

import { FaGithubAlt, FaPlus, FaSpinner } from 'react-icons/fa';

import api from '../../services/api';

import Container from '../../components/Container';
import { Form, SubmitButton, List, Input, AlertErro } from './styles';

interface Respositories {
  name: string;
}

const Main: React.FC = () => {
  let initialRepositories = [] as any;
  initialRepositories = localStorage.getItem('repositories');
  const [newRepo, setNewRepo] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [msgError, setMsgError] = useState<string>('');
  const [repositories, setRepositories] = useState<Respositories[]>(
    JSON.parse(initialRepositories)
  );

  useEffect(() => {
    setTimeout(() => {
      setError(false);
    }, 7000);
  }, [error]);

  useEffect(() => {
    if (!repositories) return;

    localStorage.setItem(
      'repositories',
      JSON.stringify(repositories)
    );
  }, [repositories]);

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    setNewRepo(event.target.value.trim());
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setLoading(true);

    try {
      if (
        repositories.filter(
          (repository) => repository.name === newRepo
        ).length > 0
      ) {
        setError(true);
        setLoading(false);
        setMsgError('Repositório duplicado!');

        return;
      }

      const response = await api.get(`/repos/${newRepo}`);
      const data = {
        name: response.data.full_name,
      };
      setRepositories([...repositories, data]);
      setNewRepo('');
      setLoading(false);
    } catch (err) {
      setMsgError('Repositório não encontrado!');
      setLoading(false);
      setError(true);
    }
  }

  return (
    <Container>
      <h1>
        <FaGithubAlt />
        Repositórios
      </h1>

      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          error={error}
          placeholder="Adicionar repositório"
          value={newRepo}
          onChange={handleInputChange}
        />

        <SubmitButton type="submit" loading={loading}>
          {loading ? (
            <FaSpinner />
          ) : (
            <FaPlus color="#FFF" size={14} />
          )}
        </SubmitButton>
      </Form>

      {error && <AlertErro>{msgError}</AlertErro>}

      <List>
        {repositories.map((repository) => (
          <li key={repository.name}>
            <span>{repository.name}</span>
            <Link
              to={`/repository/${encodeURIComponent(
                repository.name
              )}`}
            >
              Detalhes
            </Link>
          </li>
        ))}
      </List>
    </Container>
  );
};

export default Main;
