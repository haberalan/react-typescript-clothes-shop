import styled from 'styled-components';

export const AddressForm = () => {
  return (
    <Container>
      <h2>Address</h2>
      <Grid>
        <div>
          <label htmlFor="">Country</label>
          <input type="text" placeholder="Poland" />
        </div>
        <div>
          <label htmlFor="">Voivodeship</label>
          <input type="text" placeholder="Masovian" />
        </div>
      </Grid>
      <Grid>
        <div>
          <label htmlFor="">Street</label>
          <input type="text" placeholder="Funny" />
        </div>
        <div>
          <label htmlFor="">Number</label>
          <input type="text" placeholder="23A" />
        </div>
      </Grid>
      <Grid>
        <div>
          <label htmlFor="">Flat number</label>
          <input type="text" placeholder="2" />
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

  @media (max-width: 510px) {
    width: 260px;
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

  @media (max-width: 510px) {
    width: 260px;
    display: flex;
    flex-direction: column;
  }
`;
