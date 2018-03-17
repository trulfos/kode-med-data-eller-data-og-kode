#!/usr/bin/env node
const esprima = require('esprima');
const fs = require('fs');
const program = fs.readFileSync('example.js', {encoding: 'utf-8'});
const data = [];

const tree = esprima.parseScript(
    program,
    {jsx: true},
    visitor
);

function visitor(node) {
    if (!isForm(node)) {
        return;
    }

    data.push(
        extractForm(node)
    );
}

console.log(JSON.stringify(data, null, '    '));

function isJsxElement(node) {
    return node.type === 'JSXElement';
}

function getComponentType(node) {
   return node.openingElement.name.name;
}

function isForm(node) {
    return isJsxElement(node) && getComponentType(node).match(/Form$/);
}

function isInput(node) {
   return isJsxElement(node) && getComponentType(node) === 'input';
}

function getAttributes(node) {
    return node
        .openingElement
        .attributes
        .reduce(
            (attrs, attr) => ({
                ...attrs,
                [attr.name.name]: attr.value.value
            }),
            {}
        );
}

function getLabel(children, id){
    return children
        .filter(isJsxElement)
        .find(child => getAttributes(child).for === id)
        .children[0]
        .value;
}

function extractInputs(children) {
   return children
    .filter(isInput)
    .map(getAttributes)
    .map(attrs => ({
        ...attrs,
        label: getLabel(children, attrs.id)
    }));
}

function extractForm(node) {
    return {
        id: getAttributes(node).id,
        componentType: getComponentType(node),
        inputs: extractInputs(node.children)
    };
}
