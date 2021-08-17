/*  */
import path from 'path';
import getConfigJson from './get-config-json';
import Repo from 'git-tools';
import getBuildInfo from './get-build-info';
import setConfigFileVersion from './set-config-file-version';

class Utils {
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
            get parentDir() {
                return this.__parentdir || path.join(__dirname, '../../');
            }
        };
    }
    setParentDir(_path) {
        this.__parentdir = _path;
    }
}

export default new Utils();
