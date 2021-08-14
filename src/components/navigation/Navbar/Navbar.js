import React, { useState, useEffect, useRef } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Navicon1 }      from './Navicon1'; // eslint-disable-line
import { Navicon2 }      from './Navicon2'; // eslint-disable-line
import './Navbar.scss';


// Since this component is generally only used once in the app, I got
// lazy and decided not to create props for textColor bgColor, etc.
// Instead I just set it all with the stylesheet.
export function Navbar({ brand = "DavTek Industries" }){
  const [ show, setShow ] = useState(false);
  ////////////////////////////////////////////////////////////////////////////////////
  //
  //  isTransitioning was implemented to prevent the possibility of button mashing
  //  causing the navicon and the menu to fall out of sync. I don't even think that's
  //  possible because everything is handled declaratively. In any case, it is set
  //  during parts 1 and 4 respectively of opening and closing, and it is read within the
  //  toggleCollapse method, and used as a flag to conditionally return early if already 
  //  transitioning. It's really not needed, but doesn't hurt at all...
  //
  ////////////////////////////////////////////////////////////////////////////////////
  const [ isTransitioning,  setIsTransitioning ]  = useState(false);
  const [collapseClassName, setCollapseClassName] = useState("collapse navbar-collapse");
  const [collapseStyle,     setCollapseStyle ]    = useState({});
  const collapseRef                               = useRef();

  // hasMountedRef preventd the first useEffect from running on mount,
  // which would cause the links to blink open.
  const hasMountedRef                             = useRef(false);
  const animationTime                             = 350; // 0.35s


  const toggleCollapse = () => {
    if (isTransitioning){ return; }
    setShow(currentValue => !currentValue);
  };


  useEffect(() => {
    if (hasMountedRef.current === true){
      if (show === true){
        //* Opening Part 1.
        setIsTransitioning(true); 
        setCollapseClassName("collapse navbar-collapse collapsing opening show"); // .collapsing will Make height: 0px
  
        //* Opening Part 3.
        setTimeout(() => { 
          if (show === true){ setCollapseClassName("collapse navbar-collapse open show"); }
        }, animationTime);
      }
  
  
      else if (show === false){
        //* Closing Part 1.
        setIsTransitioning(true); 
        const height = collapseRef.current.getBoundingClientRect().height; 
        setCollapseStyle({ height: `${height}px` });
  
        ////////////////////////////////////////////////////////////////////////////////////
        //
        //  Gotcha: 
        //
        //  After setCollapseStyle({ height: `${height}px` }); we want to force reflow.
        //  And after we force the reflow, we want to set new classes, and then set a timeout, etc.
        //
        //    void collapseRef.current.offsetHeight; // https://www.charistheo.io/blog/2021/02/restart-a-css-animation-with-javascript/
        //
        //    setCollapseClassName("collapse navbar-collapse collapsing closing show");
        //
        //    setTimeout(() => {
        //      if (show === false){ setCollapseClassName("collapse navbar-collapse closed"); }
        //    }, animationTime);
        //
        //
        //  The problem is that setCollapseStyle({ height: `${height}px` }); will trigger a rerender,
        //  and it seems like the reflow happens before the rerender finishes.
        //  The solution is to setCollapseStyle({ height: `${height}px` }), then run
        //  a separate useEffect that checks for:
        //  
        //    if (show === false && collapseStyle.hasOwnProperty('height')){ ... }
        //
        //
        //  This condition is only true right at this point, and once it's true we know we
        //  can safely force the reflow.
        //
        ////////////////////////////////////////////////////////////////////////////////////
      }
    } // End of if (hasMountedRef.current === true){ ... }


    else { hasMountedRef.current = true; }    
  }, [show]);

  
  useEffect(() => {
    //* Closing Part 2.
    if (show === false && collapseStyle.hasOwnProperty('height')){
      // Force reflow...
      //const obligatoryAssignment = collapseRef.current.offsetHeight; // eslint-disable-line
      void collapseRef.current.offsetHeight; // https://www.charistheo.io/blog/2021/02/restart-a-css-animation-with-javascript/
      setCollapseClassName("collapse navbar-collapse collapsing closing show");

      //* Closing Part 4.
      setTimeout(() => {
        if (show === false){ 
          setCollapseClassName("collapse navbar-collapse closed"); 
          setIsTransitioning(false); 
        }
      }, animationTime);
    }
  }, [show, collapseStyle]);


  // Setting height must be done AFTER the classes have been applied.
  useEffect(() => {
    //* Opening Part 2.
    if (show === true && collapseClassName === "collapse navbar-collapse collapsing opening show"){
      setCollapseStyle({ height: `${collapseRef.current.scrollHeight}px` });
    }

    //* Opening part 4.
    if (show === true && collapseClassName === "collapse navbar-collapse open show"){
      // Remove the height set programmatically. Why? so that the size of the .navbar-collapse
      // can be controlled by the CSS, so it will be open or closed depending on breakpoint.
      setCollapseStyle({});
      setIsTransitioning(false); 
    }


    //* Closing Part 3.
    if (show === false && collapseClassName === "collapse navbar-collapse collapsing closing show"){
      // Remove the height set programmatically in closing part 1.
      // This allows collapsing to transition from that height down to 0.
      // collapseRef.current.style.height = ''; 
      setCollapseStyle({ });
    }
  }, [show, collapseClassName]);


  return (
    <nav id="primary-navigation" className="navbar navbar-expand-md navbar-dark bg-blue">
      <div className="container-fluid">
        <Link id="brand" className="navbar-brand font-montserrat" to="/">{brand}</Link>
        <Navicon1 show={show} toggleCollapse={toggleCollapse} /> 
        {/* <Navicon2 toggleCollapse={toggleCollapse} /> */}

        <div ref={collapseRef} className={collapseClassName} style={collapseStyle}>
          <div className="navbar-nav ms-auto">
            <NavLink className="nav-link" activeClassName="active-link" to="/about">About</NavLink>
          </div>
        </div>{/* End of <div className collapse navbar-collapse"> */}
      </div>{/* End of <div className="container-fluid"> */}
    </nav>
  );
}