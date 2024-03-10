
import CryptoJS from "crypto-js";

function ipinverter(data) {
  let arr = data.split(".");
  let x = 255 - arr[0] + ".";
  x += 255 - arr[1] + ".";
  x += 255 - arr[2] + ".";
  x += 255 - arr[3];
  return x;
}

function SHA1(inputString) {
  const hash = CryptoJS.SHA1(inputString);
  return hash.toString(CryptoJS.enc.Hex);
}

function isIPv6(address) {
  // Regular expression to match IPv6 address
  const ipv6Regex = /^(?:(?:[a-fA-F\d]{1,4}:){7}(?:[a-fA-F\d]{1,4}|:)|(?:[a-fA-F\d]{1,4}:){6}(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}|:[a-fA-F\d]{1,4}|:)|(?:[a-fA-F\d]{1,4}:){5}(?::(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}|(?::[a-fA-F\d]{1,4}){1,2}|:)|(?:[a-fA-F\d]{1,4}:){4}(?:(?::[a-fA-F\d]{1,4}){0,1}:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}|(?::[a-fA-F\d]{1,4}){1,3}|:)|(?:[a-fA-F\d]{1,4}:){3}(?:(?::[a-fA-F\d]{1,4}){0,2}:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}|(?::[a-fA-F\d]{1,4}){1,4}|:)|(?:[a-fA-F\d]{1,4}:){2}(?:(?::[a-fA-F\d]{1,4}){0,3}:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}|(?::[a-fA-F\d]{1,4}){1,5}|:)|(?:[a-fA-F\d]{1,4}:){1}(?:(?::[a-fA-F\d]{1,4}){0,4}:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}|(?::[a-fA-F\d]{1,4}){1,6}|:)|(?::(?:(?::[a-fA-F\d]{1,4}){0,5}:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}|(?::[a-fA-F\d]{1,4}){1,7}|:)))(?:%[0-9a-zA-Z]{1,})?$/gm;  
    return ipv6Regex.test(address);
}

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
        if (!isIPv6(e.ip)) {
        if (e.ip && e.subnet && e.interfacedhcp != true) {
          workingvar += "\nip address " + e.ip + " " + e.subnet;
        }
        if (e.interfacedhcp){
          workingvar += "\nip address dhcp";
        }}else{
          workingvar += "\nipv6 enable"; ;
          if (e.ip && e.subnet && e.interfacedhcp != true) {
            workingvar += "\nipv6 address " + e.ip + e.subnet;
            if(e.eui64){workingvar += " eui-64"}
            if(e.linklocal){
              workingvar += "\nipv6 address "+ e.linklocal +" link-local";
            }
          }
          if (e.interfacedhcp){
            workingvar += "\nipv6 address dhcp";
          }
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

        if (!isIPv6(elem.ip)) {
        if (elem.ip && elem.subnet) {
          workingvar += "\nip address " + elem.ip + " " + elem.subnet;
        }}else{
          if (elem.ip && elem.subnet) {
            workingvar += "\nipv6 enable";
            workingvar += "\nipv6 address " + elem.ip + elem.subnet;
          }
        }
        workingvar += "\nexit";
      }
    }
    for (const e of JSON.parse(localStorage.router_data)[index][
      "linterfaces"
    ]) {
      workingvar += "\ninterface Loopback " + e.id;
      if (e.ip && e.subnet) {
        if (!isIPv6(e.ip)) {
        workingvar += "\nip address " + e.ip + " " + e.subnet;
        }else{
          workingvar += "\nipv6 enable";
          workingvar += "\nipv6 address " + e.ip + e.subnet;
        }
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
      if (e.name && e.ip && e.subnet && e.gateway) {
        workingvar +=
          "\n\nservice dhcp \nip dhcp pool " +
          e.name +
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
    for (const e of JSON.parse(localStorage.router_data)[index]["dhcpexclusion"]) {
      if (e.from && e.to) {
        workingvar += "\nip dhcp excluded-address " + e.from + " " + e.to;
      }
    }
    for (const e of JSON.parse(localStorage.router_data)[index]["dhcphelper"]) {
      for (const elem of e.enabled) {
        if (elem && e.ip) {
        workingvar += "\ninterface " + elem + "\nip helper-address " + e.ip + "\nexit";
        }
      }
    }
    let workingdata = JSON.parse(localStorage.router_final);
    workingdata[index]["dhcp"] = workingvar;
    localStorage.router_final = JSON.stringify(workingdata);
    return workingvar;
  } catch (error) {}
}

export function FHRP(index) {
  try {
    var workingvar = "";
    for (const e of JSON.parse(localStorage.router_data)[index]["hsrp"]){
      if (e.group && e.ip && e.priority) {
        workingvar +=
          "\n\ninterface " +
          e.port +
          "\nstandby " +
          e.group +
          " ip " +
          e.ip +
          "\nstandby " +
          e.group +
          " priority " +
          e.priority;
          if (e.preempt){
            workingvar += "\nstandby " + e.group + " preempt";
          }
        //if (e.version == 2) {
        //  workingvar += " version 2";
        //}
        workingvar += "\nexit";
      }
    }
    for (const e of JSON.parse(localStorage.router_data)[index]["vrrp"]){
      if (e.group && e.ip && e.priority) {
        workingvar +=
          "\n\ninterface " +
          e.port +
          "\nvrrp " +
          e.group +
          " ip " +
          e.ip +
          "\nvrrp " +
          e.group +
          " priority " +
          e.priority;
          if (e.preempt){
            workingvar += "\nvrrp " + e.group + " preempt";
          }
        workingvar += "\nexit";
      }
    }

   let workingdata = JSON.parse(localStorage.router_final);
   workingdata[index]["fhrp"] = workingvar;
   localStorage.router_final = JSON.stringify(workingdata);
   return workingvar;
  } catch (e) {}
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
      if (e.enabled && !e.ospfv3 ) {
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
        if(e.networks){
        for (const elem of e.networks) {
          if (elem.ip && elem.subnet) {
            workingvar +=
              "\nnetwork " +
              elem.ip +
              " " +
              elem.subnet +
              " area " +
              e.area;
          }
        }
      }
        if (e.redistributestatic) {
          workingvar += "\nredistribute static subnets";
        }else{
          workingvar += "\nno redistribute static subnets";
        }
        if (e.redistributeconnected) {
          workingvar += "\nredistribute connected subnets";
        }else{
          workingvar += "\nno redistribute connected subnets";
        }
        if(e.redistributions){
        for (const elem of e.redistributions) {
          if(elem.defaultmetric){
          workingvar += "\nredistribute " + elem.id + " subnets"
          }else{
            workingvar += "\nredistribute " + elem.id + " metric " + elem.bandwidthmetric + " " + elem.delaymetric + " " + elem.reliabilitymetric + " " + elem.loadmetric + " " + elem.mtumetric;
          }
        }
      }

        workingvar += "\nexit";
      
      if (e.enabled.length) {
       for (const elem of e.enabled) {
        workingvar +=
          "\ninterface " +
          elem.toString() +
          "\nip ospf " +
          e.processid +
          " area " +
          e.area;
        if (e.hellointerval) {
          workingvar += "\nip  ospf hello-interval " + e.hellointerval;
        }
        if (e.deadinterval) {
          workingvar += "\nip ospf dead-interval " + e.deadinterval;
        }
        if (e.priority) {
          workingvar += "\nip ospf priority " + e.priority;
        }
        workingvar += "\nexit";
        }
      }


      if (e.pointtopoint.length) {
        for(const elem of e.pointtopoint){
          workingvar +=
          "\ninterface " +
          elem.toString() +
          "\nip ospf network point-to-point\nexit";

        }
      }
    }

      if (e.ospfv3 && e.enabled.length) {
        workingvar += "\n\nipv6 router ospf " + e.processid;
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

        if (e.redistributestatic) {
          workingvar += "\nredistribute static";
        }else{
          workingvar += "\nno redistribute static";
        }
        if (e.redistributeconnected) {
          workingvar += "\nredistribute connected";
        }else{
          workingvar += "\nno redistribute connected";
        }
        if(e.redistributions){
        for (const elem of e.redistributions) {
          if(elem.defaultmetric){
          workingvar += "\nredistribute " + elem.id ;
          }else{
            workingvar += "\nredistribute " + elem.id + " metric " + elem.bandwidthmetric + " " + elem.delaymetric + " " + elem.reliabilitymetric + " " + elem.loadmetric + " " + elem.mtumetric;
          }
        }
      }
       for (const elem of e.enabled) {
        workingvar +=
          "\ninterface " +
          elem.toString() +
          "\nipv6 ospf " +
          e.processid +
          " area " +
          e.area;
        if (e.hellointerval) {
          workingvar += "\nipv6  ospf hello-interval " + e.hellointerval;
        }
        if (e.deadinterval) {
          workingvar += "\nipv6 ospf dead-interval " + e.deadinterval;
        }
        if (e.priority) {
          workingvar += "\nipv6 ospf priority " + e.priority;
        }
        workingvar += "\nexit";
        }


      if (e.pointtopoint.length) {
        for(const elem of e.pointtopoint){
          workingvar +=
          "\ninterface " +
          elem.toString() +
          "\nipv6 ospf network point-to-point\nexit";
          workingvar += "\nexit";

        }
      }
      }
    }

    for (const e of JSON.parse(localStorage.router_data)[index]["v3ospf"]) {
      if (e.enabled || e.enabledv6) {
      workingvar += "\n\nipv6 unicast-routing"
      workingvar += "\nrouter ospfv3 " + e.processid
      if(e.key){workingvar += "\narea "+ e.area + " authentication ipsec spi 2048 sha1 "+ SHA1(e.key)}
      if(e.override){workingvar += "\nrouter-id " + e.override}else{workingvar += "\nno router-id"}
      if (e.enabled){
        workingvar += "\naddress-family ipv4 unicast"
        if (e.referencebandwidth) {
          workingvar +=
            "\nauto-cost reference-bandwidth " + e.referencebandwidth;
        }
        if(e.passive){workingvar += "\npassive-interface default"}else{workingvar += "\nno passive-interface default"}
        if(e.defaultroute){
          workingvar += "\ndefault-information originate"
        }else{
          workingvar += "\nno default-information originate"
        }
        for (const i of e.enabled){workingvar += "\nno passive-interface "+i}
        if (e.redistributeconnected){
          workingvar += "\nredistribute connected"
        }else{
          workingvar += "\nno redistribute connected"
        }
        if(e.redistributestatic){
          workingvar += "\nredistribute static"
        }else{
          workingvar += "\nno redistribute static"
        }
        if(e.redistributions){
          for (const r of e.redistributions){
            if(r.defaultmetric){
              workingvar += "\nredistribute " + r.id
            }else{
              workingvar += "\nredistribute " + r.id + " metric " + r.bandwidthmetric + " " + r.delaymetric + " " + r.reliabilitymetric + " " + r.loadmetric + " " + r.mtumetric
            }
          }
        }
        workingvar += "\nexit"
      }
      if(e.enabledv6){
        workingvar += "\naddress-family ipv6 unicast"
        if (e.referencebandwidth) {
          workingvar +=
            "\nauto-cost reference-bandwidth " + e.referencebandwidth;
        }
        if(e.passive){workingvar += "\npassive-interface default"}else{workingvar += "\nno passive-interface default"}
        for (const i of e.enabledv6){workingvar += "\nno passive-interface "+i}
        if(e.defaultroute){
          workingvar += "\ndefault-information originate"
        }else{
          workingvar += "\nno default-information originate"
        }
        if (e.redistributeconnected){
          workingvar += "\nredistribute connected"
        }else{
          workingvar += "\nno redistribute connected"
        }
        if(e.redistributestatic){
          workingvar += "\nredistribute static"
        }else{
          workingvar += "\nno redistribute static"
        }
        if(e.redistributions){
          for (const r of e.redistributions){
            if(r.defaultmetric){
              workingvar += "\nredistribute " + r.id 
            }else{
              workingvar += "\nredistribute " + r.id + " metric " + r.bandwidthmetric + " " + r.delaymetric + " " + r.reliabilitymetric + " " + r.loadmetric + " " + r.mtumetric
            }
          }

        }
        workingvar += "\nexit"
      }

      workingvar += "\nexit"

      for (const i of e.enabled){
        workingvar += "\ninterface " + i
        workingvar += "\nospfv3 "+ e.processid + " ipv4 " + " area " + e.area
        if(e.hellointerval){workingvar += "\nospfv3 hello-interval " + e.hellointerval}else{workingvar += "\nno ospfv3 hello-interval"}
        if(e.deadinterval){workingvar += "\nospfv3 dead-interval " + e.deadinterval} else{workingvar += "\nno ospfv3 dead-interval"}
        if(e.priority){workingvar += "\nospfv3 priority " + e.priority}else{workingvar += "\nno ospfv3 priority"}
        workingvar += "\nexit"
      }

      for (const i of e.enabledv6){
        workingvar += "\ninterface " + i
        workingvar += "\nospfv3 "+ e.processid + " ipv6 " + " area " + e.area
        if(e.hellointerval){workingvar += "\nospfv3 hello-interval " + e.hellointerval}else{workingvar += "\nno ospfv3 hello-interval"}
        if(e.deadinterval){workingvar += "\nospfv3 dead-interval " + e.deadinterval} else{workingvar += "\nno ospfv3 dead-interval"}
        if(e.priority){workingvar += "\nospfv3 priority " + e.priority}else{workingvar += "\nno ospfv3 priority"}
        workingvar += "\nexit"
      }

      if(e.pointtopoint){
      for (const i of e.pointtopoint){
        workingvar += "\ninterface " + i
        workingvar += "\nip ospf network point-to-point"
        workingvar += "\nexit"
      }}
      
      if(e.pointtopointv6){
      for (const i of e.pointtopointv6){
        workingvar += "\ninterface " + i
        workingvar += "\nipv6 ospf network point-to-point"
        workingvar += "\nexit"
      }}

    }
  }

    let workingdata = JSON.parse(localStorage.router_final);
    workingdata[index]["ospf"] = workingvar;
    localStorage.router_final = JSON.stringify(workingdata);
    return workingvar;
  } catch (e) {console.log(e)}
}

