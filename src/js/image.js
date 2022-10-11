import logo_petrolcarbon from '../assets/logo_petrolcarbon.png';
import slider_1 from '../assets/slider/slider_1.jpg';
import slider_2 from '../assets/slider/slider_2.jpg';
import slider_3 from '../assets/slider/slider_3.jpg';
import capacitacion from '../assets/productos-servicios/capacitacion.jpg';
import venta_de_equipos from '../assets/productos-servicios/venta_de_equipos.jpg';
import asistencia_tecnica from '../assets/productos-servicios/asistencia_tecnica.jpg';
import soluciones_1 from '../assets/representadas/soluciones_1.png';
import soluciones_2 from '../assets/representadas/soluciones_2.jpg';
import soluciones_3 from '../assets/representadas/soluciones_3.jpg';
import soluciones_4 from '../assets/representadas/soluciones_4.jpg';
import soluciones_5 from '../assets/representadas/soluciones_5.png';
import soluciones_6 from '../assets/representadas/soluciones_6.jpg';
import soluciones_7 from '../assets/representadas/soluciones_7.jpg';
import soluciones_8 from '../assets/representadas/soluciones_8.jpg';
import soluciones_9 from '../assets/representadas/soluciones_9.png';
import soluciones_10 from '../assets/representadas/soluciones_10.jpg';
import soluciones_11 from '../assets/representadas/soluciones_11.jpg';
import mision from '../assets/quienes-somos/mision.jpg';
import politica_calidad from '../assets/quienes-somos/politica_calidad.jpg';
import vision from '../assets/quienes-somos/vision.jpg';
import objetivo_calidad from '../assets/quienes-somos/objetivo_calidad.jpg';
import gas_1 from '../assets/clientes/gas_1.jpg';
import gas_2 from '../assets/clientes/gas_2.jpg';
import gas_3 from '../assets/clientes/gas_3.jpg';
import gas_4 from '../assets/clientes/gas_4.jpg';
import gas_5 from '../assets/clientes/gas_5.jpg';
import gas_6 from '../assets/clientes/gas_6.jpg';
import gas_9 from '../assets/clientes/gas_9.jpg';
import gas_10 from '../assets/clientes/gas_10.jpg';
import gas_11 from '../assets/clientes/gas_11.jpg';
import gas_12 from '../assets/clientes/gas_12.jpg';
import gas_13 from '../assets/clientes/gas_13.jpg';
import gas_14 from '../assets/clientes/gas_14.jpg';
import gas_15 from '../assets/clientes/gas_15.jpg';
import gas_16 from '../assets/clientes/gas_16.jpg';
import gas_17 from '../assets/clientes/gas_17.jpg';
import gas_18 from '../assets/clientes/gas_18.jpg';
import gas_19 from '../assets/clientes/gas_19.jpg';
import gas_20 from '../assets/clientes/gas_20.jpg';
import gas_21 from '../assets/clientes/gas_21.jpg';
import gas_22 from '../assets/clientes/gas_22.jpg';
import gas_23 from '../assets/clientes/gas_23.jpg';
import gas_24 from '../assets/clientes/gas_24.jpg';
import gas_25 from '../assets/clientes/gas_25.jpg';
import gas_26 from '../assets/clientes/gas_26.jpg';
import proyecto_1 from '../assets/proyectos/proyecto_1.jpg';
import proyecto_2 from '../assets/proyectos/proyecto_2.png';
import proyecto_3 from '../assets/proyectos/proyecto_3.png';
import proyecto_4 from '../assets/proyectos/proyecto_4.png';
import proyecto_5 from '../assets/proyectos/proyecto_5.png';
import proyecto_6 from '../assets/proyectos/proyecto_6.png';
import proyecto_7 from '../assets/proyectos/proyecto_7.png';
import proyecto_8 from '../assets/proyectos/proyecto_8.png';
import proyecto_9 from '../assets/proyectos/proyecto_9.png';
import empresa_1 from '../assets/empresas/empresa_1.png';
import empresa_2 from '../assets/empresas/empresa_2.png';
import proyecto_2_1 from '../assets/empresas/proyecto_2_1.png'
import proyecto_3_1 from '../assets/empresas/proyecto_3_1.png'
import proyecto_4_1 from '../assets/empresas/proyecto_4_1.png'
import proyecto_4_2 from '../assets/empresas/proyecto_4_2.png'
import proyecto_5_1 from '../assets/empresas/proyecto_5_1.png'
import proyecto_5_2 from '../assets/empresas/proyecto_5_2.png'
import proyecto_6_1 from '../assets/empresas/proyecto_6_1.png'
import proyecto_7_1 from '../assets/empresas/proyecto_7_1.png'
import proyecto_7_2 from '../assets/empresas/proyecto_7_2.png'
import proyecto_7_3 from '../assets/empresas/proyecto_7_3.png'
import proyecto_8_1 from '../assets/empresas/proyecto_8_1.png'
import proyecto_8_2 from '../assets/empresas/proyecto_8_2.png'
import proyecto_8_3 from '../assets/empresas/proyecto_8_3.png'
import proyecto_9_1 from '../assets/empresas/proyecto_9_1.png'
import certificaciones from '../assets/certificaciones/certificaciones.png';
import certificaciones_pdf from '../documents/certificaciones.pdf';
import hamburger from '../assets/icon-hamburger.png'

