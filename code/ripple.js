var startrippleeffect = function (event) {
        //get targeted ripple container
        var holder = event.target;
        while (holder) {
            if (holder.classList.contains('ripple')) break;
            holder = holder.parentNode;
        };
        //get targeted element (h/w)
        var t_width = parseInt(window.getComputedStyle(holder).width),
            t_height = parseInt(window.getComputedStyle(holder).height),
            //get event (x/y) pos
            mouse_x = event.pageX - holder.offsetLeft,
            mouse_y = event.pageY - holder.offsetTop,
            //calculate ripple rayon
            r_rayon = Math.max(t_height, t_width) * Math.SQRT2;
        //make ripple element
        var ripple = document.createElement('div'),
            r_style = ripple.style;
        ripples.push(ripple);
        ripple.className = '-ripple-element -dark-ripple -init-ripple';
        //set first ripple element (x/y) pos
        r_style.left = mouse_x + 'px';
        r_style.top = mouse_y + 'px';
        //append ripple element inside targeted ripple container
        holder.appendChild(ripple);
        //animate ripple element
        setTimeout(function () {
            //set calculated ripple (h/w)
            r_style.height = r_rayon + 'px';
            r_style.width = r_rayon + 'px';
            //set calculated ripple (x/y) pos
            r_style.top = (t_height - r_rayon) / 2 + 'px';
            r_style.left = (t_width - r_rayon) / 2 + 'px';
            //set opacity
            r_rayon.opacity = 1;
        }, 0);
    },

    endrippleeffect = function (event) {
        ripples.forEach(function (ripple) {
            setTimeout(function () {
                ripple.style.opacity = 0;
            }, 800);
            setTimeout(function () {
                ripple.remove();
            }, 2500);
        });
    },

    ripples = [],

    //add events
    body = document.body;
body.addEventListener('mousedown', startrippleeffect);
body.addEventListener('mouseup', endrippleeffect);

body.addEventListener('touchstart', startrippleeffect);
body.addEventListener('touchend', endrippleeffect);

body.addEventListener('cancel', function () {
    alert(5)
});
