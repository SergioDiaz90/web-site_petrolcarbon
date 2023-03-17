import environment from "../environment.json";

function executeRecapcha () {
   return new Promise((resolve, reject) => {
      grecaptcha.ready( async () => {
         let token = await grecaptcha.execute(`${environment.production.recapcha.key_public}`, {action: 'submit'})
         if ( token ) {
            let verify = verifyRecaptcha(token)
            console.log('Se ha generado el token exitosamente');
            resolve( true );
         } else {
            reject( false );
         }
      })
   })
   
}

async function onSubmit(data) {
   let response = undefined;
   let token = await executeRecapcha();
   let { checked, objInfo } = await handleDataForm( data );

   if ( !checked ) {
      return { not_terms: true };
   }

   if ( checked ) {
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
      
      
      if ( token ) {
         response  = await fetch( 'http://localhost:3000/send-email', options )
      } else {
         return { recapcha: true };
      }

      if ( response.status === 200 ) {
         return { successfull: true };
      }
      
      if ( response.status !== 200 ) {
         return { error: true };
      }
   }

}

async function handleDataForm( data ) {
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
      arrayData.map( async x => {
         if ( x.tagName === 'LABEL' ) {
            nameProp = x.textContent.replace(":", "").replaceAll(" ", "_").toLowerCase();
         }
         
         if ( namePropInForm.find( prop => prop === x.tagName) ) {
            if ( x.checked ) {
               objInfo[nameProp] = x.checked;
               checked = true;
            }

            if ( !x.checked && nameProp ) {
               objInfo[nameProp] = x.value;
            }

         }
      });
   }
   
   console.log({ checked, objInfo });
   return { checked, objInfo  };

}

function verifyRecaptcha(token) {
   return fetch('https://www.google.com/recaptcha/api/siteverify', {
      mode: 'no-cors',
      method: 'POST',
      headers: {
         'Content-Type': 'application/x-www-form-urlencoded',
         'Access-Control-Allow-Origin': '*'
      },
      body: `secret=${environment.production.recapcha.key_secret}&response=${token}`
   }).then( response => {
         return true
   }).catch( error => {
         console.log({ error });
         return false;
   });
}

export default onSubmit;