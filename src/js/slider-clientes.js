class SliderClients {
    constructor(selected){
        this.move = this.move.bind(this);
        this.slider = document.querySelector(selected);
        this.interval = null;
        this.cnt = 0
        this.cntPx = 0;
        this.start();
        // console.log('SliderClients', this.slider );
    }

    start () {
        this.interval = window.setInterval(this.move, 3000);
    }

    move () {
        let items = this.slider.childNodes.length;
        // console.log( 'move', items );
        this.cnt += 1;
        if (this.cnt > items - 4) {
            this.slider.style.transition = 'none';
            this.cnt = 0;
        } else {
            this.slider.style.transition = 'all 0.3s';
        }
        this.moveTo(this.cnt);
    }

    moveTo (idx) {
        if ( idx === 0 ) this.cntPx = 0;
        this.cntPx += 25.5;
        // console.log(this.slider.querySelector(".container > img"));
        this.slider.style.left = `-${ this.cntPx }%`;
    }
}
    
export default SliderClients;
