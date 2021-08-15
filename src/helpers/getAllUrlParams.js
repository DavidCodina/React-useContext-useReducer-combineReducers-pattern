// https://www.sitepoint.com/get-url-parameters-with-javascript/

// file:///Users/davidcodina/Desktop/URLSearchParams/index.html?name=David&status=cool
// It's best that this is in ES5 because if you're using this, then there's a
// good chance that you're writing for IE11 compatibility.


export default function getAllUrlParams(url){
  //! If using HashRouter and no url is passed you have to use 'hash'.
  var queryString = '';
  if (url){
    queryString = url.split('?')[1]
  } else if (window.location.search){
    queryString = window.location.search.slice(1);
  } else if (window.location.hash){
    console.log("hash worked.");
    queryString = window.location.hash.split('?')[1];
  }


  var obj = {}; // Store potential parameters.


  if (queryString){
    // Stuff after # is not part of query string, so get rid of it.
    queryString = queryString.split('#')[0];

    //Split queryString into its component parts using '&' as the delimiter.
    var arr = queryString.split('&'); // => ["name=David", "status=cool"]



    //Loop through this array and split each item into a key and a value,
    //which we’ll soon put into our object:
    for (var i = 0; i < arr.length; i++) {
      //Separate the keys and the values
      var a = arr[i].split('=');

      //Set parameter name and value (use 'true' if empty)
      //If there isn’t a parameter value, the value gets set to true (to indicate that the parameter name exists).
      //Feel free to change this depending on your use case.
      var paramName  = a[0];
      var paramValue = typeof (a[1]) === 'undefined' ? true : a[1];

      //////////////////////////////////////////////////////////////////
      //
      //  Optional: Keep case consistent.
      //  You can set all parameter names and values to lowercase.
      //  That way, you can avoid situations where someone sends traffic to
      //  a URL with example=TRUE instead of example=true and your script breaks.
      //  However, if your query string needs to be case sensitive, feel free to omit this part
      //
      //  In my opinion this seems like a bad default, but it
      //  was part of the original implementation.
      //
      //////////////////////////////////////////////////////////////////
      // paramName = paramName.toLowerCase();
      // if (typeof paramValue === 'string') paramValue = paramValue.toLowerCase();


      //////////////////////////////////////////////////////////////////
      //
      //  Next, we need to deal with the various types of input we can receive in paramName.
      //  This could be an indexed array, a non-indexed array, or a regular string.
      //
      //  To illustrate this, here’s some sample input, with the output we would expect:
      //
      //      getAllUrlParams('http://example.com/?colors[0]=red&colors[2]=green&colors[6]=blue');
      //      // { "colors": [ "red", null, "green", null, null, null, "blue" ] }
      //
      //      getAllUrlParams('http://example.com/?colors[]=red&colors[]=green&colors[]=blue');
      //      // { "colors": [ "red", "green", "blue" ] }
      //
      //      getAllUrlParams('http://example.com/?colors=red&colors=green&colors=blue');
      //      // { "colors": [ "red", "green", "blue" ] }
      //
      //      getAllUrlParams('http://example.com/?product=shirt&color=blue&newuser&size=m');
      //      // { "product": "shirt", "color": "blue", "newuser": true, "size": "m" }
      //
      //
      //////////////////////////////////////////////////////////////////

      // If the paramName ends with square brackets,then do this:
      // Example: ?name=David&numbers[]=123&numbers[]=456&numbers[]=789
      // Inside this if statement we further delineate between indexed and
      // non-indexed array.
      if (paramName.match(/\[(\d+)?\]$/)){
        //Create key if it doesn't exist
        var key = paramName.replace(/\[(\d+)?\]/, '');
        if (!obj[key]){ obj[key] = []; }

        // If it's an indexed array e.g. colors[2]
        // If it’s an indexed array, we want the corresponding paramValue to be an array,
        // with the value inserted at the correct position.
        if (paramName.match(/\[\d+\]$/)) {
          //Get the index value and add the entry at the appropriate position
          var index = /\[(\d+)\]/.exec(paramName)[1];
          obj[key][index] = paramValue;


        // Otherwise add the value to the end of the array
        // If it’s a non-indexed array, we want the corresponding paramValue to be
        // an array with the element pushed on to it.
        } else {
          obj[key].push(paramValue);
        }
      // Otherwise we're dealing with a string.
      // If it’s a string, we want to create a regular property on the object and
      // assign the paramValue to it, unless the property already exists,
      // in which case we want to convert the existing paramValue to an array and push
      // the incoming paramValue on to that.
      //End of: if (paramName.match(/\[(\d+)?\]$/)){ ... }
      } else {
        if (!obj[paramName]){ // eslint-disable-line no-lonely-if
          //If it doesn't exist, create property
          obj[paramName] = paramValue;
        } else if (obj[paramName] && typeof obj[paramName] === 'string'){
          //If property does exist and it's a string, convert it to an array
          obj[paramName] = [obj[paramName]];
          obj[paramName].push(paramValue);
        } else {
          //Otherwise add the property
          obj[paramName].push(paramValue);
        }
      }
    }
  }

  //////////////////////////////////////////////////////////////////////
  //
  // Finally, we return our object with the parameters and values.
  // If your URL has any encoded special characters like spaces (encoded as %20),
  // you can also decode them to get the original value like this:
  //
  //    // assume a url parameter of test=a%20space
  //
  //      var original = getAllUrlParams().test; // 'a%20space'
  //      var decoded = decodeURIComponent(original); // 'a space'
  //
  //
  //  Just be careful not to decode something that’s already decoded or
  //  else your script will error out, especially if percents are involved.
  //
  //////////////////////////////////////////////////////////////////////
  return obj;
}

// Usage:
// const qs     = window.location.search;
// const params = getAllUrlParams(qs);
// console.log(params); // => { name: "david", status: "cool" }
//
// If no argument is passed, then it will get it from window.location.search.
// Also because we are returning an object we can chain the specific property we are looking for.
// console.log(getAllUrlParams().name); // => David
