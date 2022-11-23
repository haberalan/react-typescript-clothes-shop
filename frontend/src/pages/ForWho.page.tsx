import { CategoriesList } from '../common/components/Utils/CategoriesList';

import styled from 'styled-components';

type ForWhoProps = {
  forWho: string;
};

const menCategories = ['t-shirt', 'trousers', 'jackets', 'accessories'];
const womenCategories = ['dresses', 'skirts', 'jeans'];
const kidsCategories = ['test'];

const men = [
  'https://images.pexels.com/photos/9558233/pexels-photo-9558233.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  'https://images.pexels.com/photos/6310924/pexels-photo-6310924.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  'https://images.pexels.com/photos/6764007/pexels-photo-6764007.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
];
const women = [
  'https://images.pexels.com/photos/4380970/pexels-photo-4380970.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  'https://images.pexels.com/photos/10812225/pexels-photo-10812225.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  'https://images.pexels.com/photos/9794893/pexels-photo-9794893.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
];
const kids = [
  'https://images.pexels.com/photos/10557479/pexels-photo-10557479.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  'https://images.pexels.com/photos/10484713/pexels-photo-10484713.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  'https://images.pexels.com/photos/8083839/pexels-photo-8083839.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
];

export const ForWho = ({ forWho }: ForWhoProps) => {
  const images = forWho === 'men' ? men : forWho === 'women' ? women : kids;

  const categories = forWho === 'men' ? menCategories : forWho === 'women' ? womenCategories : kidsCategories;

  return (
    <Container>
      <CategoriesList categories={categories} filter={forWho} />
      <div>
        <img src={images[0]} alt={forWho + '1'} />
        <img src={images[1]} alt={forWho + '2'} />
        <img src={images[2]} alt={forWho + '3'} />
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
