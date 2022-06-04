export function RouterInterfaces(routermodel) {
  if (routermodel == 1941) {
    return ["gi0/0", "gi0/1", "Serial 0/0/0", "Serial 0/0/1", "port-channel 1"];
  } else {
    return [
      "gi0/0/0",
      "gi0/0/1",
      "port-channel 1",
      "Serial 0/1/0",
      "Serial 0/1/1",
    ];
  }
}

export function SwitchInterfaces() {}
