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

var ip;
var outlet;
var command;
var extraData;
var username;
var password;

process.stdin.on('data', (res) => {
	data = JSON.parse(res);
	console.log('Starting Plugin');

	try {
		ip = data['params']['ip'];
		outlet = data['params']['outlet'];
		command = data['params']['command'];
		extraData = data['params']['extraData'];
		username = data['params']['username'];
		password = data['params']['password'];

		let commandUrl;

		switch (command) {
			case 'Power Off':
				commandUrl = `/control.cgi?outlet=${outlet}&command=0`;
				executeCommand(commandUrl);
				break;
			case 'Power On':
				commandUrl = `/control.cgi?outlet=${outlet}&command=1`;
				executeCommand(commandUrl);
				break;
			case 'Custom Power Reset':
				commandUrl = `/control.cgi?outlet=${outlet}&command=3`;
				if (extraData) {
					try {
						Number(extraData);
					} catch (e) {
						extraData = 5000;
					}
				} else {
					extraData = 5000;
				}
				// Turn the switch off
				commandUrl = `/control.cgi?outlet=${outlet}&command=0`;
				executeCommandNoExit(commandUrl);

				// Turn the switch on
				setTimeout(() => {
					let commandUrl2 = `/control.cgi?outlet=${outlet}&command=1`;
					executeCommand(commandUrl2);
				}, extraData);
				break;
			case 'Power Reset':
				commandUrl = `/control.cgi?outlet=${outlet}&command=3`;
				executeCommand(commandUrl);
				break;
			case 'Auto Reboot On':
				commandUrl = `/control.cgi?outlet=0&command=4`;
				executeCommand(commandUrl);
				break;
			case 'Auto Reboot Off':
				commandUrl = `/control.cgi?outlet=0&command=5`;
				executeCommand(commandUrl);
				break;
		}
	} catch (err) {
		console.log(err);

		console.log(`{ "complete": 1, "code": 999, "description": "Failed to execute: ${err}" }`);
	}
});

/**
 * It sends a GET request to the server with the command URL.
 * @param command - The URL to the command.
 */

function executeCommand(command) {
	let url = 'http://' + ip + command;
	rest_get(url)
		.then((res) => {
			console.log(new Buffer.from(res).toString());
		})
		.catch((error) => {
			console.log('error response:', error);
			console.log(`{ "complete": 1, "code": 999, "description": "Failed to execute: ${error}" }`);
		})
		.finally(() => {
			console.log('Command Complete');
			console.log('{ "complete": 1 }');
		});
}

/**
 * It executes a command on the server and returns the result.
 * @param command - the URL to the command.
 */

function executeCommandNoExit(command) {
	let url = 'http://' + ip + command;
	rest_get(url)
		.then((res) => {
			console.log(new Buffer.from(res).toString());
		})
		.catch((error) => {
			console.log('error response:', error);

			console.log(`{ "complete": 1, "code": 999, "description": "Failed to execute: ${error}" }`);
		});
}

/**
 * It sends a GET request to the server.
 * @param url - The URL to send the request to.
 * @returns The response from the server.
 */

function rest_get(url) {
	console.log('sending request to: ' + url);

	let authKey = getAuthKey(username, password);

	let client = new Client();

	let args = {
		headers: {
			Host: ip,
			'Keep-Alive': '300',
			Connection: 'keep-alive',
			'User-Agent': 'APP',
			Authorization: `Basic ${authKey}`,
		},
	};

	return new Promise((resolve, reject) => {
		client
			.get(url, args, function (data) {
				resolve(data);
			})
			.on('error', function (error) {
				reject(error);
			});
	});
}

/**
 * Given a username and password, return a base64 encoded string of the username and password
 * @param username - The username of the user you want to authenticate.
 * @param password - The password for the user.
 * @returns The authKey is being returned.
 */

function getAuthKey(username, password) {
	let authString = username + ':' + password;
	let auth64 = Buffer.from(authString).toString('base64');
	return auth64;
}
