import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const NotFound = () => {
  return (
    <Container>
      <p>The page you are looking for doesn't exist.</p>
      <Link to="/">Go home</Link>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  font-size: 1.6rem;

  p {
    color: #4a4c4e;
  }

  a {
    font-weight: 700;
    color: inherit;
    text-decoration: none;
  }
`;
