import { useEffect } from 'react';
import { useParams, useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { useAppDispatch } from '../common/hooks/useRedux';
import { fetchClothes } from '../features/clothes/clothesSlice';
import { CategoryList } from '../common/components/Category/CategoryList';

type CategoryProps = {
  forWho: string;
};

export const Category = ({ forWho }: CategoryProps) => {
  const dispatch = useAppDispatch();
  const { category } = useParams();
  const { pathname } = useLocation();

  useEffect(() => {
    dispatch(fetchClothes());
  }, [dispatch]);

  return (
    <Container>
      <h2>{pathname}</h2>
      <Link to={`/${forWho}`}>Go to {forWho}</Link>
      <CategoryList category={category} forWho={forWho} />
    </Container>
  );
};

const Container = styled.div`
  min-height: 60vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;

  & > h2 {
    font-size: 1.6rem;
    font-weight: 700;
  }

  & > a {
    color: inherit;
    font-weight: 700;
    text-decoration: none;
  }

  .loader {
    margin-top: 10rem;
  }
`;
