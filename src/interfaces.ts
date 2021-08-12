export interface IUserConfig {
    appName?: string;
    version: string;
    remotes?: string;
    cdnhost?: string;
    websiteHost?: string;
    alias?: string;
    publish?: any;
    'extract-common-to-path'?: boolean;
}

// export interface IUserConfigWithBuildInfo extends IUserConfig {
//     version: string
// }
