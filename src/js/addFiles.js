import { allImage } from './image';


export class AddFiles {

    #allImageSystem = allImage;

    constructor () {
        this.#addImage();
    }

    #addImage () {
        if ( !this.#allImageSystem ) return;
    
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
                // console.log({ section, propertyIdx , iteratorProject });
            }
    
            if ( section === 'nosotros') {
                let link = obj.parentNode;
                this.#handlerLinksPdf( link , section );
            }
    
            if ( section === 'certificaciones' ) {
                let link = obj.parentNode;
                link.setAttribute('href', this.#allImageSystem[`${section}_doc`][propertyIdx] );
            }
    
            if ( section === 'catalogo' ) {
                let link = obj.parentNode.parentNode.parentNode;
                link.setAttribute('href', this.#allImageSystem[`${section}_doc`][0] );
                // console.log('catalogo', { section , link , img: allImageSystem[`${section}_doc`][propertyIdx], section, propertyIdx});
            }
            
            if ( section === 'representadas' ) {
                let link = obj.parentNode.parentNode.parentNode;
                link.setAttribute('href', this.#allImageSystem[`${section}_doc`][propertyIdx] );
            }
    
            // console.log( 'servicios', { section })
            if ( section === 'actividades' || section === 'services_view') {
            }
    
            img = obj.children[0];
            img.setAttribute( 'src', this.#allImageSystem[section][propertyIdx] );
            propertyIdx = propertyIdx + 1;
            
        }
    }

    #handlerLinksPdf ( obj , section ) {
        const linkInForm = document.querySelector('#formulario');
        let title = undefined;
        let link = undefined;
    
        if ( linkInForm !== undefined ) {
            linkInForm.setAttribute('href', this.#allImageSystem[`formulario_doc`][0] )
        }
    
        if ( section === 'nosotros') {
            title = obj.lastChild.childNodes[0].innerText === "Política de gestión integral";
    
            if ( title ) {
                link = obj.lastChild.childNodes[1].lastChild;
                link.setAttribute('href', this.#allImageSystem[`${section}_doc`][0] );
                
            }
        }
    
    }
}