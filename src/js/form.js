import environment from "../environment.json";

export class FormData {

   constructor () {
      this.#formData();
   }

   #formData () {
      const btnSubmit = document.querySelector('#btn-submit');
      btnSubmit.addEventListener('click', async (e) => {
            e.preventDefault();
            let formData = document.querySelector('.form').childNodes;
            let formFields = [];
            let response = undefined;

            formData.forEach( item => {
               formFields.push(item.childNodes);
            });

            response = await this.#onSubmit(formFields);

            // console.log( 'response', response );
            if ( response.not_terms ) {
               this.#handlerModalForm('not-terms');
            }

            if ( response.successfull ) {
               this.#handlerModalForm('successfull');
            }

            if ( response.error ) {
               this.#handlerModalForm('error');
            }

            if ( response.recapcha ) {
               this.#handlerModalForm('recapcha');
            }
      });
   }

   #executeRecapcha () {
      return new Promise((resolve, reject) => {
         grecaptcha.ready( async () => {
            let token = await grecaptcha.execute(`${environment.production.recapcha.key_public}`, {action: 'submit'})
            let verify = this.#verifyRecaptcha(token)
            if ( verify ) {
               // console.log('Se ha generado el token exitosamente');
               resolve( true );
            } else {
               reject( false );
            }
         })
      })
      
   }

   #verifyRecaptcha(token) {
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
            // console.log({ error });
            return false;
      });
   }

   #handlerModalForm ( key ) {
      const modal = document.querySelector(`#${key}`);
      let button = undefined
      if ( modal && modal !== undefined ) {
            button = modal?.lastChild?.lastChild?.childNodes;
            modal.style.display = 'block';

            if ( button !== undefined ) {
               button.forEach( item => {
                  item.addEventListener('click', () => {
                        modal.style.display = 'none';
                  });
               })
            }
      }
      return; 
   }

   async #handleDataForm( data ) {
      let namePropInForm = [
         'INPUT',
         'SELECT',
         'TEXTAREA',
      ]
      let arrayData = [];
      let objInfo = {};
      let nameProp = undefined;
      let checked = false;
      let typeValidation = {
         text: /^[a-zA-Z0-9\s]+$/,
         email: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
         tel: /^[0-9]+$/,
         textarea: /^[a-zA-Z0-9\s\.,;:_-]+$/ 
      }
   
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

               if ( !x.checked && nameProp && nameProp === 'clase_de_solicitud') {
                  objInfo[nameProp] = x.value;
               }

               if ( !x.checked && nameProp ) {
                  let allow = typeValidation[x.type].test( x.value )
                  if ( allow ) {
                     objInfo[nameProp] = x.value;
                  }
               }
   
            }
         });
      }
      
      return { checked, objInfo  };
   
   }

   async #onSubmit(data) {
      let response = undefined;
      let token = await this.#executeRecapcha();
      let { checked, objInfo } = await this.#handleDataForm( data );
   
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
            response  = await fetch( 'https://petrolcarbon.com:26637/send-email', options )
            // console.log({response})
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
}