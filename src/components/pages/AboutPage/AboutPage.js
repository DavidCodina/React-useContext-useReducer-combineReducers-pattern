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
        Redux offers global accessibility, modularity, and predictability. This pattern does that as well, and therefore
        eliminates the need for Redux.</p>


        <p className="text-gray">It's obviously more involved than just this function, 
        but the <code>combineReducers</code> helper is at the heart of it:</p>


        <pre><code>{`
  const combineReducers = (slices) => {
    return (
      function rootReducer(state, action){
        return Object.keys(slices).reduce(
          (acc, prop) => {
            return {
              ...acc,
              [prop]: slices[prop](acc[prop], action),
            }
          },
          state
        );
      }
    );
  };
        `}</code></pre>
      </Page.Container>
    </Page>     
  );
}
