
import * as vscode from 'vscode';

import * as createProject from './createProject';
import * as createModule from './createModule';
import * as runMPI from './runMPI';

export function activate(context: vscode.ExtensionContext) {
	context.subscriptions.push(...[
		vscode.commands.registerCommand('simforide.createProject', () => createProject.createProject()),
		vscode.commands.registerCommand('simforide.createModule', () => createModule.createModule()),
		vscode.commands.registerCommand('simforide.runMPI', () => runMPI.runMPI())
	]);
}

export function deactivate() { }
