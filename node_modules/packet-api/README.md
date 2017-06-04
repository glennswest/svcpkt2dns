# packet-api

## About

### Description
A packet.net API client implemented in nodejs

### Author
ContainerShip Developers - developers@containership.io

## Usage

### Instantiation / Authentication
```javascript
var packet = new PacketAPI({
    api_key: "mypacketapikey"
});
```

### Devices

#### Get Devices
[Get Devices Documentation](https://www.packet.net/resources/docs/#page:devices,header:devices-devices-get)
```javascript
packet.get_devices("project_id", function(err, response){
    if(err)
        throw err;

    console.log(response);
});
```

#### Create Device
[Create Device Documentation](https://www.packet.net/resources/docs/#page:devices,header:devices-devices-post)
```javascript
packet.create_device("project_id", {
    "hostname": "my-first-device",
    "plan": "baremetal_1",
    "userdata": ""
    "facility": "facility-name",
    "operating_system": "ubuntu_14_04",
    "sshKeys": []
}, function(err, response){
    if(err)
        throw err;

    console.log(response);
});
```

#### Get Device
[Get Device Documentation](https://www.packet.net/resources/docs/#page:devices,header:devices-device-get)
```javascript
packet.get_device("device_id", function(err, response){
    if(err)
        throw err;

    console.log(response);
});
```

#### Update Device
[Update Device Documentation](https://www.packet.net/resources/docs/#page:devices,header:devices-device-patch)
```javascript
packet.update_device("device_id", {
    "hostname": "my-updated-first-device"
}, function(err, response){
    if(err)
        throw err;

    console.log(response);
});
```

#### Delete Device
[Delete Device Documentation](https://www.packet.net/resources/docs/#page:devices,header:devices-device-delete)
```javascript
packet.delete_device("device_id", function(err, response){
    if(err)
        throw err;

    console.log(response);
});
```

#### Get Plans
[Get Plans Documentation](https://www.packet.net/resources/docs/#page:devices,header:devices-plans)
```javascript
packet.get_plans(function(err, response){
    if(err)
        throw err;

    console.log(response);
});
```

#### Get Facilities
[Get Facilities Documentation](https://www.packet.net/resources/docs/#page:devices,header:devices-locations)
```javascript
packet.get_facilities(function(err, response){
    if(err)
        throw err;

    console.log(response);
});
```

#### Get Operating Systems
[Get Operating Systems Documentation](https://www.packet.net/resources/docs/#page:devices,header:devices-operating-systems)
```javascript
packet.get_operating_systems(function(err, response){
    if(err)
        throw err;

    console.log(response);
});
```

### Projects

#### Get Projects
[Get Projects Documentation](https://www.packet.net/resources/docs/#page:devices,header:devices-projects-get)
```javascript
packet.get_projects(function(err, response){
    if(err)
        throw err;

    console.log(response);
});
```

#### Create Project
[Create Project Documentation](https://www.packet.net/resources/docs/#page:devices,header:devices-projects-post)
```javascript
packet.create_project({
    name: "My First Project",
    payment_method: "eedbb692-b217-477f-bfe5-8dd58df1cd09"
}, function(err, response){
    if(err)
        throw err;

    console.log(response);
});
```

#### Get Project
[Get Project Documentation](https://www.packet.net/resources/docs/#page:devices,header:devices-project-get)
```javascript
packet.get_project("project_id", function(err, response){
    if(err)
        throw err;

    console.log(response);
});
```

#### Update Project
[Update Project Documentation](https://www.packet.net/resources/docs/#page:devices,header:devices-project-patch)
```javascript
packet.update_project("project_id", {
    name: "My Updated First Project"
}, function(err, response){
    if(err)
        throw err;

    console.log(response);
});
```

#### Delete Project
[Delete Project Documentation](https://www.packet.net/resources/docs/#page:devices,header:devices-project-delete)
```javascript
packet.delete_project("project_id", function(err, response){
    if(err)
        throw err;

    console.log(response);
});
```

### SSH Keys

#### Get SSH Keys
[Get SSH Keys Documentation](https://www.packet.net/resources/docs/#page:devices,header:devices-ssh-keys-get)
```javascript
packet.get_ssh_keys(function(err, response){
    if(err)
        throw err;

    console.log(response);
});
```

## Contributing
Pull requests and issues are encouraged!
