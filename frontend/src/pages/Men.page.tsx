import { CategoriesList } from '../common/components/Utils/CategoriesList';

import styled from 'styled-components';

const categories = ['t-shirt', 'trousers', 'jackets', 'accessories'];

export const Men = () => {
  console.log('render');

  return (
    <Container>
      <CategoriesList categories={categories} filter="men" />
      <div>
        <img src="https://images.pexels.com/photos/9558233/pexels-photo-9558233.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="men1" />
        <img src="https://images.pexels.com/photos/6310924/pexels-photo-6310924.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="men2" />
        <img src="https://images.pexels.com/photos/6764007/pexels-photo-6764007.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="men3" />
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
