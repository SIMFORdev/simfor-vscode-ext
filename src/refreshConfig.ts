import * as vscode from "vscode";
import { ProjectConfig, ProjectConfigInfo } from "./projectConfig";
import { SimforExtValues } from "./values";
import * as Utils from "./utils";

let projectConfig: ProjectConfig;

export async function refreshConfig() {
    projectConfig = new ProjectConfig;
    await projectConfig.loadConfig();

    const config = projectConfig.getConfig();

    const res = {
        "configurations": [
            SimforExtValues.mpiLaunchConfiguration(config.name, config.threadsCount, false),
            SimforExtValues.mpiLaunchConfiguration(config.name, config.threadsCount, true),
            SimforExtValues.defaultLaunchConfiguration(config.name),
            SimforExtValues.ompLaunchConfiguration(config.name, config.threadsCount)
        ]
    };

    Utils.writeDataPath(config.projectPath + "/" + SimforExtValues.launchFileName, JSON.stringify(res, null, 4));

}