
var utils = (function(){
    var isIE = !!window.ActiveXObject; // IE gets less performance-intensive	
	var hiddenTypes = ['BR', 'HR'];
	var maxParticles = isIE ? 10 : 40;
    return {
		
		isIE: this.isIE,
        /* 
         Math operations
         */
        radians: function(deg){
            return deg * 0.0174532925;
        },
        
        degrees: function(rad){
            return rad * 57.2957795;
        },
        
        random: function(from, to){
            return Math.floor(Math.random() * (to + 1) + from);
        },
        
        
        /*
         Misc operations
         */
        code: function(name){
            var table = {
                'up': 38,
                'down': 40,
                'left': 37,
                'right': 39,
                'esc': 27
            };
            if (table[name]) 
                return table[name];
            return name.charCodeAt(0);
        },
        
        size: function(element){
            var el = element, left = 0, top = 0;
            do {
                left += el.offsetLeft || 0;
                top += el.offsetTop || 0;
                el = el.offsetParent;
            }
            while (el);
            return {
                x: left,
                y: top,
                width: element.offsetWidth || 10,
                height: element.offsetHeight || 10
            };
        },
        
        // Taken from:
        // http://www.quirksmode.org/blog/archives/2005/10/_and_the_winner_1.html
        addEvent: function(obj, type, fn){
            if (obj.addEventListener) 
                obj.addEventListener(type, fn, false);
            else 
                if (obj.attachEvent) {
                    obj["e" + type + fn] = fn;
                    obj[type + fn] = function(){
                        obj["e" + type + fn](window.event);
                    }
                    obj.attachEvent("on" + type, obj[type + fn]);
                }
        },
        
        removeEvent: function(obj, type, fn){
            if (obj.removeEventListener) 
                obj.removeEventListener(type, fn, false);
            else 
                if (obj.detachEvent) {
                    obj.detachEvent("on" + type, obj[type + fn]);
                    obj[type + fn] = null;
                    obj["e" + type + fn] = null;
                }
        },
        
        arrayRemove: function(array, from, to){
            var rest = array.slice((to || from) + 1 || array.length);
            array.length = from < 0 ? array.length + from : from;
            return array.push.apply(array, rest);
        },
        
        addParticles: function(startPos, particles){
            var time = new Date().getTime();
            var amount = maxParticles;
            for (var i = 0; i < amount; i++) {
                particles.push({
                    // random direction
                    dir: (new Vector(Math.random() * 20 - 10, Math.random() * 20 - 10)).normalize(),
                    pos: startPos.cp(),
                    cameAlive: time
                });
            }
        },
        
        hasOnlyTextualChildren: function(element){
            if (this.indexOf(hiddenTypes, element.tagName) != -1) 
                return false;
            if (element.offsetWidth == 0 && element.offsetHeight == 0) 
                return false;
            for (var i = 0; i < element.childNodes.length; i++) {
                // <br /> doesn't count... and empty elements
                if (element.childNodes[i].nodeType != 3 &&
                this.indexOf(hiddenTypes, element.childNodes[i].tagName) == -1 &&
                element.childNodes[i].childNodes.length != 0) 
                    return false;
            }
            return true;
        },
        
        indexOf: function(arr, item, from){
            if (arr.indexOf) 
                return arr.indexOf(item, from);
            var len = arr.length;
            for (var i = (from < 0) ? Math.max(0, len + from) : from || 0; i < len; i++) {
                if (arr[i] === item) 
                    return i;
            }
            return -1;
        },
        
        // taken from MooTools Core
        addClass: function(element, className){
            if (element.className.indexOf(className) == -1) 
                element.className = (element.className + ' ' + className).replace(/\s+/g, ' ').replace(/^\s+|\s+$/g, '');
        },
        
        // taken from MooTools Core
        removeClass: function(element, className){
            element.className = element.className.replace(new RegExp('(^|\\s)' + className + '(?:\\s|$)'), '$1');
        },
        
        addStylesheet: function(name, rules){
            var stylesheet = document.getElementById(name);
            if (!stylesheet) {
                var stylesheet = document.createElement('style');
                stylesheet.type = 'text/css';
                stylesheet.rel = 'stylesheet';
                stylesheet.id = name;
                document.getElementsByTagName("head")[0].appendChild(stylesheet);
            }
            stylesheet.innerHTML += rules;
        },
        
        removeStylesheet: function(name){
            var stylesheet = document.getElementById(name);
            if (stylesheet) {
                stylesheet.parentNode.removeChild(stylesheet);
            }
        }
    }
})();