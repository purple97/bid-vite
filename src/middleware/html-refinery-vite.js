import fs from 'fs';
import { Middleware } from '..';

function RefineryScripts(Scripts, config) {
    Scripts.each((i, script) => {
        if (script.attribs.src.match(config.mainJsRex)) {
            script.attribs.src = config.path.replace(/\.htm(l)$/, '.js');
        }
        switch (script.attribs.type) {
            case undefined:
            case 'text/javascript':
                script.attribs.type = 'module';
                break;
            default:
                break;
        }
    });
    return Scripts;
}

/*
 * @param {Object} options:{rootPath:string, mainJsRex:RegExp}
 */
export const HtmlRefineryVite = (options = {}) => {
    const config = Object.assign(
        {
            rootPath: process.cwd(),
            mainJsRex: /\/src\/[\w]+\/[\s\S]+\.js$/
        },
        options
    );
    return (req, res, next) => {
        const htmlPath = config.rootPath + req.path;
        if (fs.existsSync(htmlPath)) {
            let { html } = Middleware.getScriptsElementByHtmlFile(req.path);
            let Scripts = html('script');
            RefineryScripts(Scripts, {
                path: req.path,
                mainJsRex: config.mainJsRex
            });

            res.send(html.html());
        } else {
            next();
        }
    };
};

export default HtmlRefineryVite;
