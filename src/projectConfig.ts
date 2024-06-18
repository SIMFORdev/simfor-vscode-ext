
import * as vscode from "vscode";
import { SimforExtValues } from "./values";

export class ProjectConfigInfo {
    name: string = "";
    isAdvanced: boolean = false;
    projectPath: string = "";
    threadsCount: number = 1;
    cppFiles: string[] = [];
    cppCmdArgs: string[] = [];
}

export class ProjectConfig {
    private info: ProjectConfigInfo = {
        name: "",
        isAdvanced: false,
        projectPath: "",
        threadsCount: 1,
        cppFiles: [""],
        cppCmdArgs: [""],
    };
    private configFilePath: string = "";

    constructor() { }

    async loadConfig() {
        const filePath = (await vscode.workspace.findFiles("**/" + SimforExtValues.configFileName)).at(0);
        if (filePath === undefined) {
            const workspaceTarget = vscode.workspace.workspaceFolders;
            if (workspaceTarget === undefined) {
                vscode.window.showErrorMessage("Open folder first");
                return;
            }
            this.info.projectPath = workspaceTarget[0].uri.fsPath;
            this.configFilePath = this.info.projectPath + "/" + SimforExtValues.configFileName;
            this.writeConfigFile(vscode.Uri.parse(this.configFilePath), JSON.stringify(this.info, null, 4));
        } else {
            const result = await this.readConfigFile(filePath);
            this.info = JSON.parse(result) as ProjectConfigInfo;
            this.configFilePath = this.info.projectPath + "/" + SimforExtValues.configFileName;
        }
    }

    async setConfig(config: ProjectConfigInfo) {
        this.loadConfig();
        this.info = config;
        await this.writeConfigFile(vscode.Uri.parse(this.configFilePath), JSON.stringify(config, null, 4));
    }

    getConfig() {
        return this.info;
    }

    private async readConfigFile(uri: vscode.Uri): Promise<string> {
        return new TextDecoder().decode(await vscode.workspace.fs.readFile(uri));
    }

    private async writeConfigFile(uri: vscode.Uri, data: string) {
        await vscode.workspace.fs.writeFile(uri, new TextEncoder().encode(data));
    }
}