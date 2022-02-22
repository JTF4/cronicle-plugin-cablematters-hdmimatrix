/*
 * WattBox Cronicle Plugin
 *
 * Copyright (c) 2022 David Stevens
 * Author: David Stevens <issues@jtf4.com>
 *
 * This program is free software.
 * You should have received a copy of the MIT license along with
 * this program.
 *
 * You can be released from the requirements of the license by purchasing
 * a commercial license. Buying such a license is mandatory as soon as you
 * develop commercial activities involving this software software without
 * disclosing the source code of your own applications.
 *
 */

var Client = require('node-rest-client').Client;

var data;

process.stdin.on('data', res => {
    data = JSON.parse(res);
    console.log(data);

    try {
        let ip = data['params']['ip'];
        let outlet = data['params']['outlet'];
        let command = data['params']['command'];
        let username = data['params']['username'];
        let password = data['params']['password'];
    
        let authKey;
    
        if(username.length > 0 && password.length > 0){
            authKey = getAuthKey(username, password);
        }
    
        let commandUrl = `/control.cgi?outlet=${outlet}&command=${command}`;
    
        let client = new Client();
    
        let url = 'http://' + ip + commandUrl;
    
        console.log('making request:', url)
    
        var args = {
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Basic ${authKey}`
            },
        }
    
        client
            .get(url, args, function (data, response) {
                console.log('herefsdfd');
                console.log({ data: data, response: response })
            })
            .on('error', function (error) {
                debug('error response:', error)
                console.log({ error: error })
            })
    
    
        console.log('{ "complete": 1 }');
        
    } catch (err) {
        console.log(err);
        console.log('{ "complete": 1, "code": 999, "description": "Failed to execute." }')
    }
});

function getAuthKey(username, password){
    let authString = username + ':' + password;
    let auth64 = Buffer.from(authString).toString('base64');
    return auth64;
}