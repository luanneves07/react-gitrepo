import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import PropTypes from 'prop-types';
import api from '../../services/api';

import Container from '../../components/Container';
import { Owner, IssueList, BoxDivider, SectionNav, NavButton } from './styles';

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
    page: 1,
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

  loadIssues = async () => {
    const { repository, filtering, page } = this.state;
    const filteredIssues = await api.get(
      `/repos/${repository.full_name}/issues`,
      {
        params: {
          state: filtering,
          per_page: 5,
          page,
        },
      }
    );

    this.setState({
      issues: filteredIssues.data,
      loading: false,
    });
  };

  handleChange = async e => {
    e.preventDefault();
    const selectedFilter = e.target.value;
    await this.setState({
      page: 1,
      filtering: selectedFilter,
      loading: true,
    });

    this.loadIssues();
  };

  handleClick = async action => {
    const { page } = this.state;
    const nextPage =
      action === 'back'
        ? parseInt(-1, 10) + parseInt(page, 10)
        : parseInt(1, 10) + parseInt(page, 10);
    if (nextPage < 1) {
      return;
    }

    await this.setState({
      page: nextPage,
      loading: false,
    });

    this.loadIssues();
  };

  render() {
    const {
      repository,
      issues,
      loading,
      availableFilters,
      filtering,
      page,
    } = this.state;

    if (loading) {
      return (
        <Container>
          <Owner>
            <Link to="/">Voltar aos repositórios</Link>
          </Owner>
          <BoxDivider>
            <div />
            <p>Filtrar issues:</p>
            <select>Loading</select>
          </BoxDivider>
          <SectionNav>
            <NavButton disabled={false}>Anterior</NavButton>
            <div />
            <NavButton disabled={false}>Próxima</NavButton>
          </SectionNav>
        </Container>
      );
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
        <SectionNav>
          <NavButton
            action="back"
            onClick={() => this.handleClick('back')}
            disabled={page < 2}
          >
            Anterior
          </NavButton>
          <div />
          <NavButton
            action="next"
            onClick={() => this.handleClick('next')}
            disabled={issues.length < 5}
          >
            Próxima
          </NavButton>
        </SectionNav>
      </Container>
    );
  }
}
