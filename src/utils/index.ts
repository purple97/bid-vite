import path from 'path';
import getConfigJson from './get-config-json';
//@ts-ignore
import Repo from 'git-tools';
// import getAlias from './get-alias'
import getBuildInfo from './get-build-info';
import setConfigFileVersion from './set-config-file-version';

// import projectGenerator from './project-generator'
// import requireFileToJSON from './require-file-to-json'

import { IUserConfig } from '../interfaces';

class Utils {
    git: any;
    userConfig: IUserConfig;
    getUserConfig: IUserConfig;
    __parentdir: string | null;
    getBuildInfo: (version: string) => { autoGetEntry: any; autoGetHtml: any };
    constructor() {
        this.userConfig = this.getUserConfig = getConfigJson('config.json');
        this.getBuildInfo = getBuildInfo;
        this.git = setConfigFileVersion(this.userConfig);
        this.git.repo = new Repo(process.cwd());
        this.__parentdir = null;
    }
    get path() {
        return {
            get rootPath() {
                return path.join(__dirname, '../../');
            },
            get cwdPath() {
                return process.cwd();
            },
            get parentDir(): string {
                //@ts-ignore
                return this.__parentdir || path.join(__dirname, '../../');
            }
        };
    }
    setParentDir(_path: string) {
        this.__parentdir = _path;
    }
}

export default new Utils();
