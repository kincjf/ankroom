'use strict';

// TODO: find this function in lodash or underscore and use it instead this
var extendConfig = (function() {
    var hasOwnProperty = Object.prototype.hasOwnProperty;
    var getType = Object.prototype.toString;
    
    return function extend() {
        var target = Object.create(null);
        
        for (var i = 0; i < arguments.length; ++i) {
            var source = arguments[i];
            
            for (var key in source) {
                
                if (hasOwnProperty.call(source, key)) {
                    var value = source[key];
                    
                    if ('object' === typeof value && '[object Array]' != getType.call(value)) {
                        if ('object' !== typeof target[key] && hasOwnProperty.call(target, key)) {
                            throw new Error('Cannot merge object with ' + typeof target[key]);
                        }
                        target[key] = extend(target[key] || Object.create(null), value);
                    } else {
                        target[key] = value;
                    }
                }
            }
        }

        return target;
    };
})();

module.exports = {
    extendConfig: extendConfig
};
