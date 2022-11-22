import styled from 'styled-components';

export const AddressBox = () => {
  return (
    <Container>
      <h2>Address</h2>
      <Grid>
        <div>
          <label htmlFor="">Country</label>
          <input type="text" />
        </div>
        <div>
          <label htmlFor="">Country</label>
          <input type="text" />
        </div>
      </Grid>
      <Grid>
        <div>
          <label htmlFor="">Street</label>
          <input type="text" />
        </div>
        <div>
          <label htmlFor="">Apartment</label>
          <input type="text" />
        </div>
      </Grid>
      <Grid>
        <div>
          <label htmlFor="">Flat number</label>
          <input type="text" />
        </div>
      </Grid>
    </Container>
  );
};

const Container = styled.form`
  width: 500px;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  h2 {
    font-weight: 700;
    font-size: 1.8rem;
  }

  label {
    font-size: 1.2rem;
    color: #4a4c4e;
  }

  input {
    padding: 0.2rem 0.4rem;
    border-radius: 2px;
    font-size: 1rem;
    font-family: inherit;
    color: inherit;
    border: 1px solid #1d1f22;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;

  div {
    width: 100%;
    display: flex;
    gap: 0.4rem;
    flex-direction: column;
  }

  input {
    box-sizing: border-box;
    width: 100%;
  }
`;
