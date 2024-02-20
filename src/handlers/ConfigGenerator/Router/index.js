export function Initial(index) {
  try {
    var today = new Date();
    var workingvar = "\n\nend\n";
    var form = JSON.parse(localStorage.router_data)[index]["initial"][0];
    if (form.clock == true) {
      workingvar +=
        "clock set " +
        today.getHours() +
        ":" +
        today.getMinutes() +
        ":" +
        today.getSeconds() +
        " " +
        today.getDate() +
        " " +
        today.toLocaleString("en-us", { month: "short" }) +
        " " +
        today.getFullYear();
    }
    workingvar += "\nconf t";
    workingvar += "\nhostname " + form.hostname;
    if (form.motd) {
      workingvar += "\nbanner motd #" + form.motd + "#";
    }
    if (form.disabledomainlookup) {
      workingvar += "\nno ip domain lookup";
    }
    if (form.domæne) {
      workingvar += "\nip domain-name " + form.domæne;
    }
    if (form.secret) {
      workingvar += "\nenable secret " + form.secret;
    }
    workingvar += "\n\nline con 0";
    if (form.con0pass) {
      workingvar += "\npassword " + form.con0pass + "\nlogin";
    }
    if (form.synchronuslogging) {
      workingvar += "\nlogging synchronous";
    }
    workingvar += "\nexit";

    if (form.vtypass) {
      "\n\nusername root " + "password " + form.vtypass;
    }
    workingvar += "\n\nline vty 0 15\nlogin local";
    if (form.enablessh) {
      workingvar += "\ntransport input ssh";
    }
    if (form.telnet) {
      workingvar += "\ntransport input telnet";
    }
    workingvar += "\nexit";

    if (form.ipv6unicastrouting) {
      workingvar += "\n\nipv6 unicast-routing";
    }
    if (form.passwordencryption) {
      workingvar += "\nservice password-encryption";
    }
    if (form.genereatersa) {
      workingvar += "\ncrypto key generate rsa general-keys\n2048";
    }
    if (form.sshv2) {
      workingvar += "\nip ssh version 2";
    } else {
      workingvar += "\nip ssh version 1";
    }
    if (form.cdp) {
      workingvar += "\ncdp run";
    } else {
      workingvar += "\nno cdp run";
    }
    if (form.lldp) {
      workingvar += "\nlldp run";
    } else {
      workingvar += "\nno lldp run";
    }
    let workingdata = JSON.parse(localStorage.router_final);
    workingdata[index]["initial"] = workingvar;
    localStorage.router_final = JSON.stringify(workingdata);
    return workingvar;
  } catch (error) {}
}

export function Interfaces(index) {
  try {
    var workingvar = "";
    for (const e of JSON.parse(localStorage.router_data)[index]["interfaces"]) {
      if (e.port) {
        workingvar += "\n\ninterface " + e.port;
        if (e.ip && e.subnet) {
          workingvar += "\nip address " + e.ip + " " + e.subnet;
        }
        if (e.description) {
          workingvar += "\ndescription " + e.description;
        }
        if (e.shutdown) {
          workingvar += "\nshutdown";
        } else {
          workingvar += "\nno shutdown";
        }
        workingvar += "\nexit";
      }
      var elememt = e;
      for (const elem of elememt["subinterfaces"]) {
        workingvar +=
          "\n\ninterface " +
          e.port +
          "." +
          elem.id +
          "\ndescription subinterface for " +
          JSON.parse(localStorage.vlan_data).find((x) => x.id == elem.vlan)
            .navn +
          "\nencapsulation dot1Q " +
          elem.vlan;
        if (elem.ip && elem.subnet) {
          workingvar += "\nip address " + elem.ip + " " + elem.subnet;
        }
        workingvar += "\nexit";
      }
    }
    for (const e of JSON.parse(localStorage.router_data)[index][
      "linterfaces"
    ]) {
      workingvar += "\ninterface Loopback " + e.id;
      if (e.ip && e.subnet) {
        workingvar += "\nip address " + e.ip + " " + e.subnet;
      }
      workingvar += "\nno shutdown\nexit";
    }
    let workingdata = JSON.parse(localStorage.router_final);
    workingdata[index]["interfaces"] = workingvar;
    localStorage.router_final = JSON.stringify(workingdata);
    return workingvar;
  } catch (error) {}
}

