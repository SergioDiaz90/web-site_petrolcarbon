import content  from '../content.json';
import environment from "../environment.json";

export class HandlerNavigation {
    #itemsMenu = undefined;
    #brandImg = undefined;
    #itemsJson = content.menu;
    #environment = environment

    constructor () {
        this.#itemsMenu = document.querySelectorAll('.navigation-bar--list-item');
        this.#brandImg = document.querySelector('#header-wrapper');
        this.#systemNavigation();
        this.#handlerNavigationWithLinks();
        this.#handlerMenuInResponsive ();
    }

    #systemNavigation () {
        if ( !this.#brandImg && !this.#itemsMenu ) return;

        this.#brandImg.addEventListener('click', (event) => {
            event.preventDefault();
            this.#handlerNavigationHeader( event , 'brand');
        });

        this.#itemsMenu.forEach( obj => {
            obj.addEventListener('click', (event) => {
                event.preventDefault();
                this.#handlerNavigationHeader( event , 'itemOrMenu');
            });
        });
    }

    #handlerNavigationHeader ( event , idNavigation ) {
        this.#itemsJson.map( items => {
            
            let conditions = {
                brand: {
                    first: items.item && items.item === "Inicio",
                    second: items.item && items.item !== "Inicio",
                },
                
                itemOrMenu: {
                    first: items.item && items.item === event.target.firstChild?.data,
                    second: items.item && items.item !== event.target.firstChild?.data  
                }
            }

            if ( conditions[idNavigation].first ) {
                let addScriptRecapcha = `${items.class}` === 'contactenos' ? true : false;
                document.querySelector(`.${items.class}`).style.display = 'block';
                this.#handlerInsertOrDeleteJsRecapcha( addScriptRecapcha );
            }
            
            if ( conditions[idNavigation].second ) {
                document.querySelector(`.${items.class}`).style.display = 'none';
            }

            this.#startNavigationInTopPage();

        })
    }

    #validateElementRecapchaExist () {
        let scriptRecapcha = document.querySelector('#scriptRecapcha');
        return scriptRecapcha === null ? false : true;
    }

    #handlerInsertOrDeleteJsRecapcha ( shown ) {
        let head = document.head;
        let divRecapcha = undefined;
        let imgRecapcha = undefined;
        let token = undefined;
        
        if ( !this.#validateElementRecapchaExist () && shown ) {
            // console.log('handlerInsertOrDeleteJsRecapcha');
            let scriptRecapcha = document.createElement('script');
            scriptRecapcha.id = "scriptRecapcha";
            scriptRecapcha.src = `https://www.google.com/recaptcha/api.js?render=${this.#environment.production.recapcha.key_public}`;
            head.appendChild( scriptRecapcha );
    
            return true
        }
    
        if ( this.#validateElementRecapchaExist () && !shown ) {
            imgRecapcha = document.querySelector('[crossorigin = "anonymous"]');
            divRecapcha = document.querySelector('.grecaptcha-badge');
            divRecapcha.remove();
            scriptRecapcha.remove();
            imgRecapcha.remove();
        }
    }

    #startNavigationInTopPage ( card = undefined ) {
        if ( card !== undefined ) {
            setTimeout(() => {
                const section = document.querySelector(`#${card}`);
                return window.scrollTo({
                    top: section.offsetTop - 300,
                    behavior: 'smooth'
                });
            }, 0 );
        } else {
    
            document.querySelector('body').scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    
    }

    #handlerNavigationWithLinks () {
        const cardHome = document.querySelectorAll('.card');
        const cardWithImage = document.querySelectorAll('.cardWithImage-card');
    
        this.#systemNavigationWithCards( [...cardHome, ...cardWithImage] );
    }

    #systemNavigationWithCards ( array ) {
        array.forEach( item => {
            item.addEventListener('click' , (e) => {
                let { classItem, pointer, location } = this.#searchParentNavigation( e.target.parentNode );
                // console.log({ classItem, pointer, location })
                this.#itemsJson.map( items => {
                    if ( items.item === pointer ) {
                        document.querySelector(`.${classItem}`).style.display = 'block';
                    }
                    
                    if ( items.item !== pointer ) {
                        document.querySelector(`.${items.class}`).style.display = 'none';
                    }
    
                    this.#startNavigationInTopPage( location );
                })
            })
        })
    }

    #searchParentNavigation (elm) {
        let items = {
            classItem: undefined,
            pointer: undefined,
            location: undefined
        };
    
        let objKeys = [
            'actividades',
            'representaciones',
            'Actividades',
            "Representaciones y alianzas"
        ]
    
        let locations = [
            "venta-de-equipos",
            "asistencia-tecnica",
            "capacitacion-teorico-practica",
            "soluciones-tecnológicas-de-alto-desempeño-para-turbomaquinaria",
            "productos-y-servicios-para-procesos-de-refinacion-y-petroquímica",
            "soluciones-en-generacion-electrica-y-energías-alternativas",
            "valvulas-e-instrumentacion-tuberia-y-accesorios"
        ]
    
        let search = elm;
    
        while (  items.classItem === undefined || items.pointer === undefined ) {
            if ( search.id && objKeys.find( key => key === search.id )) {
                items.classItem = search.id;
            }
            
            if ( search?.getAttribute('location') && locations.find( key => key === search?.getAttribute('location'))) {
                items.location = search.getAttribute('location');
            }
    
            if ( search?.getAttribute('pointer') && objKeys.find( key => key === search?.getAttribute('pointer'))) {
                items.pointer = search.getAttribute('pointer');
            }
    
            search = search.parentNode;
    
        }
    
        return items;
    }

    #handlerMenuInResponsive () {
        const hamburgerMenu = document.querySelector('.navigation-bar--menu-btn');
        const listMenu = document.querySelector('.navigation-bar--list');
        const blocked = document.querySelector('.navigation-bar--blocked');
    
        hamburgerMenu.addEventListener('click', () => {
            listMenu.classList.toggle('active');
            blocked.classList.toggle('active');
        })
    
        listMenu.addEventListener('click', () => {
            listMenu.classList.toggle('active');
            blocked.classList.toggle('active');
        })
    
        blocked.addEventListener('click', () => {
            listMenu.classList.toggle('active');
            blocked.classList.toggle('active');
        })
    }
}
