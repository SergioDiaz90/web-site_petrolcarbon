class IndexForSiblings {
    static get (el) {
        let children = el.parentNode.children;
        for (let cnt = 0; cnt < children.length; cnt ++) {
            let child = children[cnt];
            if (child == el) return cnt;
        }
    }
}

class Slider {

    constructor(selected, movimiento=true){
        this.move = this.move.bind(this);
        this.moveByButton = this.moveByButton.bind(this);
        this.slider = document.querySelector(selected);
        this.items = this.slider.querySelector('.slider-content').childNodes.length;
        this.interval = null;
        this.cnt = 0
        this.movimiento = movimiento;
        this.start();
        this.buildControls();
        this.bindEvents();
    }

    start () {
        if (!this.movimiento) return;
        this.interval = window.setInterval(this.move, 3000);
    }

    restart () {
        if (this.interval) window.clearInterval(this.interval);
        this.start();
    }

    bindEvents () {
        this.slider.querySelectorAll('li').forEach(
        elm => {
            elm.addEventListener('click', this.moveByButton);
        });
        
    }

    moveByButton (e) {
        let idx = IndexForSiblings.get(e.currentTarget);
        this.cnt = idx;
        this.moveTo(idx);
        this.restart();
    }

    buildControls () {
        for (let cnt = 0; cnt < this.items; cnt++) {
            let control = document.createElement('li');
            if (cnt == 0) control.classList.add('active');
            this.slider.querySelector('.slider-content-controls').appendChild(control);
        }
    }

    move () {
        this.cnt += 1;
        if (this.cnt > this.items - 1) {
            this.cnt = 0;
        }
        this.moveTo(this.cnt); 
    }

    resetIndicator() {
        this.slider.querySelectorAll('.active').forEach(
            elm => elm.classList.remove('active')
        );
    }

    moveTo (idx) {
        let left = idx * 100;
        this.resetIndicator();
        this.slider.querySelector(`.slider-content-controls li:nth-child(${ idx + 1 })`).classList.add('active');
        this.slider.querySelector(".slider-content").style.left = '-' + left + '%';
    }
}

export default Slider;