export function DHCP(index) {
  try {
    var workingvar = "";
    for (const e of JSON.parse(localStorage.router_data)[index]["dhcp"]) {
      if (e.navn && e.ip && e.subnet && e.gateway) {
        workingvar +=
          "\n\nservice dhcp \nip dhcp pool " +
          e.navn +
          "\nnetwork " +
          e.ip +
          " " +
          e.subnet +
          "\ndefault-router " +
          e.gateway;
        if (e.domæne) {
          workingvar += "\ndomain-name " + e.domæne;
        }
        if (e.DNS) {
          workingvar += "\ndns-server " + e.DNS;
        }
        workingvar += "\nexit";
      }
    }
    let workingdata = JSON.parse(localStorage.router_final);
    workingdata[index]["dhcp"] = workingvar;
    localStorage.router_final = JSON.stringify(workingdata);
    return workingvar;
  } catch (error) {}
}

export function Staticroute(index) {
  try {
    var workingvar = "";
    for (const e of JSON.parse(localStorage.router_data)[index][
      "staticroute"
    ]) {
      if (e.destinationip && e.destinationsubnet) {
        workingvar +=
          "\n\nip route " + e.destinationip + " " + e.destinationsubnet + " ";
        if (e.nexthopip) {
          workingvar += e.nexthopip;
        } else if (e.nexthopinterface) {
          workingvar += e.nexthopinterface;
        }
        if (e.distance) {
          workingvar += " " + e.distance;
        }
        if (e.permanent) {
          workingvar += " permanent";
        }
      }
    }
    let workingdata = JSON.parse(localStorage.router_final);
    workingdata[index]["staticroute"] = workingvar;
    localStorage.router_final = JSON.stringify(workingdata);
    return workingvar;
  } catch (e) {}
}

export function OSPF(index) {
  try {
    var workingvar = "";
    for (const e of JSON.parse(localStorage.router_data)[index]["ospf"]) {
      if (
        e.override ||
        e.passive.length ||
        e.enabled.length ||
        e.defaultroute
      ) {
        workingvar += "\n\nrouter ospf " + e.processid;
        if (e.defaultroute) {
          workingvar += "\ndefault-information originate";
        } else {
          workingvar += "\nno default-information originate";
        }
        if (e.override) {
          workingvar += "\nrouter-id " + e.override;
        } else {
          workingvar += "\nno router-id";
        }
        if (e.passive.length) {
          for (const elem of e.passive) {
            workingvar += "\npassive-interface " + elem;
          }
        }
        if (e.referencebandwidth) {
          workingvar +=
            "\nauto-cost reference-bandwidth " + e.referencebandwidth;
        }
        workingvar += "\nexit";
      }
      if (e.enabled.length) {
        workingvar +=
          "\ninterface range " +
          e.enabled.toString() +
          "\nip ospf " +
          e.processid +
          " area " +
          e.area;
        if (e.hellointerval) {
          workingvar += "\nip ospf hello-interval " + e.hellointerval;
        }
        if (e.deadinterval) {
          workingvar += "\nip ospf dead-interval " + e.deadinterval;
        }
        if (e.priority) {
          workingvar += "\nip ospf priority " + e.priority;
        }
        workingvar += "\nexit";
      }
      if (e.pointtopoint.length) {
        workingvar +=
          "\ninterface range " +
          e.pointtopoint.toString() +
          "\nip ospf network point-to-point\nexit";
      }
    }
    let workingdata = JSON.parse(localStorage.router_final);
    workingdata[index]["ospf"] = workingvar;
    localStorage.router_final = JSON.stringify(workingdata);
    return workingvar;
  } catch (e) {}
}

function ipinverter(data) {
  let arr = data.split(".");
  let x = 255 - arr[0] + ".";
  x += 255 - arr[1] + ".";
  x += 255 - arr[2] + ".";
  x += 255 - arr[3];
  return x;
}

