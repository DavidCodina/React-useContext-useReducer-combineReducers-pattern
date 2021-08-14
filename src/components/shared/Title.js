import React from 'react'; 


// https://levelup.gitconnected.com/create-more-extensible-react-components-with-the-as-prop-pattern-b79bcbcf4024
export function Title(props){
  const { children, as: Component = 'h1', className = '', style = {} } = props;

  // {...props} is used to pass in any additional props. For example, if using <a>,
  // one could pass in href, target, etc.
  return <Component className={className} style={style} {...props}>{children}</Component>
}