export function EIGRP(index) {
  try {
    var workingvar = "";
    for (const e of JSON.parse(localStorage.router_data)[index]["eigrp"]) {
      if (e.as && !e.ipv6) {
        workingvar += "\n\nrouter eigrp " + e.as;
        if(e.autosummary){
          workingvar += "\nauto-summary";
        }else{
          workingvar += "\nno auto-summary";
        }
        if (e.routerid) {
          workingvar += "\neigrp router-id " + e.routerid;
        } else {
          workingvar += "\nno eigrp router-id";
        }
        if(e.redistributestatic){
          workingvar += "\nredistribute static";
        }else{
          workingvar += "\nno redistribute static";
        }
        if(e.redistributeconnected){
          workingvar += "\nredistribute connected";
        }else{
          workingvar += "\nno redistribute connected";
        }

        if(e.redistributions){
          for (const r of e.redistributions){
            if(r.defaultmetric){
              workingvar += "\nredistribute " + r.id
              workingvar += "\ndefault-metric 1000 100 255 1 1500"
            }else{
              workingvar += "\nredistribute " + r.id + " metric " + r.bandwidthmetric + " " + r.delaymetric + " " + r.reliabilitymetric + " " + r.loadmetric + " " + r.mtumetric
            }
          }
        }

        if(e.defaultpassive){
          workingvar += "\npassive-interface default";
        }else{
          workingvar += "\nno passive-interface default";
        }
        if(e.passive && !e.defaultpassive){
          for (const elem of e.passive) {
            workingvar += "\npassive-interface " + elem;
          }
        }
        if(e.enabled && e.defaultpassive){
          for (const elem of e.enabled) {
            workingvar += "\nno passive-interface " + elem;
          }
        }

        if(e.defaultroute){
          workingvar += "\nnetwork 0.0.0.0";
        }else{
          workingvar += "\nno network 0.0.0.0"
        }
        if(e.networks){
        for(const n of e.networks){
          if(!n.subnet){
            workingvar += "\nnetwork " + n.ip;
          }else{
            workingvar += "\nnetwork " + n.ip + " " + n.subnet;}
        }
        
         }
         workingvar += "\nexit";

        if(e.key){
          workingvar += "\n\nkey chain eigrp_as_" + e.as;
          workingvar += "\nkey 1"
          workingvar += "\nkey-string " + e.key;
          workingvar += "\naccept-lifetime 00:00:00 Jan 1 1993 infinite";
          workingvar += "\nsend-lifetime 00:00:00 Jan 1 1993 infinite";
          workingvar += "\nexit\nexit";

          for(const i of e.authenabled){
            workingvar += "\ninterface " + i;
            workingvar += "\nip authentication mode eigrp "+ e.as + " md5";
            workingvar += "\nip authentication key-chain eigrp "+ e.as + " eigrp_as_" + e.as;
            workingvar += "\nexit";

          }
        }

      }

        if (e.as && e.ipv6) {
          workingvar += "\n\nrouter eigrp " + e.as;
          workingvar += "\nno shutdown";
          if(e.autosummary){
            workingvar += "\nauto-summary";
          }else{
            workingvar += "\nno auto-summary";
          }
          if (e.routerid) {
            workingvar += "\neigrp router-id " + e.routerid;
          } else {
            workingvar += "\nno eigrp router-id";
          }
          if(e.redistributestatic){
            workingvar += "\nredistribute static";
          }else{
            workingvar += "\nno redistribute static";
          }
          if(e.redistributeconnected){
            workingvar += "\nredistribute connected";
          }else{
            workingvar += "\nno redistribute connected";
          }


        if(e.redistributions){
          for (const r of e.redistributions){
            if(r.defaultmetric){
              workingvar += "\nredistribute " + r.id
              workingvar += "\ndefault-metric 1000 100 255 1 1500"
            }else{
              workingvar += "\nredistribute " + r.id + " metric " + r.bandwidthmetric + " " + r.delaymetric + " " + r.reliabilitymetric + " " + r.loadmetric + " " + r.mtumetric
            }
          }
        }
          if(e.defaultpassive){
            workingvar += "\npassive-interface default";
          }else{
            workingvar += "\nno passive-interface default";
          }
          if(e.passive && !e.defaultpassive){
            for (const elem of e.passive) {
              workingvar += "\npassive-interface " + elem;
            }
          }
          if(e.enabled && e.defaultpassive){
            for (const elem of e.enabled) {
              workingvar += "\nno passive-interface " + elem;
            }
          }
           workingvar += "\nexit";
  
          if(e.key){
            workingvar += "\n\nkey chain eigrp_as_" + e.as;
            workingvar += "\nkey 1"
            workingvar += "\nkey-string " + e.key;
            workingvar += "\naccept-lifetime 00:00:00 Jan 1 1993 infinite";
            workingvar += "\nsend-lifetime 00:00:00 Jan 1 1993 infinite";
            workingvar += "\nexit\nexit";
  
            for(const i of e.authenabled){
              workingvar += "\ninterface " + i;
              workingvar += "\nipv6 authentication mode eigrp "+ e.as + " md5";
              workingvar += "\nipv6 authentication key-chain eigrp "+ e.as + " eigrp_as_" + e.as;
              workingvar += "\nexit";
  
            }

          }

          for(const i of e.enabled){
            workingvar += "\ninterface " + i;
            workingvar += "\nipv6 eigrp " + e.as;
            workingvar += "\nexit";
          }

        }    
  }

  for (const e of JSON.parse(localStorage.router_data)[index]["namedeigrp"]) {
    if (e.as) {

      if(e.key){
        workingvar += "\nkey chain eigrp_as_" + e.as;
        workingvar += "\nkey 1"
        workingvar += "\nkey-string " + e.key;
        workingvar += "\naccept-lifetime 00:00:00 Jan 1 1993 infinite";
        workingvar += "\nsend-lifetime 00:00:00 Jan 1 1993 infinite";
        workingvar += "\nexit\nexit";
      }
      
      workingvar += "\n\nrouter eigrp "+ e.name


      if(e.enabled){
      workingvar += "\naddress-family ipv4 unicast autonomous-system " + e.as;
      for (const elem of e.networks) {
        if (elem.ip && elem.subnet) {
          workingvar +=
            "\nnetwork " + elem.ip + " " + elem.subnet;
        }
        

      }

      for (const i of e.enabled){
        workingvar += "\naf-interface " + i;
        workingvar += "\nno passive-interface"
        workingvar += "\nexit";
      } 

      for (const i of e.disabled){
        workingvar += "\naf-interface " + i;
        workingvar += "\nshutdown"
        workingvar += "\nexit";
      } 

      if(e.defaultroute){
        workingvar += "\nnetwork 0.0.0.0";
      }else{
        workingvar += "\nno network 0.0.0.0"
      }

      if(e.defaultpassive){
        workingvar += "\naf-interface default"
        workingvar += "\npassive-interface"

      }

      if(e.redistributestatic || e.redistributeconnected || e.redistributions){
        workingvar += "\ntopology base";
        if(e.redistributestatic){
          workingvar += "\nredistribute static";
        }else{
          workingvar += "\nno redistribute static";
        }
        if(e.redistributeconnected){
          workingvar += "\nredistribute connected";
        }else{
          workingvar += "\nno redistribute connected";
        }
        if(e.redistributions){
          for (const elem of e.redistributions) {
            if(elem.defaultmetric){
            workingvar += "\nredistribute " + elem.id ;
            workingvar += "\ndefault-metric 1000 100 255 1 1500"
            }else{
              workingvar += "\nredistribute " + elem.id + " metric " + elem.bandwidthmetric + " " + elem.delaymetric + " " + elem.reliabilitymetric + " " + elem.loadmetric + " " + elem.mtumetric;
            }
          }
        }
        workingvar += "\nexit";
      }

      if(e.key){
        for(const i of e.enabled){
          workingvar += "\naf-interface " + i;
          workingvar += "\nauthentication mode md5";
          workingvar += "\nauthentication key-chain eigrp_as_" + e.as;
          workingvar += "\nexit";
        }
      }
      workingvar += "\nexit";
    }

    if(e.v6enabled){
    
      workingvar += "\naddress-family ipv6 unicast autonomous-system " + e.as;

      if(e.redistributestatic || e.redistributeconnected || e.redistributions){
        workingvar += "\ntopology base";
        if(e.redistributestatic){
          workingvar += "\nredistribute static";
        }else{
          workingvar += "\nno redistribute static";
        }
        if(e.redistributeconnected){
          workingvar += "\nredistribute connected";
        }else{
          workingvar += "\nno redistribute connected";
        }
        if(e.redistributions){
          for (const elem of e.redistributions) {
            if(elem.defaultmetric){
            workingvar += "\nredistribute " + elem.id 
            workingvar += "\ndefault-metric 1000 100 255 1 1500"
            }else{
              workingvar += "\nredistribute " + elem.id + " metric " + elem.bandwidthmetric + " " + elem.delaymetric + " " + elem.reliabilitymetric + " " + elem.loadmetric + " " + elem.mtumetric;
            }
          }
        }
        workingvar += "\nexit";
      }

      for (const i of e.v6enabled){
        workingvar += "\naf-interface " + i;
        workingvar += "\nno passive-interface"
        workingvar += "\nexit";
      } 

      for (const i of e.disabled){
        workingvar += "\naf-interface " + i;
        workingvar += "\nshutdown"
        workingvar += "\nexit";
      } 

      if(e.key){
        for(const i of e.v6enabled){
          workingvar += "\naf-interface " + i;
          workingvar += "\nauthentication mode md5";
          workingvar += "\nauthentication key-chain eigrp_as_" + e.as;
          workingvar += "\nexit";
        }
      }

    }
    
      
    }

  } 
    let workingdata = JSON.parse(localStorage.router_final);
    workingdata[index]["eigrp"] = workingvar;
    localStorage.router_final = JSON.stringify(workingdata);
    return workingvar;
  } catch (e) {console.log(e)}
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


export function VPN(index) {
  try {return "\n!! VPN config generation is not yet implemented."
  } catch (e) {}
}


export function BGP(index) {
  try {

    var workingvar = "";
    for (const e of JSON.parse(localStorage.router_data)[index]["bgp"]) {
      workingvar += "\n\nrouter bgp "+ e.as
      if(e.routerid){
        workingvar += "\nbgp router-id " + e.routerid;
      }else{
        workingvar += "\nno bgp router-id";
      }
      if(e.v6neighbours || e.v6networks){
        workingvar += "\nno bgp default ipv4-unicast"
      }

      for (const elem of e.neighbours) {
        workingvar += "\nneighbor " + elem.peerip + " remote-as " + elem.peeras
      }

      for (const elem of e.v6neighbours) {
        workingvar += "\nneighbor " + elem.peerip + " remote-as " + elem.peeras
      }

      if(e.autosummary){
        workingvar += "\nauto-summary"
      }else{
        workingvar += "\nno auto-summary"
      }

      if(e.neighbours || e.v6neighbours){

        if(e.neighbours){
          workingvar += "\naddress-family ipv4 unicast"

          if(e.redistributeconnected){
            workingvar += "\nredistribute connected"
          }else{
            workingvar += "\nno redistribute connected"
          }

          if(e.redistributestatic){
            workingvar += "\nredistribute static"
          }else{
            workingvar += "\nno redistribute static"
          }

          if(e.redistributions){
            for (const elem of e.redistributions) {
              if(elem.defaultmetric){
              workingvar += "\nredistribute " + elem.id 
              }else{
                workingvar += "\nredistribute " + elem.id + " metric " + elem.bandwidthmetric + " " + elem.delaymetric + " " + elem.reliabilitymetric + " " + elem.loadmetric + " " + elem.mtumetric;
              }
            }
          }

          for (const n of e.neighbours){
            workingvar += "\nneighbor "+n.peerip + " activate"
            if(n.peerprefixlimit){
              workingvar += "\nneighbor " + n.peerip + " maximum-prefix " + n.peerprefixlimit
              if(n.warningonly){workingvar += " warning-only" }
              }
          }

          for (const n of e.networks){
            if(!n.subnet){
            workingvar += "\nnetwork "+ n.ip
            }else{
            workingvar += "\nnetwork "+ n.ip + " mask " +n.subnet
            }
          }

          if(e.defaultroute){
            workingvar += "\nnetwork 0.0.0.0"
          }else{
            workingvar += "\nno network 0.0.0.0"
          }

        }

        if(e.v6neighbours){
          workingvar += "\naddress-family ipv6 unicast"

          if(e.redistributeconnected){
            workingvar += "\nredistribute connected"
          }else{
            workingvar += "\nno redistribute connected"
          }

          if(e.redistributestatic){
            workingvar += "\nredistribute static"
          }else{
            workingvar += "\nno redistribute static"
          }

          if(e.redistributions){
            for (const elem of e.redistributions) {
              if(elem.defaultmetric){
              workingvar += "\nredistribute " + elem.id 
              }else{
                workingvar += "\nredistribute " + elem.id + " metric " + elem.bandwidthmetric + " " + elem.delaymetric + " " + elem.reliabilitymetric + " " + elem.loadmetric + " " + elem.mtumetric;
              }
            }
          }

          for (const n of e.v6neighbours){
            workingvar += "\nneighbor "+n.peerip + " activate"
            if(n.peerprefixlimit){
              workingvar += "\nneighbor " + n.peerip + " maximum-prefix " + n.peerprefixlimit
              if(n.warningonly){workingvar += " warning-only" }
              }
          }

          for (const n of e.v6networks){
            workingvar += "\nnetwork "+ n.ip + n.prefix
          }
        }

      }


    }


    let workingdata = JSON.parse(localStorage.router_final);
    workingdata[index]["bgp"] = workingvar;
    localStorage.router_final = JSON.stringify(workingdata);
    return workingvar;
  } catch (e) {console.log(e)}
}

export function Security(index) {
  try {
  let workingvar = "";
  /*
  let data = JSON.parse(localStorage.router_data)[index]["basicsecurity"]; 
  if(data.autosecure){
    workingvar += "\n\nauto secure";
  }else{workingvar += "\nno auto secure";}
  if(data.tcpintercept){
    workingvar += "\n\nip tcp intercept mode intercept";
  }else{workingvar += "\nno ip tcp intercept mode intercept";}
  if(data.ipv6securty){
    workingvar += "\nipv6 source guard";
  }else{workingvar += "\nno ipv6 source guard";}
  
  for (const e of data.ipsourceguard){
      workingvar += "\ninterface " + e + "\nip verify source port-security" + "\nexit";
    }
  for (const e of data.dai){
      workingvar += "\n\nip arp inspection vlan " + e;
  }
  for (const e of data.dhcpsnooping){
      workingvar += "\n\nip dhcp snooping vlan " + e;
  }
  */


  if(JSON.parse(localStorage.router_data)[index]["localaaa"][0]["users"]){
    let data = JSON.parse(localStorage.router_data)[index]["localaaa"][0]
    if(JSON.parse(localStorage.router_data)[index]["localaaa"][0]["users"]){
    workingvar += "\n\naaa new-model"
    for (const e of JSON.parse(localStorage.router_data)[index]["localaaa"][0]["users"]){
      if(!e.privilege){
      workingvar += "\n\nusername " + e.username + " secret " + e.password}else{
        workingvar += "\n\nusername " + e.username + " privilege " + e.privilege + " secret " + e.password
      }
    }
    if(data.defaultauthentication){
      workingvar += "\n\naaa authentication login default local";
    }
    if(data.defaultauthorization){
      workingvar += "\n\naaa authorization exec default local";
    }
    if(data.defaultaccounting){
      workingvar += "\n\naaa accounting exec default start-stop local";
    }
    if(data.defaultaux0){
      workingvar += "\n\nline aux 0\nlogin authentication default\nexit";
    }
    if(data.defaultcon0){
      workingvar += "\n\nline con 0\nlogin authentication default\nexit";
    }
    if(data.defaultvty){
      workingvar += "\n\nline vty 0 15\nlogin authentication default\nexit";
    }

  }
}

  for (const e of JSON.parse(localStorage.router_data)[index]["advancedaaa"]){
   if (e.protocol == "radius"){
    if (JSON.parse(localStorage.router_data)[index]["basicsettings"][0]["model" === "1931"]){
      workingvar += "\n\naaa new-model\nradius-server host " + e.ip + " auth-port " + e.port + " acct-port " + e.port2
      if(e.key){
        workingvar += " key " + e.key;
      }
    }else if(e.protocol == "tacacs"){
      workingvar += "\n\naaa new-model"+
      ""
    }
   }
  }

  let workingdata = JSON.parse(localStorage.router_final);
  workingdata[index]["security"] = workingvar;
  localStorage.router_final = JSON.stringify(workingdata);
  return workingvar;
} catch (e) {}
}

export function Runner(index) {
  Initial(index);
  Interfaces(index);
  FHRP(index);
  DHCP(index);
  Staticroute(index);
  OSPF(index);
  EIGRP(index);
  BGP(index);
  NAT(index);
  VPN(index);
  Security(index)
  Customconfig(index);
}