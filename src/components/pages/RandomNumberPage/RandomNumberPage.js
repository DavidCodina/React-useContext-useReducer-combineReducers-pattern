import React                     from 'react';
import { Page, Title, RandomNumberGenerator } from  '../../shared';



export function RandomNumberPage(props){

  return (
    <Page>
      <Page.Container>
        <Title as="h2" className="mb-5 text-white-3d text-center">Random Number</Title>

        <div className="horizontal-ruler">
          <hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/>
          <hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/>
          <hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/>
        </div>

        <RandomNumberGenerator /> 
      </Page.Container>
    </Page>     
  );
}
