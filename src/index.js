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
    const headerImg = document.querySelector('#header-wrapper');
    systemNavigation( itemMenu , headerImg );

}

function systemNavigation ( itemOrMenu , brand ) {
    if ( !brand && !itemOrMenu ) return;

    brand.addEventListener('click', (event) => {
        event.preventDefault();
        handlerNavigationHeader( event , 'brand');
    });

    itemOrMenu.forEach( obj => {
        obj.addEventListener('click', (event) => {
            event.preventDefault();
            handlerNavigationHeader( event , 'itemOrMenu');
        });
    });
}

function handlerNavigationHeader ( event , idNavigation ) {
    itemsJson.map( items => {
        
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
            document.querySelector(`.${items.class}`).style.display = 'block';
        }
        
        if ( conditions[idNavigation].second ) {
            document.querySelector(`.${items.class}`).style.display = 'none';
        }

        startNavigationInTopPage();
    })
}

function handlerNavigationWithLinks () {
    const cardHome = document.querySelectorAll('.card');
    const cardWithImage = document.querySelectorAll('.cardWithImage-card');

    systemNavigationWithCards( [...cardHome, ...cardWithImage] );
}

function systemNavigationWithCards ( array ) {
    array.forEach( item => {
        item.addEventListener('click' , (e) => {
            let { classItem, pointer } = searchParentNavigation( e.target.parentNode );
            itemsJson.map( items => {
                if ( items.item === pointer ) {
                    document.querySelector(`.${classItem}`).style.display = 'block';
                }
                
                if ( items.item !== pointer ) {
                    console.log({ item: items.item, pointer });
                    document.querySelector(`.${items.class}`).style.display = 'none';
                }

                startNavigationInTopPage();
            })
        })
    })
}

function searchParentNavigation (elm) {
    let items = {
        classItem: undefined,
        pointer: undefined
    };

    let objKeys = [
        'actividades',
        'representaciones',
        'Actividades',
        "Representaciones y alianzas"
    ]

    let search = elm;

    while (  items.classItem === undefined || items.pointer === undefined ) {
        if ( search.id && objKeys.find( key => key === search.id )) {
            items.classItem = search.id;
        }
        
        if ( search?.getAttribute('pointer') && objKeys.find( key => key === search?.getAttribute('pointer') )) {
            items.pointer = search.getAttribute('pointer');
        }

        search = search.parentNode;
    }

    return items;
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
            let conditionProject = section === 'proyectos' ? true : false;
            let conditionClientSlider = section === 'clientes_slider' ? true : false;
            propertyIdx = conditionProject || conditionClientSlider ? iteratorProject : memoryCurrentIterator;
            iteratorProject = conditionProject ? iteratorProject + 1 : 0;
            changeDepth = depth;
        }

        if (section === 'proyectos') {
            console.log({ section, propertyIdx , iteratorProject });
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
