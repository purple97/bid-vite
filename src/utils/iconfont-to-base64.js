import fs from 'fs';
import colors from 'cli-color';
import { program } from 'commander';
import urllib from 'urllib';

class IconfontToBase64 {
    constructor() {
        console.log(colors.blue('现在开始 iconfont ttf 转换 base64 ...'));
        this.init();
        this.action();
    }

    init() {
        program.option('-i, --input', '带有iconfont的文件').option('-o, --output', '可选，输出文件');
        program.parse(process.argv);
    }
    parseUrl(text) {
        let urlRegex = /(https?:?)?(\/\/at.alicdn.com\/t\/font_.*\.ttf)/;
        if (urlRegex.exec(text)) {
            return 'http:' + RegExp.$2;
        }
        return false;
    }

    parseLine(line) {
        return new Promise((resolve, reject) => {
            let template = '    src: url(data:font/truetype;charset=utf-8;base64,<>) format("truetype");';
            let url = this.parseUrl(line);
            if (url) {
                urllib.request(url, (err, data) => {
                    if (err) reject(err);
                    let line = template.replace('<>', data.toString('base64'));
                    resolve(line);
                });
            } else {
                resolve(line);
            }
        });
    }

    async action() {
        let input, output;
        const options = program.opts();
        if (options.input) {
            input = options.input;
        } else {
            process.exit(1);
        }
        let fileContent = fs.readFileSync(input).toString().split('\n');
        let arr = [];

        for (let i = 0; i < fileContent.length; i++) {
            let line = fileContent[i];
            let str = await this.parseLine(line);
            arr.push(str);
        }

        // 有输出路径则写到对应文件，否则直接替换原文件
        if (options.output) {
            output = options.output;
            fs.writeFileSync(output, arr.join('\n'));
            console.log(colors.green('替换完成！'));
        } else {
            fs.writeFileSync(input, arr.join('\n'));
            console.log(colors.yellow('没有指定输出路径，源文件替换完成！'));
        }
    }
}

export default IconfontToBase64;
