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
        reducers into a <em>single</em> <code>useReducer()</code>, which is then exposed through a context provider.
        Initially this demo implemented a custom <code>combineReducers()</code> and custom <code>bindActionCreators()</code>.
        However, after looking at how redux.js works internally I decided to swap those functions out for the redux versions, 
        which provide better error handling.</p>


        <p className="text-gray">In order to handle actions that are functions we need to be able to implement middleware,
        which is not possible with the default React <code>useReducer()</code>. This means we need to implement a custom hook, which
        can take middleware. Moreover, we probably want this hook to be able to accept redux middleware, such as <code>redux-thunk</code>.</p>

        <p className="text-gray">The best solution I found was to implement <a href="https://github.com/streamich/react-use/blob/master/docs/createReducer.md" target="_blank">createReducer</a>,
        which is a factory function for creating a <code>useCustomReducer</code> hook.
        This hook mimicks Redux, and allows for Redux middleware to be used with it. This also means that any custom
        middleware must adhere to the following pattern:</p>

        
        <pre><code>{`
  const middlewareFx = (store) => (next) => (action) => {
    // Do stuff...
    return next(action);
  };
        `}</code></pre>


        <p className="text-gray">Some would argue that Redux is no longer necessary because we can build out 
        a similar implementation without Redux -as demonstrated by this example. However, if the alternative is 
        done right, you will merely have succeeded in some near approximation of Redux.</p>


        <p className="text-gray">Much of what people dislike about Redux has nothing to do with Redux itself.
        Rather, the nature of implementing types, actions, action creators, bound action creators, reducers, 
        combined reducers, middleware, etc. is inherently complex, requires more boilerplate, 
        and takes longer to achieve. Essentially, it's the same reason people don't want to mess with Typescript -more
        ceremony. In both cases, however, you get a more reliable product.</p>


        <p className="text-gray">Another issue is that Redux can seem scary to the extent that one doesn't <em>really</em> know
        how it works. It always feels more comfortable when the implementation details are known (e.g., you made it yourself!),
        rather than just plugging in some magical code.</p>


        <p className="text-gray">After having built this alternative solution, it differs from Redux in size by some marginal
        amount. It hardly differs in complexity, and is potentially more prone to bugs. It's my opinion that
        any serious project <em>should</em> just go ahead and use Redux.</p>


        <p className="text-gray mb-5">This project made me to think more deeply about how to implement state management without
        Redux, but it also pushed me more into Redux. There are still parts of the Redux internals that are
        obscure to me, but I no longer think of the Redux codebase as a black box (and I've worked with it for years!).
        It's clear to me that attempting to create a similar pattern without Redux is simply a case of reinventing the wheel (whereby the new wheel is probably not
        even as good as the old wheel).</p>
      </Page.Container>
    </Page>     
  );
}
