variable "region" {
  description = "The AWS region to deploy resources in"
  type        = string
  default     = "ap-southeast-1"
}

variable "public_key" {
  description = "The public SSH key for EC2 instance access"
  type        = string
}

variable "private_key" {
  description = "The private SSH key for EC2 instance access"
  type        = string
  sensitive   = true
}

variable "key_name" {
  description = "The name of the key pair to use for the EC2 instance"
  type        = string
}