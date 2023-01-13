import "./styles/index.scss";
import Slider from './js/slider';
import { allImageSystemInstance } from './js/image';
import content  from './content.json';
import onSubmit from "./js/form";

const itemsJson = content.menu;
let allImageSystem = undefined;

function handlerViewsInIndex () {
    const itemMenu = document.querySelectorAll('.navigation-bar--list-item');
    
    itemMenu.forEach( obj => {
        obj.addEventListener('click', (event) => {
            event.preventDefault();
            itemsJson.map( items => {
                if ( items.item && items.item === event.target.firstChild.data ) {
                    console.log('listener', items.class, event.target.firstChild.data );
                    // if ( items.class === 'contactenos') {
                    //     return document.querySelector(`.inicio`).style.display = 'block';
                    // }
    
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

    cardHome.forEach( item => {
        item.addEventListener('click' , card => {
            let path = card.path.find( item => item.getAttribute('id') === 'servicios').getAttribute('id');
            // console.log('item', path.getAttribute('id'));
            // let navigateTo = path.className.replace('card', "").replace(" ", "" );
            itemsJson.map( items => {
                if ( items.item === 'Servicios' ) {
                    console.log('navigateTo', items.item, path)
                    document.querySelector(`.${path}`).style.display = 'block';
                }
                
                if ( items.item !== 'Servicios' ) {
                    document.querySelector(`.${items.class}`).style.display = 'none';
                }
            })
        })
    })

    console.log( 'handlerNavigationWithLinks', cardHome );
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
