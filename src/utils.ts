
import * as vscode from "vscode";

export async function getWorkspacePath() {

}

export async function writeDataPath(filePath: string, data: string) {
    writeDataUri(vscode.Uri.parse(filePath), data);
}

export async function writeDataUri(fileUri: vscode.Uri, data: string) {
    vscode.workspace.fs.writeFile(fileUri, new TextEncoder().encode(data));
}

export async function readDataPath(filePath: string): Promise<string> {
    return readDataUri(vscode.Uri.parse(filePath));
}

export async function readDataUri(fileUri: vscode.Uri) : Promise<string> {
    return new TextDecoder().decode(await vscode.workspace.fs.readFile(fileUri));
}