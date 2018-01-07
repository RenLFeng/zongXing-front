
module.exports = function(src){
    return `module.exports = "${this._module.rawRequest}";`;
};