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

  a:hover {
    /* text-decoration: underline; */
  }
`;
