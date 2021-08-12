import os from 'os';
const getIPAddress = () => {
    let IPv4 = '127.0.0.1';
    const networkInfo: any = os.networkInterfaces().eth0 || os.networkInterfaces().en0;
    for (let i = 0; i < networkInfo.length; i++) {
        if (networkInfo[i].family == 'IPv4') {
            IPv4 = networkInfo[i].address;
        }
    }
    return IPv4;
};
export default getIPAddress;
