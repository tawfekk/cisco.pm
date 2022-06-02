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
    if (form.motd != "") {
      workingvar += "\nbanner motd #" + form.motd + "#";


      
      let workingdata = JSON.parse(localStorage.router_final);
      workingdata[index]["initial"] = workingvar;
      localStorage.router_final = JSON.stringify(workingdata);
      return workingvar;
    }
  } catch (error) {}
}

export function Interfaces(index) {
  try {
    var workingvar = "";
    for (const element of JSON.parse(localStorage.router_data)[index][
      "interfaces"
    ]) {
      workingvar +=
        "\ninterface range " +
        element.porte.toString() +
        "\nip address " +
        element.ip +
        " " +
        element.subnet;
      if (element.description != "" && element.description != undefined) {
        workingvar += "\ndescription " + element.description;
      }
      workingvar += "\nexit";
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
      if (element.domæne != undefined) {
        workingvar += "\ndomain-name " + element.domæne;
      }
      if (element.DNS != undefined) {
        workingvar += "\ndns-server " + element.DNS;
      }
      workingvar += "\nexit";
      //for (const elem of Input29.text.replace("-", " ").split("+")){workingvar += "\nip dhcp excluded-address "+elem}
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
      workingvar +=
        "\nip route " +
        element.destinationip +
        " " +
        element.destinationsubnet +
        " ";
      if (element.nexthopip) {
        workingvar += element.nexthopip;
      } else {
        workingvar += element.nexthopinterface;
      }
      if (element.distance) {
        workingvar += " " + element.distance;
      }
      if (element.permanent == true) {
        workingvar += " permanent";
      }
    }
    let workingdata = JSON.parse(localStorage.router_final);
    workingdata[index]["staticroute"] = workingvar;
    localStorage.router_final = JSON.stringify(workingdata);
    return workingvar;
  } catch (e) {}
}

export function Runner(index) {
  Initial(index);
  Interfaces(index);
  DHCP(index);
  Staticroute(index);
}
