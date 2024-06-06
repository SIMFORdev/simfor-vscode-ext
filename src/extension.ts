
import * as vscode from 'vscode';

import * as createProject from './createProject';
import * as createModule from './createModule';
import * as refreshConfig from './refreshConfig';

function installExtension(exName: string) {
	const ex = vscode.extensions.getExtension(exName);
	if (!ex) {
		vscode.window.showInformationMessage("Installing " + exName);
		vscode.commands.executeCommand('extension.open', exName);
		vscode.commands.executeCommand('workbench.extensions.installExtension', exName);
	} else {
		vscode.window.showInformationMessage("Installed " + exName);
	}
}

export function activate(context: vscode.ExtensionContext) {

	const recExtension = [
		"ms-vscode.cpptools-extension-pack",
		"ms-vscode.cmake-tools"
	];

	for (const ex in recExtension) {
		installExtension(ex);
	}

	context.subscriptions.push(...[
		vscode.commands.registerCommand('simforide.createProject', () => createProject.createProject()),
		vscode.commands.registerCommand('simforide.createModule', () => createModule.createModule()),
		vscode.commands.registerCommand('simforide.refreshConfig', () => refreshConfig.refreshConfig())
	]);
}

export function deactivate() { }
