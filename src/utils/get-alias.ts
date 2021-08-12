import path from 'path';
import { IAlias } from '../typings';

const getAlias = (userAlias: string[]): any => {
    /*
     *	生成webpack resolve.alias 别名配置
     */
    let alias: IAlias = {
        // 别名
        '@br': path.join(process.cwd(), './src/c/')
    };
    // eslint-disable-next-line
    for (let aliasName in userAlias) {
        userAlias[aliasName] = userAlias[aliasName].replace(/^@br\//, alias['@br']); // 将别名配置中的@br替换为'src/c'目录
    }
    alias = Object.assign(alias, userAlias);
    return alias;
};

export default getAlias;
