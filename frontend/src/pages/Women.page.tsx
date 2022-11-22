import { CategoriesList } from '../common/components/Utils/CategoriesList';

import styled from 'styled-components';

const categories = ['dresses', 'skirts', 'jeans'];

export const Women = () => {
  return (
    <Container>
      <CategoriesList categories={categories} filter="women" />
      <div>
        <img src="https://images.pexels.com/photos/4380970/pexels-photo-4380970.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="women1" />
        <img src="https://images.pexels.com/photos/10812225/pexels-photo-10812225.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="women2" />
        <img src="https://images.pexels.com/photos/9794893/pexels-photo-9794893.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="women3" />
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
