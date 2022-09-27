function given_funcs(func, argument) {
    console.log(func)
    if (func === "wordNum") {
        return argument.split(' ').length;
    }
    else if (func === "toUpperCase") {
        return argument.toUpperCase();
    }
    else if (func === "reverse") {
        return  argument.split('').reverse().join('');
    }
    else {
        return argument
    }
}


export default function OurFunctions(props) {
    if (props.first_elt.category === "func") {
        return given_funcs(props.first_elt.name, props.second_elt.name)
    }
    else {
        return given_funcs(props.second_elt.name, props.first_elt.name)
    }
}