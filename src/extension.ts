import * as vscode from 'vscode';


export function activate(context: vscode.ExtensionContext) {
    console.log('Запустилось');
    
    vscode.window.showInformationMessage('Приветствую Вас!');

    let disposable = vscode.commands.registerCommand('include-sorter.sortIncludes', () => {

        const editor = vscode.window.activeTextEditor;
    
        if (!editor) {
            vscode.window.showWarningMessage('Нет файла где нужнно исправлять codestyle!');
            return;
        }

        const text = editor.document.getText();

        let other = [];
        
        let index_text = 0;
        let includes = []

        while (index_text < text.length) {
            if(index_text + 10 < text.length) {
                if (text.slice(index_text, index_text + 8) == '#include') {
                    let str = '';
                    while (index_text < text.length) {
                        if(text[index_text] == '\n') {
                            break;
                        }
                        str += text[index_text];
                        index_text += 1;
                    }
                    index_text += 1;
                    includes.push(str);
                } else {
                    let str = '';
                    while (index_text < text.length) {
                        if(text[index_text] == '\n') {
                            break;
                        }
                        str += text[index_text];
                        index_text += 1;
                    }
                    index_text += 1;
                    other.push(str);
                }
            } else {
                let str = '';
                while (index_text < text.length) {
                        if(text[index_text] == '\n') {
                            break;
                        }
                        str += text[index_text];
                        index_text += 1;
                    }
                    index_text += 1;
                    other.push(str);
                break;
            }
        }

        if (includes.length) {
            includes.sort();
            let text_includes = ''
            for (let i = 0; i < includes.length; ++i) {
                text_includes += includes[i];
                if (i + 1 < includes.length) {
                    text_includes += "\n";
                }
            }
            let text_other = ''
            for (let i = 0; i < other.length; ++i) {
                text_other += other[i];
                if (i + 1 < other.length) {
                    text_other += "\n";
                }
            }

            const new_text = text_includes + "\n" + text_other

            editor.edit(editBuilder => {
                const old_text = new vscode.Range(
                    editor.document.positionAt(0),
                    editor.document.positionAt(text.length)
            );
            editBuilder.replace(old_text, new_text);
            vscode.window.showInformationMessage('Отсортировано!');
    })


        } else {
            vscode.window.showInformationMessage('Нечего исправлять ¯\\_(ツ)_/¯');
        }
    });

    context.subscriptions.push(disposable);
}

export function deactivate() {}