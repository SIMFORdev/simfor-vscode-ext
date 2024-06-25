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
            SimforExtValues.mpiLaunchConfiguration(config.name, config.threadsCount, config.cppCmdArgs, false),
            SimforExtValues.mpiLaunchConfiguration(config.name, config.threadsCount, config.cppCmdArgs, true),
            SimforExtValues.defaultLaunchConfiguration(config.name, config.cppCmdArgs),
            SimforExtValues.ompLaunchConfiguration(config.name, config.threadsCount, config.cppCmdArgs)
        ]
    };

    await Utils.writeDataPath(config.projectPath + "/" + SimforExtValues.launchFileName, JSON.stringify(res, null, 4));

    const cmakeFile = SimforExtValues.cmake(config.name, config.cppFiles);
    await Utils.writeDataPath(config.projectPath + "/CMakeLists.txt", cmakeFile);
}