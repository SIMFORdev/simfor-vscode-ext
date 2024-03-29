
import * as vscode from "vscode";
import { ProjectConfig, ProjectConfigInfo } from "./projectConfig";
import { SimforExtValues } from "./values";
import * as Utils from "./utils";

let projectPath: string;
let projectConfig: ProjectConfig;

async function collectInfo(): Promise<ProjectConfigInfo | undefined> {
    const targetPath = vscode.workspace.workspaceFolders;
    if (targetPath === undefined) {
        vscode.window.showErrorMessage("Open folder first");
        return;
    }
    const files = (await vscode.workspace.findFiles("**/" + SimforExtValues.configFileName)).at(0);
    if (files !== undefined) {
        vscode.window.showErrorMessage("Folder must be empty");
        return;
    }

    const targetName = await vscode.window.showInputBox({
        prompt: "Project name",
        placeHolder: "Project",
        validateInput: (value: string) => {
            if (!value.length) {
                return 'A project name required';
            }
            return '';
        }
    });
    if (!targetName) {
        return;
    }

    const targetType = (await vscode.window.showQuickPick([
        {
            label: "Simple",
            description: "Generate simple project without cmake manage"
        },
        {
            label: "Advanced",
            description: "Generate advanced project with manualy cmake manage"
        }
    ]));
    if (!targetType) {
        return;
    }

    const result: ProjectConfigInfo = {
        name: targetName,
        isAdvanced: targetType.label === "Advanced",
    };
    projectPath = targetPath[0].uri.fsPath;

    return result;
}

function createSimpleProject(info: ProjectConfigInfo) {
    const cmakeFile = SimforExtValues.cmake(info.name, ["main.cpp"]);
    Utils.writeDataPath(projectPath + "/CMakeLists.txt", cmakeFile);

    const mainFile = SimforExtValues.main();
    Utils.writeDataPath(projectPath + "/main.cpp", mainFile);

    vscode.workspace.fs.createDirectory(vscode.Uri.parse(projectPath + "/src"));
}

function createAdvansedProject(info: ProjectConfigInfo) {
    const cmakeFile = SimforExtValues.cmake(info.name, ["main.cpp"]);
    Utils.writeDataPath(projectPath + "/CMakeLists.txt", cmakeFile);

    const mainFile = SimforExtValues.main();
    Utils.writeDataPath(projectPath + "/main.cpp", mainFile);
}

export async function createProject() {
    const info = await collectInfo();
    if (!info) {
        return;
    }

    projectConfig = new ProjectConfig;
    await projectConfig.loadConfig();
    // do something

    if (info.isAdvanced) {
        createAdvansedProject(info);
    } else {
        createSimpleProject(info);
    }
    projectConfig.setConfig(info);
}