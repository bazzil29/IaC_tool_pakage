const osFilter = (os)=>{
  if(os=="ubuntu"){
    return "ubuntu/images/hvm-ssd/ubuntu-focal-20.04-amd64-server"
  }
  if(os=="centos"){
    return "CentOS Linux 7 x86_64 HVM EBS *"
  }
  if(os="debian"){
    return "Debian GNU/Linux 9"
  }

}

const generator = (config)=>{
    return (
`
data "aws_ami" "ami-${config.name}" { 
  most_recent = true
  owners = ["${config.ami=="ubuntu"?"099720109477":"679593333241"}"]
  filter {
    name   = "name"
    values = ["${(!!config.ami)?osFilter(config.ami):"ubuntu/images/hvm-ssd/ubuntu-focal-20.04-amd64-server"}*"]
  }
}
resource "aws_instance" "${(!!config.name)?config.name:"Default_name"}" {
    ami           = data.aws_ami.ami-${config.name}.id
    instance_type = "${(!!config.instance_type)?config.instance_type:"t2.micro"}"
    ${!!config.availability_zone?`availability_zone = "${config.availability_zone}"`:``}
    ${!!config.placement_group?`placement_group = "${config.placement_group}"`:``}
    ${!!config.tenancy?`tenancy = "${config.tenancy}"`:``}
    ${!!config.host_id?`host_id = "${config.host_id}"`:``}
    ${!!config.cpu_core_count?`cpu_core_count = "${config.cpu_core_count}"`:``}
    ${!!config.cpu_threads_per_core?`cpu_threads_per_core = "${config.cpu_threads_per_core}"`:``}
    ${!!config.disable_api_termination?`disable_api_termination = "${config.disable_api_termination}"`:``}
    ${!!config.instance_initiated_shutdown_behavior?`instance_initiated_shutdown_behavior = "${config.instance_initiated_shutdown_behavior}"`:``}
    ${!!config.key_name?`key_name = "${config.key_name}"`:``}
    ${!!config.get_password_data?`get_password_data = "${config.get_password_data}"`:``}
    ${!!config.monitoring?`monitoring = "${config.monitoring}"`:``}
    ${!!config.security_group?`vpc_security_group_ids = [aws_security_group.${config.security_group}.id]`:``}
    ${!!config.aws_subnet?`subnet_id = aws_subnet.${config.aws_subnet}.id`:``}
    ${!!config.associate_public_ip_address?`associate_public_ip_address = "${config.associate_public_ip_address}"`:``}
    ${!!config.private_ip?`private_ip = "${config.private_ip}"`:``}
    ${!!config.secondary_private_ips?`secondary_private_ips = "${config.secondary_private_ips}"`:``}
    ${!!config.source_dest_check?`source_dest_check = "${config.source_dest_check}"`:``}
    ${!!config.user_data?`user_data = "${config.user_data}"`:``}
    ${!!config.user_data_base64?`user_data_base64 = "${config.user_data_base64}"`:``}
    ${!!config.iam_instance_profile?`iam_instance_profile = "${config.iam_instance_profile}"`:``}
    ${!!config.ipv6_address_count?`ipv6_address_count = "${config.ipv6_address_count}"`:``}
    ${!!config.ipv6_addresses?`ipv6_addresses = "${config.ipv6_addresses}"`:``}
    ${!!config.volume_tags?`volume_tags = "${config.volume_tags}"`:``}
    ${!!config.root_block_device?`root_block_device = "${config.root_block_device}"`:``}
    ${!!config.ephemeral_block_device?`ephemeral_block_device = "${config.ephemeral_block_device}"`:``}
    user_data = <<-EOF
    #! /bin/bash
    ${!!config.startup_script?config.startup_script:"echo Helloworld!"}
    EOF
    tags = {
    ${(!!config.tags)?config.tags:`Name="Default Instance"`}
    }
}


${(!!config.aws_ebs_volume)?`
resource "aws_volume_attachment" "volume-att-${config.name}" {
    device_name = "/dev/sdd"
    volume_id = aws_ebs_volume.${config.aws_ebs_volume}.id
    instance_id = aws_instance.${config.name}.id
}\n
`:""}`)
}
module.exports = {
    generator
}