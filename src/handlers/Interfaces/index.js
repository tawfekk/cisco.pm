export function RouterInterfaces(routermodel) {
  if (routermodel == 1941) {
    return ["gi0/0", "gi0/1", "s0/0/0", "s0/0/1"];
  } else {
    return ["gi0/0/0", "gi0/0/1", "s0/1/0", "s0/1/1"];
  }
}

export function SwitchInterfaces(switchmodel){
  if (switchmodel == 2960) {
    return ["gi0/0", "gi0/1", "s0/0/0", "s0/0/1"];
  } else if (switchmodel == 3560) {
    return ["gi0/0/0", "gi0/0/1", "s0/1/0", "s0/1/1"];
  }
  else {
    return ["gi0/0/0", "gi0/0/1", "s0/1/0", "s0/1/1"];
  }
}
