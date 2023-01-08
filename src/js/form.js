
async function onSubmit(data) {
   let { checked, objInfo } = handleDataForm( data );

   if ( !checked ) {
      alert( 'falta tratamiento de datos.' );
   } else {

      const options = {
         method: 'POST',
         headers: new Headers({
            'content-type': 'application/json',
            'Access-Control-Allow-Origin': '*',
         }),
         referrerPolicy: 'no-referrer',
         body: JSON.stringify(objInfo),
         params: objInfo,
         cache: 'default',
      };
      
      fetch( 'http://localhost:3000/send-email', options ).then( res => {
         console.log( 'pass', res );
      }).catch( e => {
         console.error(e);
      });
      
   }

}

function handleDataForm( data ) {
   let namePropInForm = [
      'INPUT',
      'SELECT',
      'TEXTAREA',
   ]
   let arrayData = [];
   let objInfo = {};
   let nameProp = undefined;
   let checked = false;

   for ( let idx in data ) {
      arrayData.push( ...data[idx]);
      arrayData.map( x => {
         if ( x.tagName === 'LABEL' ) {
            nameProp = x.textContent.replace(":", "").replaceAll(" ", "_").toLowerCase();
         }
         
         if ( namePropInForm.find( prop => prop === x.tagName) ) {
            if ( x.checked ) {
               objInfo[nameProp] = x.checked;
               checked = true;
            } else {
               objInfo[nameProp] = x.value;
            }
         }
      });
   }

   return { checked, objInfo };

}


export default onSubmit;