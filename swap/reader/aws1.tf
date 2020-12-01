#terraform test

provider "aws" {
    region = "ap-southeast-2"
}

resource "aws_vpc" "main" {
    cidr_block = "10.1.0.0/16"
    tags = {
        Name  = "This is test vpc"
    }
}

resource  "aws_internet_gateway" "main" {
    vpc_id =  aws_vpc.main.id
}

resource "aws_subnet" "main" {
    vpc_id = aws_vpc.main.id
    cidr_block = "10.1.1.0/24"
    availability_zone = "ap-southeast-2a"
}

resource "aws_route_table" "default" {
    vpc_id = aws_vpc.main.id
    route {
        cidr_block = "0.0.0.0/0"
        gateway_id = aws_internet_gateway.main.id
    }
}

resource "aws_route_table_association" "main" {
    subnet_id = aws_subnet.main.id
    route_table_id = aws_route_table.default.id
}

resource "aws_network_acl" "allowall" {
    vpc_id = aws_vpc.main.id

    egress {
        protocol = "-1"
        rule_no = 100
        action = "allow"
        cidr_block = "0.0.0.0/0"
        from_port = 0 
        to_port =  0
    }

    ingress {
        protocol = "-1"
        rule_no  = 200
        action = "allow"
        cidr_block = "0.0.0.0/0"
        from_port = 0
        to_port = 0

    }

    tags = {
        Name = "tf-acl-aws"
    }
}

resource "aws_security_group" "allowall" {
    name = "SG allow all"
    description  = "Allow all traffic - naughty"
    vpc_id = aws_vpc.main.id
    
    ingress {
        from_port = 22
        to_port = 22
        protocol = "tcp"
        cidr_blocks  = ["0.0.0.0/0"]
    }

    egress {
        from_port = 0 
        to_port = 0 
        protocol = "-1"
        cidr_blocks = ["0.0.0.0/0"]
    }
}

resource "aws_eip"  "webserver" {
    instance =  aws_instance.webserver.id
    vpc = true
    depends_on =  ["aws_internet_gateway.main"]
}

resource "aws_key_pair" "default" {
    key_name = "tf_example_key"
    public_key  = "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQDQJ5DryjNVF2KrVxL2CTdMyVeX5/pbuXH63lZgzIQY0kJugl2Oy2rt+yjOI/iM/X4NUawA4645mXbb7W4j2p1/r0d3BoJVlO+6FYG5Y4iFT1bqzrClZ9jhExl44LlPv9iblSIpKAHboQTBeXIz0mOM+cyrHwhP5cNH0lPp0dw45X5IhF4LUfGYV7bkYBKqoLqtFlXMnuRfMO94TliC2iKBcPJ5wMnKPbQjZxOPhEUsKr7Bq0KQsi0LYpgmk83XzK118z37n3gzqeupLkFUyqaylIVrrIEoVkU1wJtLEvGonoHAty5gYZM5gexKM7I3ZM2xv0wIFhIRhHDqlgZ4+fm/ mingphuong@Ngos-MacBook-Pro.local"
}


data "aws_ami" "ubuntu" {
    most_recent = true
    filter {
        name = "name"
        values = ["amzn2-ami-hvm-2.0.20200722.0-x86_64-gp2"]
    }
    owners = ["amazon"]
}


resource "aws_instance" "webserver" {
    ami = data.aws_ami.ubuntu.id
    availability_zone = "ap-southeast-2a"
    instance_type =  "t2.micro"
    key_name = aws_key_pair.default.key_name
    vpc_security_group_ids = [aws_security_group.allowall.id]
    subnet_id = aws_subnet.main.id
}