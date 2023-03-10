variable "domain_name" {
  type        = string
  description = "The domain name for the website."
}

variable "bucket_name" {
  type        = string
  description = "The name of the bucket without the www. prefix. Normally domain_name."
}

variable "root_domain_zone" {
  type        = string
  description = "The root hosted zone for the main hapihour site."
}

variable "common_tags" {
  description = "Common tags you want applied to all components."
}