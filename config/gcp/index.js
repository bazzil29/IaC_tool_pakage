const google_compute_instance = require("./google_compute_instance");
const google_compute_firewall = require("./google_compute_firewall");
const google_compute_network = require("./google_compute_network");
const google_compute_subnetwork = require("./google_compute_subnetwork");
const google_compute_disk = require("./google_compute_disk");
const provider = require("./provider");

module.exports = {
                    google_compute_instance,google_compute_network,
                    google_compute_firewall,google_compute_subnetwork,provider,
                    google_compute_disk
                }