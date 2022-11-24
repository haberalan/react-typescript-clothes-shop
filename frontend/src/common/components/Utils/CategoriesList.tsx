import styled from 'styled-components';
import { Link } from 'react-router-dom';

type CategoriesListProps = {
  categories: string[];
  filter: string;
};

export const CategoriesList = ({ categories, filter }: CategoriesListProps) => {
  return (
    <List>
      {categories.map((category) => (
        <li key={category}>
          <Link to={`/${filter}/${category}`}>{category}</Link>
        </li>
      ))}
    </List>
  );
};

const List = styled.ul`
  display: flex;
  gap: 1rem;

  a {
    text-decoration: none;
    color: inherit;
    font-size: 1.4rem;
    font-weight: 700;
  }

  @media (max-width: 400px) {
    a {
      font-size: 1rem;
    }
  }

  @media (max-width: 300px) {
    gap: 0.4rem;
  }
`;
