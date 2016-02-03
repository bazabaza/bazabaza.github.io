/**
 * Created by baza on 20/12/15.
 */


BAZART = (function($) {
    var m = {
        canvas: {},
        artObject: null
    };

    m._patchJQuery = function() {
        $.fn.center = function () {
            this.css("position", "relative");
            this.css("top", Math.max(0, (($(window).height() - $(this).outerHeight()) / 2) +
            $(window).scrollTop()) + "px");
            this.css("left", Math.max(0, (($(window).width() - $(this).outerWidth()) / 2) +
            $(window).scrollLeft()) + "px");

            return this;
        };
    };

    m._initCanvas = function() {
        if (($(window).width() / this.canvas.ratio.x < $(window).height() / this.canvas.ratio.y)) {
            this.artObject.width($(window).width() * 0.9);
            this.artObject.height(this.artObject.width() * (this.canvas.ratio.y / this.canvas.ratio.x));
        } else {
            this.artObject.height($(window).height() * 0.9);
            this.artObject.width(this.artObject.height() * (this.canvas.ratio.x / this.canvas.ratio.y));
        }

        this.artObject.center();
        // refresh canvas scale
        var w = this.artObject.width(),
            h = this.artObject.height();

        this.ctx.canvas.width  = w;
        this.ctx.canvas.height = h;

        if (this.debug) {
            var i;
            // vertical ruler
            for (i = 0; i <= this.canvas.ratio.x; i++) {
                this.ctx.beginPath();
                this.ctx.moveTo(i * w / this.canvas.ratio.x, 0);
                this.ctx.lineTo(i * w / this.canvas.ratio.x, h);
                this.ctx.stroke();
            }

            // horizontal
            for (i = 0; i <= this.canvas.ratio.y; i++) {
                this.ctx.beginPath();
                this.ctx.moveTo(0, i * h / this.canvas.ratio.y);
                this.ctx.lineTo(w, i * h / this.canvas.ratio.y);
                this.ctx.stroke();
            }

        }
    };

    m.printDebugData = function(text) {
        var p = this.canvas.pixelSize,
            ctx = this.ctx;

        this.ctx.save();
        this.ctx.fillStyle = 'rgb(255,255,255)';
        this.ctx.fillRect(0, (this.canvas.ratio.y - 20) * p, this.canvas.ratio.x * p, 20 * p);
        this.ctx.restore();

        this.ctx.save();
        ctx.font = 25 + "px monospace";
        this.ctx.fillText(text, 0, (this.canvas.ratio.y - 1) * p);
        this.ctx.restore();
    };

    m.init = function(canvasRatio, debug) {
        this.canvas.ratio = canvasRatio;

        this.debug = debug == undefined ? false : debug;
        this.artObject = $("#art-object");
        this.ctx = document.getElementById('art-object').getContext('2d');

        this._patchJQuery();
        this._initCanvas();
        this.canvas.pixelSize = this.artObject.width() / this.canvas.ratio.x;

        $(window).resize(function() {
            if (window.RT) clearTimeout(window.RT);
            window.RT = setTimeout(function() {
                this.location.reload(false);
            }, 1000g);
        });
    };

    return m;
})(jQuery);