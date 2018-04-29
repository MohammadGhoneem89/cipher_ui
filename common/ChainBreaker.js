let Promise = require('bluebird');

export function reject(scopeData){
    return  new Promise((resolve, reject)=>{
        reject(scopeData);
    });
}

export function success(scopeData){
    return  new Promise((resolve, reject)=>{
        resolve(scopeData);
    });
}