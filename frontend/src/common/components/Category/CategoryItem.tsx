import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { ClothType } from '../../../types/Cloth';

type CategoryItemProps = {
  item: ClothType;
};

export const CategoryItem = ({ item }: CategoryItemProps) => {
  return (
    <Container>
      <Link to={`/${item.forWho}/item/${item._id}`}>
        <img src={item.imgs[0]} alt="" />
        <Details>
          <p className="title">{item.name}</p>
          <p className="price">{item.price} £</p>
        </Details>
      </Link>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  justify-content: center;
  transition: all 0.2s ease-in-out;

  img {
    height: 400px;
    width: 300px;
  }

  &:hover {
    cursor: pointer;
    transform: scale(1.02);
  }

  a {
    text-decoration: none;
    color: inherit;
  }
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;

  .title {
    color: #4a4c4e;
  }

  .price {
    font-size: 1.2rem;
    font-weight: 700;
  }
`;
