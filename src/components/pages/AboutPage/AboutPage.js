import React           from 'react';
import { Page, Title } from  '../../shared';


export function AboutPage(props){
  return (
    <Page>
      <Page.Container>
        <Title as="h2" className="mb-5 text-white-3d text-center">About</Title>
        

        <div className="horizontal-ruler">
          <hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/>
          <hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/>
          <hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/>
        </div>


        <p className="text-gray">This demo demonstrates a clean pattern for combining various
        reducers into a <em>single</em> <code>useReducer</code>, which is then exposed through a context provider.
        Initially this demo implemented a custom <code>combineReducers()</code> and custom <code>bindActionCreators()</code>.
        However, after looking at how redux.js works internally I decided to swap those functions out for the redux versions, 
        which provide better error handling.</p>


        <p className="text-gray">That said, this pattern provides global accessibility, modularity, and predictability, and therefore does not
        need to implement redux in its entirety.</p>
      </Page.Container>
    </Page>     
  );
}
