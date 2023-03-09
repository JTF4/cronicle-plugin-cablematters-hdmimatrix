/*
 * WattBox Cronicle Plugin
 *
 * Copyright (c) 2023 David Stevens
 * Author: David Stevens <opensource@jtf4.com>
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

const net = require('net');

const maxOutput = 4;

var data;

var ip;
var input;
var output;

var socket = new net.Socket();

process.stdin.on('data', (res) => {
	data = JSON.parse(res);
	console.log('Starting Plugin');

	try {

		
		ip = data['params']['ip'];
		input = data['params']['outlet'];
		output = data['params']['command'];

		/*
		ip = '192.168.11.181'
		input = '2'
		output = 'all'
		*/
		console.log('Connecting to device');
		socket.connect({ port: 23, host: ip});

		socket.on('connect', () => {

			console.log('Connected');

			if (output == 'all') {
				console.log('Setting all outputs.')
				let i = 1;
		
				while (i <= maxOutput) {
					loop(i);
					i++;
				}
		
				function loop(i) {
					setTimeout(function () {
						console.log('Setting cross point')
						console.log(`Output: ${i} to Input: ${input}`)
						socket.write(setCrosspoint(i, input));

						if (i == maxOutput) {
							console.log('Disconnecting');
							socket.destroy();
							console.log('Disconnected');
							console.log('{ "complete": 1 }');
							process.exit(0);
						}
					}, 500 * i);
				}
			} else {
				console.log('Setting cross point')
				console.log(`Output: ${output} to Input: ${input}`)
				socket.write(setCrosspoint(output, input));
				console.log('Disconnecting');
				socket.destroy();
				console.log('Disconnected');
				console.log('{ "complete": 1 }');
				process.exit(0);
			}
		})

		socket.on('error', (error) => {
			throw new Error(error);
		})

		
		
	} catch (err) {
		console.log(err);

		console.log(`{ "complete": 1, "code": 999, "description": "Failed to execute: ${err}" }`);
		process.exit(999);
	}
});

/**
 * It takes two arguments, an output and an input, and returns a buffer that can be sent to the device
 * @param output - The output port you want to set.
 * @param input - The input port number (1-4)
 * @returns A buffer object
 */

function setCrosspoint(output, input) {
	// 13 Byte Package
	//'a55b0203input port(1~4)00output port(1~4)0000000000'
	let inputHex = parseInt(input).toString(16).padStart(2, '0');
	let outputHex = parseInt(output).toString(16).padStart(2, '0');
	let cmdRaw = `A55B0203${inputHex}00${outputHex}0000000000`;

	let hexAdded =
		0xa5 + 0x5b + 0x02 + 0x03 + parseInt(input) + 0x00 + parseInt(output) + 0x00 + 0x00 + 0x00 + 0x00 + 0x00;

	let checksumByte = 0x100;

	let checksum = (checksumByte - hexAdded) & 0xff;

	let cmd = cmdRaw + checksum.toString(16);

	let buf = Buffer.from(cmd, 'hex');

	return buf;

}


/**
 * It takes a number, converts it to hex, adds a checksum, and returns a buffer
 * @param input - The input buffer
 * @returns A buffer of the hexadecimal representation of the input.
 */

function getChecksum(input) {
	console.log(1);

	let inputBuf = input;
	let checkBuf = 0x100;

	let checksum = checkBuf - inputBuf;

	console.log(2);

	let cmd = inputBuf.toString(16) + checksum.toString(16);

	console.log(checksum.toString(16));

	console.log(3);

	let hex = Buffer.from(cmd, 'hex');

	console.log(input, inputBuf, checkBuf, checksum.toString(16), cmd, hex);

	return hex;
}