export function NAT(index) {
  try {
    var workingvar = "";
    for (const e of JSON.parse(localStorage.router_data)[index]["dynamicnat"]) {
      if (
        e.interalip &&
        e.internalsubnet &&
        e.externalendip &&
        e.externalstartip &&
        e.externalsubnet &&
        e.internalinterface &&
        e.externalinterface
      ) {
        workingvar +=
          "\n\naccess-list " +
          6 +
          e.index +
          " permit " +
          e.interalip +
          " " +
          ipinverter(e.internalsubnet) +
          "\nip nat pool ext_pool" +
          6 +
          e.index +
          " " +
          e.externalstartip +
          " " +
          e.externalendip +
          " netmask " +
          e.externalsubnet +
          "\nno ip nat inside source list " +
          6 +
          e.index +
          " pool ext_pool" +
          6 +
          e.index +
          "\nip nat inside source list " +
          6 +
          e.index +
          " pool ext_pool" +
          6 +
          e.index;
        if (e.overload) {
          workingvar += " overload";
        }
        workingvar +=
          "\ninterface range " +
          e.internalinterface.toString() +
          "\nno ip nat outside\nip nat inside\nexit\n interface range " +
          e.externalinterface.toString() +
          "\nno ip nat inside\nip nat outside\nexit";
      }
    }
    for (const e of JSON.parse(localStorage.router_data)[index][
      "dynamicnatport"
    ]) {
      if (
        e.interalip &&
        e.internalsubnet &&
        e.internalinterface &&
        e.externalinterface_
      ) {
        workingvar +=
          "\n\naccess-list " +
          7 +
          e.index +
          " permit " +
          e.interalip +
          " " +
          ipinverter(e.internalsubnet) +
          "\nno ip nat inside source list " +
          7 +
          e.index +
          "\nip nat inside source list " +
          7 +
          e.index +
          " interface " +
          e.externalinterface_ +
          " overload";
        workingvar +=
          "\ninterface range " +
          e.internalinterface.toString() +
          "\nno ip nat outside\nip nat inside\nexit\n interface " +
          e.externalinterface_ +
          "\nno ip nat inside\nip nat outside\nexit";
      }
    }
    for (const e of JSON.parse(localStorage.router_data)[index]["staticnat"]) {
      if (e.interalip && e.externalip) {
        workingvar +=
          "\nip nat inside source static " + e.interalip + " " + e.externalip;
      }
    }
    let workingdata = JSON.parse(localStorage.router_final);
    workingdata[index]["nat"] = workingvar;
    localStorage.router_final = JSON.stringify(workingdata);
    return workingvar;
  } catch (error) {}
}

function Customconfig(index) {
  try {
    if (
      JSON.parse(localStorage.router_data)[index]["misc"][0]["customconfig"]
    ) {
      let workingvar =
        "\n\n" +
        JSON.parse(localStorage.router_data)[index]["misc"][0]["customconfig"];
      let workingdata = JSON.parse(localStorage.router_final);
      workingdata[index]["customconfig"] = workingvar;
      localStorage.router_final = JSON.stringify(workingdata);
      return workingvar;
    }
  } catch (error) {}
}

export function FHRP(index) {
  try {
    var workingvar = "";
 //   for (const e of JSON.parse(localStorage.router_data)[index][
 //     "FHRP"
 //   ]) {
 //     if (e.destinationip && e.destinationsubnet) {
 //       workingvar +=
 //         "\n\nip route " + e.destinationip + " " + e.destinationsubnet + " ";
 //       if (e.nexthopip) {
 //         workingvar += e.nexthopip;
 //       } else if (e.nexthopinterface) {
 //         workingvar += e.nexthopinterface;
 //       }
 //       if (e.distance) {
  //        workingvar += " " + e.distance;
  //      }
   //     if (e.permanent) {
   //       workingvar += " permanent";
   //     }
   //   }
   // }
   // let workingdata = JSON.parse(localStorage.router_final);
   // workingdata[index]["staticroute"] = workingvar;
   // localStorage.router_final = JSON.stringify(workingdata);
   // return workingvar;
  } catch (e) {}
}

export function EIGRP(index) {
  try {return "\n!! EIGRP config generation is not yet implemented."
  } catch (e) {}
}

export function VPN(index) {
  try {return "\n!! VPN config generation is not yet implemented."
  } catch (e) {}
}

export function Security(index) {
  try {return "\n!! Security config generation is not yet implemented."
  } catch (e) {}
}
export function BGP(index) {
  try {return "\n!! BGP config generation is not yet implemented."
  } catch (e) {}
}

export function Runner(index) {
  Initial(index);
  Interfaces(index);
  DHCP(index);
  Staticroute(index);
  OSPF(index);
  EIGRP(index);
  NAT(index);
  FHRP(index);
  VPN(index);
  Security(index)
  Customconfig(index);
  BGP(index);
}
