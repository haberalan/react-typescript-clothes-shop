import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Lottie from 'react-lottie-player';

import { useAppDispatch } from '../common/hooks/useRedux';
import { add } from '../features/cart/cartSlice';
import { ItemImageSlider } from '../common/components/Utils/ItemImageSlider';
import lottieJson from '../common/assets/loading.json';
import { ClothType } from '../types/Cloth';
import { Link } from 'react-router-dom';

export const Item = () => {
  const { id } = useParams();
  const [item, setItem] = useState<ClothType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [enteredSize, setEnteredSize] = useState<null | string>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchItem = async () => {
      setIsLoading(true);
      const res = await fetch(process.env.REACT_APP_API + 'items/one/' + id);

      const data = await res.json();

      if (!res.ok || data === null) {
        setItem(null);
        return setIsLoading(false);
      }

      setEnteredSize(data.sizes[0]);
      setItem(data);
      setIsLoading(false);
    };

    fetchItem();
  }, [id]);

  return (
    <Container>
      {isLoading && <Lottie animationData={lottieJson} play className="loader" />}
      {!item && !isLoading && (
        <>
          <p>There is no item like this.</p>
          <Link to="/">Go home</Link>
        </>
      )}
      {item && !isLoading && (
        <>
          <div className="content">
            <ItemImageSlider images={item.imgs} />
            <Details>
              <h3>{item.name}</h3>
              <div>
                <DetailsItem>
                  <h4>COLOR:</h4>
                  <p>{item.colour}</p>
                </DetailsItem>
                <DetailsItem>
                  <h4>SIZE:</h4>
                  <div>
                    {item.sizes.map((size) => (
                      <SizeBox className={enteredSize === size ? 'choosed' : ''} key={size} onClick={() => setEnteredSize(size)}>
                        {size}
                      </SizeBox>
                    ))}
                  </div>
                </DetailsItem>
                <DetailsItem>
                  <h4>PRICE:</h4>
                  <p>{item.price} £</p>
                </DetailsItem>
              </div>
              <button onClick={() => dispatch(add({ _id: item._id, size: enteredSize as string }))}>ADD TO CART</button>
              <p>{item.desc}</p>
            </Details>
          </div>
          <Link to={`/${item?.forWho}/${item?.category}`}>Go to {item?.category}</Link>
        </>
      )}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  margin: 6rem 0;

  & > a {
    color: inherit;
    font-weight: 700;
    text-decoration: none;
  }

  .content {
    display: flex;
    gap: 8rem;
    justify-content: center;
    align-items: center;
  }
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;

  & > div {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  & > p {
    width: 350px;
    line-height: 1.2;
  }

  h3 {
    color: #4a4c4e;
    font-size: 1.4rem;
    font-weight: 700;
  }

  button {
    align-self: center;
    padding: 1rem 4rem;
    cursor: pointer;
    background: #e4e4e4;
    color: inherit;
    font-weight: 700;
    border: none;
    font-family: inherit;
  }
`;

const DetailsItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;

  h4 {
    font-weight: 700;
  }

  div {
    display: flex;
    gap: 0.6rem;
  }
`;

const SizeBox = styled.div`
  border: 2px solid #1d1f22;
  min-width: 2.4rem;
  padding: 0 0.4rem;
  height: 1.2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  &.choosed {
    background: #e4e4e4;
    font-weight: 700;
  }
`;
