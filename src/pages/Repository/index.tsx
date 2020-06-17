import React, { useEffect, useState, ChangeEvent } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../../services/api';
import Proptypes from 'prop-types';
import { Pagination } from '@material-ui/lab';
import { FaSpinner } from 'react-icons/fa';

import Container from '../../components/Container';
import {
  LoadingRequest,
  Owner,
  IssueList,
  StyledPagination,
} from './styles';

interface Repository {
  description: string;
  name: string;
  owner: {
    avatar_url: string;
    login: string;
  };
}

interface Issue {
  user: {
    avatar_url: string;
    login: string;
  };
  labels: {
    id: number;
    name: string;
  }[];
  id: number;
  title: string;
  html_url: string;
}

type Issues = Array<Issue>;

const Repository: React.FC = () => {
  const { repository: repositoryParams } = useParams();
  const [repoName] = useState(decodeURIComponent(repositoryParams));
  const [repository, setRepository] = useState<Repository>();
  const [issues, setIssues] = useState<Issues>();
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [state, setState] = useState<string>('all');

  useEffect(() => {
    async function loadRepo() {
      const [repositoryLoad, issuesLoad] = await Promise.all([
        api.get(`/repos/${repoName}`),
        api.get(`/repos/${repoName}/issues`, {
          params: {
            state,
            page,
          },
        }),
      ]);

      setRepository(repositoryLoad.data);
      setIssues(issuesLoad.data);
    }
    loadRepo();
    setLoading(false);
  }, [page, repoName, state]);

  function handlePage(event: ChangeEvent<unknown>, value: number) {
    event.preventDefault();
    setLoading(true);
    setPage(value);
    return;
  }

  function handleState(event: ChangeEvent<HTMLSelectElement>) {
    event.preventDefault();
    if (event.target.value === '') setState('all');
    setState(event.target.value);
  }

  return (
    <Container>
      <Owner>
        <Link to="/">Voltar aos repositórios</Link>
        {loading && (
          <LoadingRequest>
            <FaSpinner size={120} height={120} />
          </LoadingRequest>
        )}
        <img
          src={repository?.owner.avatar_url}
          alt={repository?.owner.login}
        />
        <h1>{repository?.name}</h1>
        <p>{repository?.description}</p>
        <select name="state" onChange={handleState}>
          <option value="">Estado do Problema</option>
          <option value="all">Todos</option>
          <option value="open">Aberto</option>
          <option value="closed">Fechado</option>
        </select>
      </Owner>

      <IssueList>
        {issues?.map((issue) => (
          <li key={String(issue.id)}>
            <img src={issue.user.avatar_url} alt={issue.user.login} />
            <div>
              <strong>
                <a href={issue.html_url}>{issue.title}</a>
                {issue.labels.map((label) => (
                  <span key={label.id}>{label.name}</span>
                ))}
              </strong>
              <p>{issue.user.login}</p>
            </div>
          </li>
        ))}
      </IssueList>
      <StyledPagination>
        <Pagination
          count={10}
          color="primary"
          page={page}
          onChange={handlePage}
        />
      </StyledPagination>
    </Container>
  );
};

Repository.propTypes = {
  repoName: Proptypes.string,
};

export default Repository;
