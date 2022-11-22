import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { format } from 'date-fns';

import { PurchaseType } from '../../../types/Purchase';

type PurchasesItemProps = {
  item: PurchaseType;
};

export const PurchasesItem = ({ item }: PurchasesItemProps) => {
  return (
    <ListItem>
      <Link to={`/profile/purchase/${item._id}`}>
        <p className="date">{format(new Date(item.createdAt), 'do LLLL yyyy')}</p>
        <p className="price">{item.total} £</p>
      </Link>
    </ListItem>
  );
};

const ListItem = styled.li`
  a {
    background-color: #e4e4e4;
    padding: 1.4rem 1rem;
    text-decoration: none;
    color: inherit;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 1.4rem;
    transition: all 0.2s ease-in-out;

    .date {
      color: #4a4c4e;
    }

    .price {
      font-weight: 700;
    }
  }

  a:hover {
    background-color: #cdcdcd;
  }
`;
