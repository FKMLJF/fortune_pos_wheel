source "https://rubygems.org"

gem "rails", "~> 7.2.0.beta2"
gem "sprockets-rails"
gem "sqlite3", ">= 1.4"
gem "puma", ">= 5.0"
gem "importmap-rails"
gem "turbo-rails"
gem "stimulus-rails"
gem "jbuilder"
gem 'bootstrap', '~> 5.1.3'
gem 'jquery-rails'
gem 'eth', '~> 0.4.0'

gem "bootsnap", require: false  # Add this line

group :development, :test do
  gem "debug", platforms: %i[ mri windows ], require: "debug/prelude"
  gem "brakeman", require: false
  gem "rubocop-rails-omakase", require: false
end

group :development do
  gem "web-console"
end

group :test do
  gem "capybara"
  gem "selenium-webdriver"
end
