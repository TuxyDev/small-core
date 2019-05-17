
const {EventEmitter} = require("events");

class Plugin extends EventEmitter {

    /**
     * A plugin for the small-core discord.js hook.
     * @param {String} name the name of the plugin.
     * @param {String} version the version of the plugin.
     * @param {String} description the description of the plugin
     * @param {Array<String>} authors the authors of the plugin.
     */
    constructor(name, version, description, ...authors) {
        super();
        this.name = name;
        this.version = version;
        this.authors = authors;
        this.description = description;
        this.color = 0xf45942;
        this.enabled = false;
    }

    color(color) {
        this.color = color;
    }

    /**
     * Close a plugin.
     * @param {Plugin} plugin the plugin to close.
     */
    close(plugin = this) {
        plugin.emit("close");
    }

}

module.exports = Plugin;