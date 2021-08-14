import React                     from 'react';
import { Page, Title, Counter, RandomNumberGenerator } from  '../../shared';



export function HomePage(props){

  return (
    <Page>
      <Page.Container>
        <Title as="h2" className="mb-5 text-white-3d text-center">Combined Reducers</Title>

        <div className="horizontal-ruler">
          <hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/>
          <hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/>
          <hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/>
        </div>

        <Counter />

        <RandomNumberGenerator /> 
      </Page.Container>
    </Page>     
  );
}
