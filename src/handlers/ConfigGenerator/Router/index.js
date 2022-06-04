export function Initial(index) {
  try {
    var today = new Date();
    var workingvar = "\nend\n";
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
    workingvar += "\nconfigure terminal";
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
    for (const element of JSON.parse(localStorage.router_data)[index][
      "interfaces"
    ]) {
      if (element.porte.length) {
        workingvar += "\ninterface range " + element.porte.toString();
        if (element.ip && element.subnet) {
          workingvar += "\nip address " + element.ip + " " + element.subnet;
        }
        if (element.description) {
          workingvar += "\ndescription " + element.description;
        }
        if (element.shutdown) {
          workingvar += "\nshutdown";
        } else {
          workingvar += "\nno shutdown";
        }
        workingvar += "\nexit";
      }
    }
    for (const element of JSON.parse(localStorage.router_data)[index][
      "linterfaces"
    ]) {
      workingvar += "\ninterface Loopback " + element.id;
      if (element.ip && element.subnet) {
        workingvar += "\nip address " + element.ip + " " + element.subnet;
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
    for (const element of JSON.parse(localStorage.router_data)[index]["dhcp"]) {
      if (element.navn && element.ip && element.subnet && element.gateway) {
        workingvar +=
          '\nservice dhcp \nip dhcp pool "' +
          element.navn +
          '"' +
          "\nnetwork " +
          element.ip +
          " " +
          element.subnet +
          "\ndefault-router " +
          element.gateway;
        if (element.domæne) {
          workingvar += "\ndomain-name " + element.domæne;
        }
        if (element.DNS) {
          workingvar += "\ndns-server " + element.DNS;
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
    for (const element of JSON.parse(localStorage.router_data)[index][
      "staticroute"
    ]) {
      if (element.destinationip && element.destinationsubnet) {
        workingvar +=
          "\nip route " +
          element.destinationip +
          " " +
          element.destinationsubnet +
          " ";
        if (element.nexthopip) {
          workingvar += element.nexthopip;
        } else if (element.nexthopinterface) {
          workingvar += element.nexthopinterface;
        }
        if (element.distance) {
          workingvar += " " + element.distance;
        }
        if (element.permanent) {
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
    for (const element of JSON.parse(localStorage.router_data)[index]["ospf"]) {
      if (
        element.override ||
        element.passive.length ||
        element.enabled.length ||
        element.defaultroute
      ) {
        workingvar += "\nrouter ospf " + element.processid;
        if (element.defaultroute) {
          workingvar += "\ndefault-information originate";
        } else {
          workingvar += "\nno default-information originate";
        }
        if (element.override) {
          workingvar += "\nrouter-id " + element.override;
        } else {
          workingvar += "\nno router-id";
        }
        if (element.passive.length) {
          for (const elem of element.passive) {
            workingvar += "\npassive-interface " + elem;
          }
        }
        if (element.enabled.length) {
          for (const elem of element.passive) {
            workingvar += "\nno passive-interface " + elem;
          }
        }
        workingvar += "\nexit";
      }
      if (element.enabled.length) {
        workingvar +=
          "\ninterface range " +
          element.enabled.toString() +
          "\nip ospf " +
          element.processid +
          " area " +
          element.area +
          "\nexit";
      }
    }
    let workingdata = JSON.parse(localStorage.router_final);
    workingdata[index]["ospf"] = workingvar;
    localStorage.router_final = JSON.stringify(workingdata);
    return workingvar;
  } catch (e) {}
}

export function Runner(index) {
  Initial(index);
  Interfaces(index);
  DHCP(index);
  Staticroute(index);
  OSPF(index);
}
