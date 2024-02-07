
export class SimforExtValues {
    static readonly configFileName: string = ".simforext";

    static cmake(projectName: string, sources: string[]): string {
        let src: string = "";
        for (let i = 0; i < sources.length; ++i) {
            src += " " + sources[i];
        }

        const result: string = "cmake_minimum_required(VERSION 3.21)\n\
project(" + projectName + ")\n\
\n\
set(CMAKE_CXX_STANDARD 17)\n\
\n\
add_executable(${PROJECT_NAME}" + src + ")\n\
\n\
target_link_libraries(${PROJECT_NAME} PUBLIC simfor)\n";

        return result;
    }

    static main() {
        const result: string = "#include <iostream>\n\
\n\
using namespace std;\n\
\n\
int main(int argc, char **argv) {\n\
\tcout << \"Hello simfor\\n\";\n\
\treturn 0;\n\
}\n";

        return result;
    }
}