
async function onSubmit(data) {
   let { checked, objInfo } = handleDataForm( data );

   let recapcha = executeRecapcha();

   if ( !recapcha ) {
      return;
   }

   if ( !checked ) {
      return { not_terms: true };
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
      
      let response  = await fetch( 'http://localhost:3000/send-email', options )

      if ( response.status === 200 ) {
         return { successfull: true };
      }
      
      if ( response.status !== 200 ) {
         return { error: true };
      }
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

function executeRecapcha () {
   grecaptcha.enterprise.ready(function() {
      grecaptcha.enterprise.execute('6LcDes8kAAAAAO6p5XE2qSC8IJvJjPg56CwJgfEn', {action: 'submit'})
         .then(function(token) {
            console.log('Se ha generado el token exitosamente');
            document.querySelector('#recaptcha_token').value = token;
            verifyRecaptcha().then( (success) => {
               if ( success ) {
                  return true
               }

               if ( !success ) {
                  return false
               }
            })
      });
   });
}

function verifyRecaptcha(token) {
   return fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: {
         'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: `secret=6LcDes8kAAAAAO6p5XE2qSC8IJvJjPg56CwJgfEn&response=${token}`
   })
      .then(response => response.json())
      .then(data => {
         return data.success;
   });
}

export default onSubmit;