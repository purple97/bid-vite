/*
    代码检测
*/
//@ts-ignore
import align from 'wide-align';
import colors from 'cli-color';
//@ts-ignore
import inquirer from 'inquirer';
//@ts-ignore
import { CLIEngine } from 'eslint';
import getUserConfig from '../utils/get-config-json';
import getBuildInfo from '../utils/get-build-info';
// import { IUserConfigWithBuildInfo } from '../interfaces'

const printMessage = (results: any[]) => {
    let errorCount = 0;
    let warningCount = 0;
    results.forEach((res: any) => {
        if (res.errorCount != 0) {
            console.log('\n', res.filePath);
            errorCount += res.errorCount;
            warningCount += res.warningCount;
            console.group();
            res.messages.forEach((mgs: any) => {
                console.info(
                    colors.red(align.center(mgs.line + ':' + mgs.column, 9)),
                    align.left(mgs.message, 64),
                    colors.cyan(align.left(mgs.ruleId, 16))
                );
            });
            console.groupEnd();
        }
    });
    console.log('\n ===========================================================================');
    if (errorCount || warningCount) {
        console.info(colors.red(errorCount + '处错误，' + warningCount + '处警告'));
    } else {
        console.info(colors.yellow('未检测到代码错误，非常棒~ '));
    }
};
const runLint = (dirPaths: string[]) => {
    const cli = new CLIEngine();
    const report = cli.executeOnFiles(dirPaths);
    printMessage(report.results);
};

const Lint = async () => {
    console.log(colors.green('开始代码检测'));
    // let deployJSON = null;
    let { version } = getUserConfig(); //读取工程根目录下的config.json
    let buildInfo = getBuildInfo(version); //返回所有autoGetEntry({'带版本号的js':'XX.js'}),返回所有autoGetHtml({html = {keys: [],jsEntry: {},originList: [html目录]}})
    const answers = await inquirer.prompt([
        {
            type: 'checkbox',
            name: 'selectedEntry',
            message: '请选择需要进行代码检测的页面:',
            choices: buildInfo.autoGetHtml.keys
        }
    ]);
    // console.log(answers);
    if (answers.selectedEntry.length == 0) {
        return console.log(colors.red('没有选择任何页面,检测结束'));
    }
    const dirPaths: string[] = [];
    answers.selectedEntry.forEach((path: string) => {
        let dirPathJSX = path.replace(/[.\w]*\/index$/, '**/*.js*');
        let dirPathTSX = path.replace(/[.\w]*\/index$/, '**/*.ts*');
        dirPaths.push(dirPathJSX, dirPathTSX);
    });
    try {
        runLint(dirPaths);
    } catch (err) {
        console.log(colors.red('代码检测异常！'));
        console.log(colors.red(err));
    }
};

export default Lint;
