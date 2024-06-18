import * as vscode from "vscode";
import { ProjectConfig, ProjectConfigInfo } from "./projectConfig";
import { SimforExtValues } from "./values";
import * as Utils from "./utils";

let projectConfig: ProjectConfig;

export async function createModule() {
    projectConfig = new ProjectConfig;
    await projectConfig.loadConfig();
    
    const moduleName = await vscode.window.showInputBox({
        prompt: "Module name",
        placeHolder: "Module",
        validateInput: (value: string) => {
            if (!value.length) {
                return 'A module name required';
            }
            return '';
        }
    });
    if (!moduleName) {
        return;
    }
    console.log(moduleName);

    const headerName = moduleName + ".h";
    const sourceName = moduleName + ".cpp";

    const headerText = SimforExtValues.emptyHeader(moduleName);
    const sourceText = SimforExtValues.emptySource(headerName);

    Utils.writeDataPath(projectConfig.getConfig().projectPath + "/" + headerName, headerText);
    Utils.writeDataPath(projectConfig.getConfig().projectPath + "/" + sourceName, sourceText);

    let info = projectConfig.getConfig();
    info.cppFiles.push(headerName, sourceName);
    projectConfig.setConfig(info);
    const cmakeFile = SimforExtValues.cmake(info.name, info.cppFiles);
    Utils.writeDataPath(info.projectPath + "/CMakeLists.txt", cmakeFile);
}