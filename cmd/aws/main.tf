
provider "aws" {
    region = "ap-southeast-2"
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
    Name="Main instance test"
  }
}



resource "aws_volume_attachment" "volume-att-main_instance"{
    device_name = "/dev/sdc"
    volume_id = aws_ebs_volume.main_instance_ebs.id
    instance_id = aws_instance.main_instance.id
}


resource "aws_ebs_volume" "main_instance_ebs" {
    availability_zone = "ap-southeast-2"
    size = 8
    
    
    
    
    
    
    
    
}
               


resource "aws_vpc" "main_vpc" {
cidr_block       = "10.0.0.0/16"






tags = {Name="The Main vpc"}
}



resource  "aws_internet_gateway" "main_int" {
    vpc_id = aws_vpc.main_vpc.id
    
}


resource "aws_subnet" "main_subnet" {
    vpc_id = aws_vpc.main_vpc.id
    cidr_block = "10.1.1.0/24"
    
    
    
    
    
    
}

resource "aws_route_table" "main_route" {
    vpc_id = aws_vpc.main_vpc.id
    route {
        cidr_block = "0.0.0.0/0"
        gateway_id = aws_internet_gateway.main_int.id
    }
}

resource "aws_route_table_association" "association_main_route" {
    subnet_id = aws_subnet.main_subnet.id
    route_table_id = aws_route_table.main_route.id
}

