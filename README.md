# SnapAV WattBox
## About
This is a Cronicle Plugin that allows you to control the WattBox family of products by SnapAV

## Installation
1. CD to your Cronicle plugin directory in a terminal
2. Run `npm install cronicle-plugin-snapav-wattbox` to install the plugin and it's required libraries.
3. Setup the plugin in Cronicle.
   * Plugin directory will be `<Your Plugin Folder>/node_modules/cronicle-plugin-snapav-wattbox/index.js`
   * The plugin requires the following parameters:
      * `ip`: Text Field: IP Address of OBS computer.
      * `command`: Menu: Selects from the available commands Items:
        * `Power Off, Power On, Custom Power Reset, Power Reset, Auto Reboot On, Auto Reboot Off`
      * `extraData`: Test Field: The time it takes for the custom power reset function to happen
      * `outlet`: Text Field: The outlet number you want to control.
      * `username`: Text Field: The username for the WattBox.
      * `password`: Text Field: The password for the WattBox.


## Feature requests
If you would like to see a feature added to this plugin, please open an issue with your request.
