
provider "aws" {
    region = "us-east-1"
}


resource "aws_vpc" "default-network" {
cidr_block       = "10.0.0.0/16"







}

resource "aws_ebs_volume" "disk-1" {
    availability_zone = "usa"
    size = 16
    type = "gp2"
    
    
    
    
    
    
    
    
}
               
resource "aws_subnet" "subnet-1" {
    vpc_id = aws_vpc.default-network.id
    cidr_block = "10.1.0.0/16"
    
    
    
    
    
    
}
resource "aws_network_acl" "deault-firewall" {
    vpc_id = aws_vpc.default-network.id
    
egress {
    protocol = "https"
    rule_no = 100
    action = "allow"
    
    from_port = 80 
    to_port =  80
}

ingress {
    protocol = "https"
    rule_no = 100
    action = "allow"
    
    from_port = 80 
    to_port =  80
}
        
egress {
    protocol = "https"
    rule_no = 100
    action = "allow"
    
    from_port = 8080 
    to_port =  8080
}

ingress {
    protocol = "https"
    rule_no = 100
    action = "allow"
    
    from_port = 8080 
    to_port =  8080
}
        
egress {
    protocol = "tcp"
    rule_no = 100
    action = "allow"
    
    from_port = 89 
    to_port =  89
}

ingress {
    protocol = "tcp"
    rule_no = 100
    action = "allow"
    
    from_port = 89 
    to_port =  89
}
        
egress {
    protocol = "tcp"
    rule_no = 100
    action = "allow"
    
    from_port = 3309 
    to_port =  3309
}

ingress {
    protocol = "tcp"
    rule_no = 100
    action = "allow"
    
    from_port = 3309 
    to_port =  3309
}
        
egress {
    protocol = "https"
    rule_no = 100
    action = "deny"
    
    from_port = 81 
    to_port =  81
}

ingress {
    protocol = "https"
    rule_no = 100
    action = "deny"
    
    from_port = 81 
    to_port =  81
}
        
egress {
    protocol = "https"
    rule_no = 100
    action = "deny"
    
    from_port = 8081 
    to_port =  8081
}

ingress {
    protocol = "https"
    rule_no = 100
    action = "deny"
    
    from_port = 8081 
    to_port =  8081
}
        
egress {
    protocol = "tcp"
    rule_no = 100
    action = "deny"
    
    from_port = 81 
    to_port =  81
}

ingress {
    protocol = "tcp"
    rule_no = 100
    action = "deny"
    
    from_port = 81 
    to_port =  81
}
        
egress {
    protocol = "tcp"
    rule_no = 100
    action = "deny"
    
    from_port = 3301 
    to_port =  3301
}

ingress {
    protocol = "tcp"
    rule_no = 100
    action = "deny"
    
    from_port = 3301 
    to_port =  3301
}
        
}

data "aws_ami" "ami-main_instance" { 
  most_recent = true
  owners = ["679593333241"]
  filter {
    name   = "name"
    values = ["ubuntu*"]
  }
}
resource "aws_instance" "main_instance" {
    ami           = data.aws_ami.ami-main_instance.id
    instance_type = "t2.micro"
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    tags = {
    Name="Default Instance"
  }
}

resource "aws_network_interface" "interface_main_instance" {
    subnet_id       = aws_subnet.subnet-1.id
    attachment {
      instance     = aws_instance.main_instance.id
      device_index = 1
    }
  }




resource "aws_volume_attachment" "volume-att-main_instance" {
    device_name = "/dev/sdc"
    volume_id = aws_ebs_volume.disk-1.id
    instance_id = aws_instance.main_instance.id
}

