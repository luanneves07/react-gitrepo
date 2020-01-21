import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import PropTypes from 'prop-types';
import api from '../../services/api';

import Container from '../../components/Container';
import { Loading, Owner, IssueList, BoxDivider } from './styles';

export default class Repository extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        repo: PropTypes.string,
      }),
    }).isRequired,
  };

  state = {
    repository: {},
    issues: [],
    loading: true,
    availableFilters: [
      {
        name: 'Todas',
        value: 'all',
      },
      {
        name: 'Abertas',
        value: 'open',
      },
      {
        name: 'Fechadas',
        value: 'closed',
      },
    ],
    filtering: 'all',
  };

  async componentDidMount() {
    const { match } = this.props;
    const { filtering } = this.state;
    const repoName = decodeURIComponent(match.params.repo);

    const [repository, issues] = await Promise.all([
      api.get(`/repos/${repoName}`),
      api.get(`/repos/${repoName}/issues?state=${filtering}`, {
        params: {
          state: 'open',
          per_page: 5,
        },
      }),
    ]);

    this.setState({
      repository: repository.data,
      issues: issues.data,
      loading: false,
    });
  }

  handleChange = async e => {
    e.preventDefault();
    const { repository } = this.state;
    const selectedFilter = e.target.value;
    this.setState({ loading: true });

    const filteredIssues = await api.get(
      `/repos/${repository.full_name}/issues?state=${selectedFilter}`
    );

    this.setState({
      filtering: selectedFilter,
      issues: filteredIssues.data,
      loading: false,
    });
  };

  render() {
    const {
      repository,
      issues,
      loading,
      availableFilters,
      filtering,
    } = this.state;

    if (loading) {
      return <Loading>Carregando</Loading>;
    }

    return (
      <Container>
        <Owner>
          <Link to="/">Voltar aos repositórios</Link>
          <img src={repository.owner.avatar_url} alt={repository.owner.login} />
          <h1>{repository.name}</h1>
          <p>{repository.description}</p>
        </Owner>
        <BoxDivider>
          <div />
          <p>Filtrar issues:</p>
          <select value={filtering} onChange={this.handleChange}>
            {availableFilters.map(filter => (
              <option key={filter.name} value={filter.value}>
                {filter.name}
              </option>
            ))}
          </select>
        </BoxDivider>
        <IssueList>
          {issues.map(issue => (
            <li key={String(issue.id)}>
              <img src={issue.user.avatar_url} alt={issue.user.login} />
              <div>
                <strong>
                  <a href={issue.html_url}>{issue.title}</a>
                  {issue.labels.map(label => (
                    <span key={String(label.id)}>{label.name}</span>
                  ))}
                  <strong>
                    <p>{issue.user.login}</p>
                  </strong>
                </strong>
              </div>
            </li>
          ))}
        </IssueList>
      </Container>
    );
  }
}
