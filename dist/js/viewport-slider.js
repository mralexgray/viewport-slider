var viewportSlider = {};

(function (window, document) {
    'use strict';

    viewportSlider.init = function init(root, selector) {
        document.body.style.overflow = 'hidden';
        this.slides = document.querySelectorAll(selector);
        this.root = root;
        this.root.classList.add('viewport-slide-container');
        this.lastScrolled = 0;
        // this is needed due to trackpads that chain the mousewheel event
        this.animationHalt = 1500;
        this.currentSlide = 0;
        this.setUpSlides()
            .bindScroll();
        return this;
    };

    viewportSlider.setUpSlides = function setUpSlides() {
        var i;
        for (i = 0; i < this.slides.length; i += 1) {
            this.slides[i].classList.add('viewport-slide');
        }
        return this;
    };

    viewportSlider.bindScroll = function bindScroll() {
        var delta = 0,
            self = this,
            wheelDirection = function (e) {
                if (!e) {
                    e = window.event;
                }
                return (e.detail < 0 || e.wheelDelta > 0) ? 1 : -1;
            },
            onMouseWheel = function (e) {
                var scrollTime = new Date().getTime();
                if (scrollTime - self.lastScrolled < self.animationHalt) {
                    return false;
                }
                e.preventDefault();
                e.stopPropagation();
                delta = wheelDirection(e);
                if (delta > 0) {
                    self.paginate(self.currentSlide - 1);
                } else {
                    self.paginate(self.currentSlide + 1);
                }
                self.lastScrolled = scrollTime;
            };

        window.addEventListener('mousewheel', onMouseWheel);
        window.addEventListener('DOMMouseScroll', onMouseWheel);
    };

    viewportSlider.paginate = function paginate(index) {
        if (index < 0 || index > (this.slides.length - 1)) {
            return;
        }
        var self = this;
        this.applyTransform(index * 100);
        setTimeout(function () {
            self.currentSlide = index;
        }, 450);
    };

    viewportSlider.applyTransform = function applyTransform(pos) {
        this.root.style["-webkit-transform"] = "translate3d(0, -" + pos + "%, 0)";
        this.root.style["-moz-transform"] = "translate3d(0, -" + pos + "%, 0)";
        this.root.style["-ms-transform"] = "translate3d(0, -" + pos + "%, 0)";
        this.root.style.transform = "translate3d(0, -" + pos + "%, 0)";
    };

}(window, document));
