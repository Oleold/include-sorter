import * as vscode from 'vscode';

function Check(editor : vscode.TextEditor): boolean {
    /*
       Проверяем расширение файла
       Поддерживаются только .h, .cpp, .hpp
    */
    const file_name = editor.document.fileName;
    let check = false;
    if (file_name.length > 2) {
        if (file_name.slice(file_name.length - 2, file_name.length) == '.h') {
            check = true;
        }
    }
    
    if (file_name.length > 4) {
        if (file_name.slice(file_name.length - 4, file_name.length) == '.cpp') {
            check = true;
        }
        if (file_name.slice(file_name.length - 4, file_name.length) == '.hpp') {
            check = true;
        }
    }
    return check;
}

export function activate(context: vscode.ExtensionContext) {
    // Показываем приветственное сообщение при активации расширения
    vscode.window.showInformationMessage('Приветствую Вас!');

    /*
       Команда вызывается через Command Palette или CTRL+M
    */
    let disposable = vscode.commands.registerCommand('include-sorter.sortIncludes', () => {

        // Получаем активный текстовый редактор
        const editor = vscode.window.activeTextEditor;
    
        // Проверяем, что редактор существует
        if (!editor) {
            vscode.window.showWarningMessage('Нет файла где нужнно исправлять codestyle!');
            return;
        }

        let check = Check(editor);
        
        // Если файл не поддерживается - выходим
        if (!check) {
            return;
        }

        /*
           Получаем весь текст из активного документа
           и разделяем его на include и остальной код
        */
        const text = editor.document.getText();

        let other = [];        // Массив для строк без include
        let index_text = 0;
        let includes = []      // Массив для include 

        /*
           Парсим текст построчно, разделяя include и остальной код
        */
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

        /*
          Если найдены include  - сортируем и заменяем содержимое файла
        */
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

            const new_text = text_includes + "\n" + text_other;

            /*
               Заменяем содержимое файла на новую отсортированную версию
            */
            editor.edit(editBuilder => {
                const old_text = new vscode.Range(
                    editor.document.positionAt(0),
                    editor.document.positionAt(text.length)
                );
                editBuilder.replace(old_text, new_text);
                vscode.window.showInformationMessage('Отсортировано!');
            });

        } else {
            vscode.window.showInformationMessage('Нечего исправлять ¯\\_(ツ)_/¯');
        }
    });

    context.subscriptions.push(disposable);
}

export function deactivate() {}