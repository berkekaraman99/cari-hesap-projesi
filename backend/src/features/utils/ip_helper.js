import { networkInterfaces as _networkInterfaces } from "os";

export const getLocalIP = async () => {
  const networkInterfaces = _networkInterfaces();
  for (const interfaceName in networkInterfaces) {
    const addresses = networkInterfaces[interfaceName];
    for (const address of addresses) {
      if (address.family === "IPv4" && !address.internal) {
        return address.address;
      }
    }
  }
  return null;
};
