import React                    from 'react';
import { Page, Title, Counter } from  '../../shared';



export function CounterPage(props){

  return (
    <Page>
      <Page.Container>
        <Title as="h2" className="mb-5 text-white-3d text-center">Counter</Title>

        <div className="horizontal-ruler">
          <hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/>
          <hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/>
          <hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/>
        </div>

        <Counter />
      </Page.Container>
    </Page>     
  );
}
