# IAC TOOL

## install
	npm install -g iac_tool_package
## usage

 1.  tf-gen
		 tf-gen [options]

			Options:
				-t,--type aws,gcp,multi,swap
				-c,--cloud aws or gcp flatform's
				code base to convert if use swap type (default: "aws")
				-f,--file path file to read
				-o,--output Name file and path to
				store code, default is "resources.tf" (default: "resources.tf")
				-h, --help display help for command

2. tf-reverse [options]

			Options: 
				-build,--build Build Terraformer Bin
				-h, --help display help for command
			
	Must go to terraformer directory and run tf-reverse build command!		