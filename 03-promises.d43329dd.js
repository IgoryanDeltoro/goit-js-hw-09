const e=(e,o)=>new Promise((l=>{setTimeout((()=>l(e)),o)})),o=e("promiseA value",1e3),l=e("promiseB value",3e3);Promise.all([o,l]).then((e=>console.log(e))).catch((e=>console.log(e)));
//# sourceMappingURL=03-promises.d43329dd.js.map
