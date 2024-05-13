
import * as vscode from "vscode";
import { SimforExtValues } from "./values";

export class ProjectConfigInfo {
    name: string = "";
    isAdvanced: boolean = false;
    projectPath: string = "";
    cppFiles: string[] = [];
    cppCmdArgs: string[] = [];
}

export class ProjectConfig {
    private info!: ProjectConfigInfo;
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
            this.writeConfigFile(vscode.Uri.parse(this.configFilePath), JSON.stringify(this.info));
        } else {
            const result = await this.readConfigFile(filePath);
            this.info = JSON.parse(result) as ProjectConfigInfo;
            this.configFilePath = this.info.projectPath + "/" + SimforExtValues.configFileName;
        }
    }

    async setConfig(config: ProjectConfigInfo) {
        this.loadConfig();
        this.info = config;
        this.writeConfigFile(vscode.Uri.parse(this.configFilePath), JSON.stringify(this.info));
    }

    getConfig() {
        return this.info;
    }

    private async readConfigFile(uri: vscode.Uri): Promise<string> {
        return atob(new TextDecoder().decode(await vscode.workspace.fs.readFile(uri)));
    }

    private async writeConfigFile(uri: vscode.Uri, data: string) {
        await vscode.workspace.fs.writeFile(uri, new TextEncoder().encode(btoa(data)));
    }
}