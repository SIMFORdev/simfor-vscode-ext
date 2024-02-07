
import * as vscode from 'vscode';

import * as createProject from './createProject';
import * as createModule from './createModule';

export function activate(context: vscode.ExtensionContext) {
	context.subscriptions.push(...[
		vscode.commands.registerCommand('simforide.createProject', () => createProject.createProject()),
		vscode.commands.registerCommand('simforide.createModule', () => createModule.createModule()),
	]);
}

export function deactivate() { }
