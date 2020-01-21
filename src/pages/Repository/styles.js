import styled from 'styled-components';

export const Owner = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;

  a {
    color: #7159c1;
    font-size: 16px;
    text-decoration: none;
  }

  img {
    width: 120px;
    border-radius: 50%;
    margin-top: 20px;
  }

  h1 {
    font-size: 24px;
    margin-top: 10px;
  }

  p {
    margin-top: 5px;
    font-size: 14px;
    color: #667;
    line-height: 1.4;
    text-align: center;
    max-width: 400px;
  }
`;

export const BoxDivider = styled.form`
  display: flex;
  flex-direction: row;
  padding: 15px 0 15px 0;
  margin: 15px 0 15px 0;
  justify-content: center;
  align-items: center;
  border-radius: 4px;

  div {
    color: #eee;
    width: 100%;
    border-top: 1px solid #eee;
    margin-right: 10px;
  }

  p {
    white-space: nowrap;
    font-size: 14px;
    color: #667;
    line-height: 1.4;
    text-align: center;
    margin-right: 10px;
  }

  select {
    border: 1px solid #ddd;
    border-radius: 2px;
  }
`;

export const IssueList = styled.ul`
  list-style: none;

  li {
    display: flex;
    padding: 15px 10px;
    border: 1px solid #eee;
    border-radius: 4px;

    & + li {
      margin-top: 10px;
    }

    img {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      border: 2px solid #eee;
    }

    div {
      flex: 1;
      margin-left: 15px;

      strong {
        font-size: 16px;

        a {
          text-decoration: none;
          color: #333;

          &:hover {
            color: #7159c1;
          }
        }

        span {
          background: #eee;
          color: #333;
          border-radius: 2px;
          font-size: 12px;
          font-weight: 600;
          height: 20px;
          padding: 3px 4px;
          margin-left: 10px;
        }
      }

      p {
        margin-top: 5px;
        font-size: 12px;
        color: #999;
      }
    }
  }
`;

export const NavButton = styled.button.attrs(props => ({
  type: 'submit',
  disabled: props.disabled,
}))`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border: 4px solid #ddd;
  border-radius: 2px;

  &[disabled] {
    cursor: not-allowed;
    opacity: 0.6;
  }
`;

export const SectionNav = styled.nav`
  display: flex;
  flex-direction: row;
  padding: 10px 0 0 0;
  margin: 10px 0 0 0;
  justify-content: center;
  align-items: center;
  border-radius: 4px;

  div {
    color: #eee;
    width: 100%;
    border-top: 1px solid #eee;
    margin-right: 10px;
    margin-left: 10px;
  }
`;
