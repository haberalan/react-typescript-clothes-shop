import styled from 'styled-components';

import { CategoriesList } from '../common/components/Utils/CategoriesList';

const categories = ['dresses', 'skirts', 'jeans'];

export const Kids = () => {
  return (
    <Container>
      <CategoriesList categories={categories} filter="kids" />
      <div>
        <img src="https://images.pexels.com/photos/10557479/pexels-photo-10557479.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="kids1" />
        <img src="https://images.pexels.com/photos/10484713/pexels-photo-10484713.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="kids2" />
        <img src="https://images.pexels.com/photos/8083839/pexels-photo-8083839.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="kids3" />
      </div>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  min-height: 80vh;
  flex-direction: column;
  gap: 2rem;
  justify-content: center;
  align-items: center;

  div {
    display: flex;
    gap: 1rem;
  }

  img {
    height: 600px;
  }
`;
