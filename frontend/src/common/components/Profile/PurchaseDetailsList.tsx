import styled from 'styled-components';

import { CartType } from '../../../types/Cart';
import { PurchaseDetailsItem } from './PurchaseDetailsItem';

type PurchaseDetailsListProps = {
  items: CartType[];
};

export const PurchaseDetailsList = ({ items }: PurchaseDetailsListProps) => {
  return (
    <List>
      {items.map((item) => (
        <PurchaseDetailsItem key={item._id + item.size} item={item} />
      ))}
    </List>
  );
};

const List = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 600px;
  padding: 0.4rem 1rem;
  overflow-y: auto;
  max-height: 300px;

  &::-webkit-scrollbar {
    height: 10px;
    width: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #4a4c4e;
    border-radius: 3px;
  }

  &::-webkit-scrollbar-track {
    border-radius: 3px;
    background-color: #e4e4e4;
  }

  &::-webkit-scrollbar-corner {
    display: none;
  }

  @media (max-width: 650px) {
    gap: 2rem;
    width: 400px;
  }

  @media (max-width: 450px) {
    width: 260px;
    padding: 0;
  }
`;