let allImage = undefined;

class AllImageSystem {
    #slider = undefined;

    constructor () {
        this.slider = [ slider_1, slider_2, slider_3 ]
        this.service = [ asistencia_tecnica , capacitacion , venta_de_equipos ]
        this.representadas = [ 
            soluciones_1 , soluciones_2, soluciones_3 , soluciones_4, soluciones_5 ,
            soluciones_6, soluciones_7 , soluciones_8 , soluciones_9, soluciones_10 , soluciones_11  ]
        this.nosotros = [ mision, politica_calidad, vision, objetivo_calidad ];
        this.clientes = [
            gas_1, gas_2, gas_3, gas_4,
            gas_5, gas_6, gas_9, gas_10,
            gas_11, gas_12, gas_13, gas_14,
            gas_15, gas_16, gas_17, gas_18,
            gas_19, gas_20, gas_21, gas_22,
            gas_23, gas_24, gas_25, gas_26,
        ];
        this.proyectos = [
            proyecto_1, proyecto_2, proyecto_3,
            proyecto_4, proyecto_5, proyecto_6,
            proyecto_7, proyecto_8, proyecto_9,
        ];
        this.proyecto_one = [
            empresa_1, empresa_2
        ];
        this.proyecto_two = [
            proyecto_2_1, empresa_2
        ]
        this.proyecto_three = [
            proyecto_2_1, proyecto_3_1
        ]
        this.proyecto_forth = [
            proyecto_4_1, proyecto_4_2
        ]
        this.proyecto_fifth = [
            proyecto_5_1, proyecto_5_2
        ]
        this.proyecto_sixth = [
            proyecto_2_1, proyecto_6_1
        ]
        this.proyecto_seventh = [
            proyecto_7_1, proyecto_7_2, proyecto_7_3 
        ]
        this.proyecto_eight = [
            proyecto_2_1, proyecto_8_1, proyecto_8_2, proyecto_8_3  
        ]
        this.proyecto_nine = [
            proyecto_9_1, proyecto_5_2
        ]

        this.certificaciones = [
            certificaciones
        ]

        this.menu = [
            hamburger
        ]
    }

    sectionImage ( value ) {
        if ( typeof value !== String ) return;
        return this[value];
    }
    
}

export function allImageSystemInstance () {
    if ( !allImage ) {
        allImage = new AllImageSystem();
    }

    return allImage;
}