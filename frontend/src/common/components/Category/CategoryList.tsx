import styled from 'styled-components';

import { useAppSelector } from '../../hooks/useRedux';
import { CategoryItem } from './CategoryItem';
import { Loader } from '../Utils/Loader';
import { clothesAll } from '../../../features/clothes/clothesSlice';

type CategoryListProps = {
  category: string | undefined;
  forWho: string;
};

export const CategoryList = ({ category, forWho }: CategoryListProps) => {
  const clothes = useAppSelector(clothesAll);

  const items = clothes.items.filter((item) => item.category === category && item.forWho === forWho);

  return (
    <>
      {clothes.loading && <Loader />}
      {clothes.error && !clothes.loading && <p>{clothes.error}</p>}
      {items.length === 0 && !clothes.loading && <p>There is no items.</p>}
      {!clothes.loading && !clothes.error && items.length > 0 && (
        <List>
          {items.map((item) => (
            <CategoryItem key={item._id} item={item} />
          ))}
        </List>
      )}
    </>
  );
};

const List = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
`;
