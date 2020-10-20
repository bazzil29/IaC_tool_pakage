provider "google" {
    project     = "operating-rush-280308"
    region      = "us-west1"
}
resource "google_compute_instance" "test-name" {
    name = "test-name"
    machine_type = "f1-micro"
    zone         = "us-west1-a"
      
    boot_disk {
          initialize_params {
          image = "debian-cloud/debian-9"
        }
    }
    network_interface {
        network = google_compute_network.vpc.name
        subnetwork = google_compute_subnetwork.public-subnet-1.name
    }
    
    
    
    
    
    
    
    
    
    metadata = {
        ssh-keys = "mingphuong:${file("./gpc.pub")}"
    }
    metadata_startup_script = "sudo apt-get update; sudo apt-get install -yq build-essential python-pip rsync; pip install flask"
    
    
    
    
    
    
    
    
    
    }

resource "google_compute_firewall" "allow-rdp" {
    name = "allow-rdp"
    network = "default_vpc"
    
    
    
    
    
    
    
    
    
    
    
    
    
    allow {
        protocol = "http"
        ports    = ["3389"]
      }
    
  }

resource "google_compute_firewall" "allow-ssh" {
    name = "allow-ssh"
    network = "default_vpc"
    
    
    
    
    
    
    
    
    
    
    
    
    
    allow {
        protocol = "tcp"
        ports    = ["22"]
      }
    
  }

resource "google_compute_firewall" "allow-https" {
    name = "allow-https"
    network = "default_vpc"
    
    
    
    
    
    
    
    
    
    
    
    
    
    allow {
        protocol = "tcp"
        ports    = ["80"]
      }
    
  }
resource "google_compute_subnetwork" "public-subnet-1" {
    name = "public-subnet-1"
    ip_cidr_range = "10.10.1.0/24"
    network = google_compute_network.vpc.name
    region = "us-west1"
    
    
    
    
    
}
resource "google_compute_network" "vpc" {
    name = "vpc"
    auto_create_subnetworks = "false"
    
    routing_mode = "GLOBAL"
    
    
}