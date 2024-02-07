
import * as vscode from "vscode";

export async function getWorkspacePath() {

}

export async function writeDataPath(filePath: string, data: string) {
    writeDataUri(vscode.Uri.parse(filePath), data);
}

export async function writeDataUri(fileUri: vscode.Uri, data: string) {
    vscode.workspace.fs.writeFile(fileUri, new TextEncoder().encode(data));
}