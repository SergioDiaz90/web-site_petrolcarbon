import "./styles/index.scss";
import Slider from './js/slider';
import { allImageSystemInstance } from './js/image';
import content  from './content.json';
import onSubmit from "./js/form";
import SliderClients from "./js/slider-clientes";

const itemsJson = content.menu;
let allImageSystem = undefined;

function handlerViewsInIndex () {
    const itemMenu = document.querySelectorAll('.navigation-bar--list-item');
    const headerImg = document.querySelector('.header-wrapper');
    console.log('handlerViewsInIndex', itemMenu );
    systemNavigation( itemMenu );

}

function systemNavigation ( itemOrMenu ) {
    itemOrMenu.forEach( obj => {
        obj.addEventListener('click', (event) => {
            event.preventDefault();
            itemsJson.map( items => {
                if ( items.item && items.item === event.target.firstChild.data ) {
                    // console.log('listener', items.class, event.target.firstChild.data );
                    document.querySelector(`.${items.class}`).style.display = 'block';
                }
                
                if ( items.item && items.item !== event.target.firstChild.data ) {
                    // console.log( 'handlerViewsInIndex', items.class, false , items.item, event.target.text);
                    document.querySelector(`.${items.class}`).style.display = 'none';
                }

                startNavigationInTopPage();
            })
        });
    });
}

function handlerNavigationWithLinks () {
    const cardHome = document.querySelectorAll('.card');
    const cardWithImage = document.querySelectorAll('.cardWithImage-card');

    systemNavigationWithCards( [...cardHome, ...cardWithImage] );
}


function systemNavigationWithCards ( array ) {
    array.forEach( item => {
        item.addEventListener('click' , (card) => {
            let path = card.path.find( item => item.getAttribute('id') === 'actividades' || item.getAttribute('id') === 'representaciones' );
            let classItem = path.getAttribute('id');
            let pointer = path.getAttribute('pointer');
            itemsJson.map( items => {
                if ( items.item === pointer ) {
                    document.querySelector(`.${classItem}`).style.display = 'block';
                }
                
                if ( items.item !== pointer ) {
                    document.querySelector(`.${items.class}`).style.display = 'none';
                }

                startNavigationInTopPage();
            })
        })
    })
}

function handlerMenuInResponsive () {
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

function addImage () {
    if ( !allImageSystem ) return;

    const imgItems = document.querySelectorAll('#img');
    let beforeSection = undefined;
    let section = undefined;
    let beforeSectionDepth = undefined;
    let depth = undefined;
    let propertyIdx = undefined;
    let img = undefined;
    let currentIterator = 0;
    let changeDepth = undefined;
    let memoryCurrentIterator = 0;
    let iteratorProject = 0;

    for ( let [idx, obj] of imgItems.entries() ) {
        section = obj.getAttribute('section');
        depth = obj.getAttribute('value');

        if ( !beforeSection ) {
            beforeSection = section;
            propertyIdx = idx;
        }
        
        if ( beforeSection !== section && depth === 'false') {
            beforeSection = section;
            propertyIdx = 0;
        }
        
        if ( depth === 'true') {
            currentIterator = propertyIdx;
            changeDepth = depth;
            
            if ( beforeSection !== section ) {
                beforeSectionDepth = beforeSection;
                beforeSection = section;
                memoryCurrentIterator = currentIterator;
                propertyIdx = 0;
            }
        }
        
        if ( depth !== changeDepth ) {
            let condition = section === 'proyectos' || section === 'clientes_slider' ? true : false;
            propertyIdx = condition ? iteratorProject : memoryCurrentIterator;
            iteratorProject = condition ? iteratorProject + 1 : 0;
            changeDepth = depth;
        }

        if ( section === 'nosotros') {
            let link = obj.parentNode;
            handlerLinksPdf( link , section );
        }

        if ( section === 'certificaciones' ) {
            let link = obj.parentNode;
            link.setAttribute('href', allImageSystem[`${section}_doc`][propertyIdx] );
        }

        if ( section === 'catalogo' ) {
            let link = obj.parentNode.parentNode.parentNode;
            link.setAttribute('href', allImageSystem[`${section}_doc`][0] );
            // console.log('catalogo', { section , link , img: allImageSystem[`${section}_doc`][propertyIdx], section, propertyIdx});
        }
        
        if ( section === 'representadas' ) {
            let link = obj.parentNode.parentNode.parentNode;
            link.setAttribute('href', allImageSystem[`${section}_doc`][propertyIdx] );
        }

        // console.log( 'servicios', { section })
        if ( section === 'actividades' || section === 'services_view') {
        }

        img = obj.children;
        img[0].setAttribute( 'src', allImageSystem[section][propertyIdx] );
        propertyIdx = propertyIdx + 1;
        
    }
}

function formData () {
    const btnSubmit = document.querySelector('#btn-submit');
    btnSubmit.addEventListener('click', async (e) => {
        e.preventDefault();
        let formData = document.querySelector('.form').childNodes;
        let formFields = [];

        formData.forEach( item => {
            formFields.push(item.childNodes);
        });

        let response = await onSubmit(formFields);

        console.log( 'response', response );
        if ( response.not_terms ) {
            handlerModalForm('not-terms');
        }

        if ( response.successfull ) {
            handlerModalForm('successfull');
        }

        if ( response.error ) {
            handlerModalForm('error');
        }
    });
}

function handlerModalForm ( key ) {
    console.log('handlerModalForm', key );
    const modal = document.querySelector(`#${key}`);
    let button = undefined
    if ( modal !== undefined ) {
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

function startNavigationInTopPage () {
    document.querySelector('body').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function handlerLinksPdf ( obj , section ) {
    const linkInForm = document.querySelector('#formulario');
    let title = undefined;
    let link = undefined;

    if ( linkInForm !== undefined ) {
        linkInForm.setAttribute('href', allImageSystem[`formulario_doc`][0] )
    }

    if ( section === 'nosotros') {
        title = obj.lastChild.childNodes[0].innerText === "Política de gestión integral";

        if ( title ) {
            link = obj.lastChild.childNodes[1].lastChild.childNodes;
            link.forEach( item => {
                item.setAttribute('href', allImageSystem[`${section}_doc`][0] );
            })
        }
    }

}


(function () {
    new Slider ('.slider', true );
    new SliderClients('.sliderVariousImage-content');
    handlerViewsInIndex();
    handlerMenuInResponsive();
    allImageSystem = allImageSystemInstance();
    addImage();
    formData();
    handlerNavigationWithLinks();
    handlerModalForm();
})();
