import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { CartType } from '../../../types/Cart';
import { useAppSelector } from '../../hooks/useRedux';
import { clothesOne } from '../../../features/clothes/clothesSlice';

type PurchaseDetailsItemProps = {
  item: CartType;
};

export const PurchaseDetailsItem = ({ item }: PurchaseDetailsItemProps) => {
  const cloth = useAppSelector((state) => clothesOne(state, item._id));

  return (
    <ListItem>
      <Details>
        <Link to={`/${cloth?.forWho}/item/${item._id}`} className="title">
          {cloth?.name}
        </Link>
        <p className="price">{cloth?.price} £</p>
        <div>
          <p>Size:</p>
          <div className="size-box">{item.size}</div>
        </div>
        <div>
          <p>Color:</p>
          <p className="color">{cloth?.colour}</p>
        </div>
        <div>
          <p>Amount:</p>
          <p className="amount">{item.amount}</p>
        </div>
      </Details>
      <img src={cloth?.imgs[0]} alt="cloth example" />
    </ListItem>
  );
};

const ListItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;

  img {
    height: 240px;
  }

  .btns-image {
    display: flex;
  }

  @media (max-width: 650px) {
    img {
      height: 180px;
    }
  }

  @media (max-width: 450px) {
    img {
      height: 120px;
    }
  }

  @media (max-width: 450px) {
    img {
      display: none;
    }
  }
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  div {
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
    align-items: flex-start;
  }

  .size-box {
    border: 2px solid #1d1f22;
    min-width: 2.4rem;
    padding: 0 0.4rem;
    height: 1.2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #e4e4e4;
    font-weight: 700;
  }

  .title {
    font-size: 1.4rem;
    text-decoration: none;
    color: #4a4c4e;
  }

  .title:hover {
    text-decoration: underline;
  }

  .price {
    font-weight: 700;
    font-size: 1.4rem;
  }

  .color,
  .amount {
    font-weight: 700;
    font-size: 1.2rem;
  }

  @media (max-width: 650px) {
    .title,
    .price,
    .color,
    .amount {
      font-size: 1rem;
    }

    div {
      flex-direction: row;
      align-items: center;
    }
  }
`;
