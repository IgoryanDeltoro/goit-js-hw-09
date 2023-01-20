!function(){var n=function(n,e){return new Promise((function(o){setTimeout((function(){return o(n)}),e)}))},e=n("promiseA value",1e3),o=n("promiseB value",3e3);Promise.all([e,o]).then((function(n){return console.log(n)})).catch((function(n){return console.log(n)}))}();
//# sourceMappingURL=03-promises.75b0d7ea.js.map
