import { networkInterfaces } from 'os';
const getIPAddress = () => {
    let IPv4 = '127.0.0.1';
    const networkInfo = networkInterfaces().eth0 || networkInterfaces().en0;
    for (let i = 0; i < networkInfo.length; i++) {
        if (networkInfo[i].family == 'IPv4') {
            IPv4 = networkInfo[i].address;
        }
    }
    return IPv4;
};
export default getIPAddress;
