var fs = require('fs');
var util = require('util');
var getenv = require('getenv');
var PacketAPI = require('packet-api');
var fs = require('fs');
var mqtt = require('mqtt');
var restify = require('restify')
var uuid = require('uuid');
var serveStatic = require('serve-static-restify')
var myuuid = uuid();
 

pkt_api_key = getenv('pktapikey');
defaultdomain = getenv('defaultdomain');

var packet = new PacketAPI({
    api_key: pkt_api_key
});

// Setup our database
var diskdb = require('diskdb');
var data_path = "/data";
db = diskdb.connect(data_path, ['hosts','projects']);
db.loadCollections(['hosts','projects']);


myIP = process.env.myIP;
console.log("My IP is: " + myIP);

// Setup Restify Web Serving for data
var app = restify.createServer()
 

// Setup MQTT for communications to DNS
//var mqtt_hostname = "mqtt://" + "svcmqtt" + "." + defaultdomain + ":1883";
var mqtt_hostname = "mqtt://" + myIP;
console.log(mqtt_hostname);
var mymqtt  = mqtt.connect(mqtt_hostname);

mymqtt.on('connect', function(){
    console.log("Attached to svcmqtt");
    mymqtt.subscribe('svcdnsadd');
    }
)

mymqtt.on('message', function(topic, messagestr){
        message = JSON.parse(messagestr);
        console.log("message: " + topic + "message: " + util.inspect(message));
        switch(topic){
            // Expect: var servicedata = {name: "svcdns",ip: myIP, id: myuuid, version: "v1"};
            case "servicediscovery":
                 switch(message.name){
                     case "svcdns":
                          break;
                     case "svcdnsadd":
                          console.log(util.inspect(message));
                          break;
                     default:
                          break;
                     }
               break;
            default:
               break;
         }

});

function add_host_name(name, ip){
        console.log("Add DNS Entry for " + name + "(" + ip + ")");
        message = {};
        message.name = name;
        message.ip = ip;
        message.version = 'v1';
        mymqtt.publish('svcdnsadd',JSON.stringify(message));
        return;
}

//{ projects: 
//   [ { id: '2213f239-96cc-49c4-a4f0-47545577f15f',
//       name: 'ncc',
//       created_at: '2017-05-12T06:24:30Z',
//       updated_at: '2017-05-28T04:02:08Z',
//       network_status: [Object],
//       max_devices: [Object],
//       members: [Object],
//       memberships: [Object],
//       invitations: [],
//       devices: [Object],
//       ssh_keys: [],
//       volumes: [],
//       payment_method: [Object],
//       href: '/projects/2213f239-96cc-49c4-a4f0-47545577f15f' },
//     { id: '97370964-7f09-4a12-971d-46ed19ebb3a2',
function check_projects()
{
    packet.get_projects(function(err, response){
       if(err)
        throw err;
       process_projects(response.projects);
       });
}

//{ devices: 
//   [ { id: '45bbde53-666b-4c25-aa06-0ae5f2286acc',
//       short_id: '45bbde53',
//       hostname: 'ctl',
//       description: null,
//       state: 'active',
//       tags: [],
//       image_url: null,
//       billing_cycle: 'hourly',
//       user: 'root',
//       iqn: 'iqn.2017-05.net.packet:device.45bbde53',
//       locked: true,
//       bonding_mode: 5,
//       created_at: '2017-05-12T06:28:23Z',
//       updated_at: '2017-05-30T00:11:52Z',
//       ipxe_script_url: null,
//       operating_system: [Object],
//       facility: [Object],
//       project: [Object],
//       ssh_keys: [Object],
//       project_lite: [Object],
//       volumes: [],
//       ip_addresses: [Object],
//       plan: [Object],
//       userdata: '',
//       network_ports: [Object],
//       href: '/devices/45bbde53-666b-4c25-aa06-0ae5f2286acc' } ],
//  meta: 
//   { first: { href: '/projects/2213f239-96cc-49c4-a4f0-47545577f15f/devices?page=1' },
//     previous: null,
//     self: { href: '/projects/2213f239-96cc-49c4-a4f0-47545577f15f/devices?page=1' },
//     next: null,
//     last: { href: '/projects/2213f239-96cc-49c4-a4f0-47545577f15f/devices?page=1' },
//     total: 1 } }
//  ip_addresses: 
//   [ { id: '5da087c3-6579-476a-b16f-0d1ba1d4e8cb',
//       address_family: 4,
//       netmask: '255.255.255.254',
//       created_at: '2017-05-30T07:49:48Z',
//       public: true,
//       cidr: 31,
//       management: true,
//       manageable: true,
//       enabled: true,
//       assigned_to: [Object],
//       network: '147.75.92.16',
//       address: '147.75.92.17',
//       gateway: '147.75.92.16',
//       href: '/ips/5da087c3-6579-476a-b16f-0d1ba1d4e8cb' },
function get_ip_address(addrs)
{
var myips = [];
var ipcnt = 0;

    addrs.forEach(function(addr){
               if ((addr.address_family == 4) && addr.public){
                  myips[ipcnt] = addr.address;
                  ipcnt = ipcnt + 1;
                  }
               });
    
    return(myips);
}  

function update_record(hr)
{
var updated;

	query = {};
	query.id = hr.id;
        options = {};
        options.multi = false;
        options.upsert = false;
        updated = db.hosts.update(query, hr, options);
        return(updated);
}

function find_project_name(pid)
{
      x = db.projects.findOne({__id : pid});
      if (x == undefined){
         return("undefined");
       }
       return x.name;
}

function process_device(dev)
{
var hr = {};
      ipaddr = get_ip_address(dev.ip_addresses);
      pid = dev.project.href.split('/')[2];
      console.log(pid + " " + dev.hostname + " " + ipaddr[0]);
      x = db.hosts.findOne({id : dev.id});
      if (x === undefined){
         if (dev.hostname.includes(".")){
      	    hr.hostname = dev.hostname;
           } else {
            hr.hostname = dev.hostname + "." + defaultdomain;
           }
         hr.id = dev.id;
         hr.project_id = pid;
         hr.project_name = find_project_name(pid);
         hr.ip = ipaddr[0];
         hr.first_seen = Date.now();
         hr.last_seen = Date.now();
         db.hosts.save(hr);
         add_host_name(hr.hostname, hr.ip);
         console.log("Adding " + hr.hostname);
         } else {
         console.log("Updating " + x.hostname);
         x.last_seen = Date.now();
         update_record(x);
         }
}

function process_devices(devs)
{
      devs.forEach(process_device);
}

function get_devices(pid)
{
      packet.get_devices(pid, function(err, response){
      if(err)
         throw err;
         process_devices(response.devices);
         });
}

function process_project(project)
{
var proj = {};
        console.log("----- process_project -----");
        x = db.projects.findOne({__id : project.id});
        if (x === undefined){
           x = {};
           x.__id = project.id;
           x.name = project.name;
           db.projects.save(x);
           }
        get_devices(project.id);
}        

function process_projects(projs)
{
      projs.forEach(process_project);

}

    check_projects();
    setInterval(check_projects, 60000);

