import { EditorState , basicSetup } from "@codemirror/basic-setup";
import { EditorView, keymap } from "@codemirror/view";
import { json } from "@codemirror/lang-json";
import {indentWithTab} from "@codemirror/commands"


export default function setupEditor(){
const jsonRequestBody = document.querySelector('[data-json-request-body]')
const jsonResponseBody = document.querySelector('[data-json-response-body]')

const basicExtensions = [
    basicSetup,
    keymap.of([indentWithTab]),
    json(),
    EditorState.tabSize.of(2)
]

const requestEditor = new EditorView({
    state: EditorState.create({
        doc: "{\n\t\n}",
        extensions:basicExtensions 
    }),
    parent: jsonRequestBody
})

const responsEditor = new EditorView({
    state: EditorState.create({
        doc: "{}",
        extensions:[...basicExtensions, EditorView.editable.of(false)], 
    }),
    parent: jsonResponseBody
})

    function updateResponseEditor(value){
        responsEditor.dispatch({
            changes: {
                from: 0,
                to: responsEditor.state.doc.length,
                insert: JSON.stringify(value,null,2)
            }
        })
    }

    return { requestEditor, updateResponseEditor }
}
