provider "google" {
    project     = "undefined"
    region      = "us-east4"
}

resource "google_compute_network" "default-network" {
    name = "default-network"
    
    
    
    
    
}


resource "google_compute_disk" "disk-1" {
    name  = "disk-1"

    type = "pd-balanced"
    
    
    
    zone = "usa"
    
    
    
    
    

}

resource "google_compute_subnetwork" "subnet-1" {
    name = "subnet-1"
    ip_cidr_range = "10.1.0.0/16"
    network = google_compute_network.default-network.name
    
    
    
    
    
    
}


resource "google_compute_firewall" "allow-deault-firewall" {
  name = "deault-firewall"
  network = "default-network"
  
  
  
  
  
  
  
  
  
  
  
  
  
  allow {
      protocol="https"
      ports=["80","8080"]
    }
allow {
      protocol="tcp"
      ports=["89","3309"]
    }

}


resource "google_compute_firewall" "deny-deault-firewall" {
  name = "deault-firewall"
  network = "default-network"
  
  
  
  
  
  
  
  
  
  
  
  
  
  allow {
      protocol="https"
      ports=["81","8081"]
    }
allow {
      protocol="tcp"
      ports=["81","3301"]
    }

}


resource "google_compute_instance" "main_instance" {
    name = "main_instance"
    machine_type = "e2-micro"
    zone         = "us-west1-a"

    boot_disk {
            initialize_params {
            image = "ubuntu"
        }
    }
    network_interface {
        network = google_compute_network.default-network.name
        subnetwork = google_compute_subnetwork.subnet-1.name
    }

    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
}

resource "google_compute_attached_disk" "disk_att_main_instance" {
    disk     = google_compute_disk.disk-1.id
    instance = google_compute_instance.main_instance.id
}

