
export class SimforExtValues {
    static readonly configFileName: string = ".vscode/simforext.json";
    static readonly launchFileName: string = ".vscode/launch.json";

    static cmake(projectName: string, sources: string[]): string {
        let src: string = "";
        for (let i = 0; i < sources.length; ++i) {
            src += " " + sources[i];
        }

        const result: string =
            "\n\
# It's generated file. Change only in advanced mode.\n\
\n\
cmake_minimum_required(VERSION 3.21)\n\
project(" + projectName + ")\n\
\n\
set(CMAKE_CXX_STANDARD 17)\n\
\n\
find_package(Boost 1.84.0 COMPONENTS mpi REQUIRED)\n\
find_package(OpenMP REQUIRED)\n\
find_package(MPI REQUIRED)\n\
find_package(OpenGL REQUIRED)\n\
find_package(GLUT REQUIRED)\n\
find_package(simfor REQUIRED)\n\
\n\
add_executable(${PROJECT_NAME}" + src + ")\n\
\n\
target_link_libraries(${PROJECT_NAME} PUBLIC \n\
        simfor\n\
        ${Boost_LIBRARIES}\n\
        ${MPI_CXX_LIBRARIES}\n\
        ${OPENGL_LIBRARIES}\n\
        ${GLUT_LIBRARY}\n\
        OpenMP::OpenMP_CXX\n\
)";

        return result;
    }

    static main() {
        const result: string =
            "#include <iostream>\n\
\n\
using namespace std;\n\
\n\
int main(int argc, char **argv) {\n\
\tcout << \"Hello simfor\\n\";\n\
\treturn 0;\n\
}\n";

        return result;
    }

    static emptyHeader(moduleName: string) {
        const includeG = moduleName.toUpperCase() + "_H_";
        const result: string =
            "\n\
#ifndef " + includeG + "\n\
#define " + includeG + "\n\
\n\
#endif /* " + includeG + " */\n";

        return result;
    }

    static emptySource(headerName: string) {
        const result: string =
            "\n\
#include \"" + headerName + "\"\n\
\n\
";

        return result;
    }

    static mpiLaunchConfiguration(executeName: string, threadsCnt: number, args: string[], isGDBEnabled: boolean) {
        const name = (isGDBEnabled) ? "SIMFOR MPI launch (gdb)" : "SIMFOR MPI launch";
        const res = {
            "name": name,
            "type": "cppdbg",
            "request": "launch",
            "program": "/usr/bin/mpiexec",
            "args": [""],
            "stopAtEntry": false,
            "cwd": "${fileDirname}",
            "environment": [],
            "externalConsole": false,
            "MIMode": "gdb",
            "setupCommands": [
                {
                    "description": "Enable pretty-printing for gdb",
                    "text": "-enable-pretty-printing",
                    "ignoreFailures": true
                }
            ]
        };
        if (isGDBEnabled) {
            res["args"] = [
                "-n",
                threadsCnt.toString(),
                "xterm",
                "-e",
                "gdb",
                "${workspaceFolder}/build/" + executeName.toString()
            ];
        } else {
            res["args"] = [
                "-n",
                threadsCnt.toString(),
                "${workspaceFolder}/build/" + executeName.toString()
            ];
        }
        return res;
    }

    static defaultLaunchConfiguration(executeName: string, args: string[]) {
        const res = {
            "name": "SIMFOR launch",
            "type": "cppdbg",
            "request": "launch",
            "program": "${workspaceFolder}/build/" + executeName.toString(),
            "args": [""],
            "stopAtEntry": false,
            "cwd": "${fileDirname}",
            "environment": [],
            "externalConsole": false,
            "MIMode": "gdb",
            "setupCommands": [
                {
                    "description": "Enable pretty-printing for gdb",
                    "text": "-enable-pretty-printing",
                    "ignoreFailures": true
                }
            ]
        };
        res["args"] = args;
        return res;
    }

    static ompLaunchConfiguration(executeName: string, threadsCnt: number, args: string[]) {
        const res = {
            "name": "SIMFOR OpenMP launch",
            "type": "cppdbg",
            "request": "launch",
            "program": "${workspaceFolder}/build/" + executeName.toString(),
            "args": [""],
            "stopAtEntry": false,
            "cwd": "${fileDirname}",
            "environment": [],
            "externalConsole": false,
            "MIMode": "gdb",
            "setupCommands": [
                {
                    "description": "Enable pretty-printing for gdb",
                    "text": "-enable-pretty-printing",
                    "ignoreFailures": true
                }
            ]
        };
        res["args"] = args;
        return res;
    }
}