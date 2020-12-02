# IaC_tool_pakage
Usage: tf-gen [options]
Options:
  -t,--type <cloud flatform or type to gen>  aws,gcp,multi,swap
  -c,--cloud <cloud flatform>                aws or gcp flatform's code base to convert if use swap type (default: "aws")
  -f,--file <path to file>                   path file to read
  -o,--output <out put file>                 Name file and path to store code, default is "resources.tf" (default: "resources.tf")
  -h, --help                                 display help for command


Usage: tf-reverse [options]

Options:
  -build,--build  Build Terraformer Bin
  -h, --help      display help for command

