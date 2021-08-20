/*
 * @Author: dezhao.chen
 * @Date: 2020-04-18 17:06:56
 * @LastEditors: dezhao.chen
 * @LastEditTime: 2020-07-16 16:08:49
 * @Description: 检测html中的js路径是否正确
 * @用法:
 * const checkPathInHtmlMiddlewar = require('./chack-path-in-html');
 * app.get('/index.html', checkPathInHtmlMiddlewar);
 */
import fs from 'fs';
import path from 'path';
import colors from 'cli-color';
import cheerio from 'cheerio';

export const getScriptsElementByHtmlFile = filePath => {
    let jsPath = filePath.replace('.html', '.js');
    jsPath = '@cdnhost' + jsPath.replace('index.js', '@version/index.js');
    let fileData = fs.readFileSync(path.join(process.cwd(), filePath), 'utf-8');
    let $ = cheerio.load(fileData);
    return {
        jsPath,
        html: $,
        sourceHtml: fileData
    };
};

const checkHtmlFilePath = filePath => {
    let isExist = true;
    let { jsPath, html } = getScriptsElementByHtmlFile(filePath);
    let Scripts = html(`script[src="${jsPath}"]`);
    if (Scripts.length <= 0) {
        isExist = false;
    } else {
        // console.log(Scripts[0].attribs.type);
    }

    return isExist;
};

const ChackPathInHtml = (req, res, next) => {
    if (checkHtmlFilePath(req.path)) {
        // res.render('.' + req.path, { htmlWebpackPlugin: null });
        next();
    } else {
        console.log(colors.red('index.js地址和html地址不匹配:' + req.path));
    }
};

export default ChackPathInHtml;
