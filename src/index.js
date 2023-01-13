import "./styles/index.scss";
import Slider from './js/slider';
import { allImageSystemInstance } from './js/image';
import content  from './content.json';
import onSubmit from "./js/form";

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
    console.log('systemNavigationWithCards', array );
    array.forEach( item => {
        item.addEventListener('click' , (card) => {
            let path = card.path.find( item => item.getAttribute('id') === 'actividades' || item.getAttribute('id') === 'representaciones' );
            let classItem = path.getAttribute('id');
            let pointer = path.getAttribute('pointer');
            console.log('item', path.getAttribute('pointer') );
            itemsJson.map( items => {
                if ( items.item === pointer ) {
                    document.querySelector(`.${classItem}`).style.display = 'block';
                }
                
                if ( items.item !== pointer ) {
                    document.querySelector(`.${items.class}`).style.display = 'none';
                }
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
        
        if ( depth !== changeDepth && section === 'proyectos') {
            propertyIdx = memoryCurrentIterator;
            changeDepth = depth;
            // console.log({ propertyIdx, changeDepth , currentIterator });
        }
        // console.log( 'certificaciones', { section, propertyIdx, result: allImageSystem[section][propertyIdx] });
        
        img = obj.children;
        img[0].setAttribute( 'src', allImageSystem[section][propertyIdx] );
        propertyIdx = propertyIdx + 1;

    }
}


function formData () {
    const btnSubmit = document.querySelector('#btn-submit');
    btnSubmit.addEventListener('click', (e) => {
        e.preventDefault();
        let formData = document.querySelector('.form').childNodes;
        let formFields = [];

        formData.forEach( item => {
            formFields.push(item.childNodes);
        });

        onSubmit(formFields);
    });
}

(function () {
    new Slider ('.slider', false);
    handlerViewsInIndex();
    handlerMenuInResponsive();
    allImageSystem = allImageSystemInstance();
    addImage();
    formData();
    handlerNavigationWithLinks();
})();
