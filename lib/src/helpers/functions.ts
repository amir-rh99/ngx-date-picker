function DefaultsDeep(input: any, defaultInput: any){
    
    if(!(isObject(input) && isObject(defaultInput))){
        return defaultInput
    }

    let def = {...defaultInput}
    
    for(let field in input){
        let value = input[field]
        
        if(isObject(value)){
            def[field] = DefaultsDeep(value, def[field])
        } else {
            def[field] = value
        }
    }
    
    return def
}

function isObject(value: any){
    return typeof value === 'object' &&
    !Array.isArray(value) &&
    value !== null
}

export {
    DefaultsDeep
}