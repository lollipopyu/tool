exports.cid = '4'
exports.name = 'FormItem';
exports.nickname = 'FormItem';
exports.type = 'FormItem';
exports.template = `<FormItem{model}>{slot}</FormItem>`
exports.desc = 'FormItem';
exports.allowPlace = [2, 3];
exports.allow = [5, 6, 7, 8, 9, 10, 11, 12];
exports.model = {
    label: {
        type: 'text',
        value: '',
        desc: ''
    },
    style: {
        type: 'json',
        value: '',
        desc: 'value'
    }
};


exports.script = function(eventCenter, appStore) {
    const context = this
};

exports.render = function(createElement) {
    console.log(this.children)
    const context = this
    const store = createElement.store

    if (!context.initScript) {
        context.initScript = true
    }

    return createElement(context.type, {
        style: context.model.style.value,
        props: {
            'label': context.model.label.value
        },
        domProps: {
            controlConfig: this
        },
        directives: [{
                name: 'droppable'
            },
            {
                name: 'editable',
                value: 'FormItem'
            }
        ],
        nativeOn: {
            click: function(e) {
                store.commit('dragModule/showEditorPanel', e)
            }
        },
    }, context.children.map(function(child) {
        return child.render(createElement)
    }))
}