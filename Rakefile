sh 'gem install bundler'
sh 'bundle install'

require 'date'
require 'time'
require 'html-proofer'
require 'rake'
require 'json'
require 'front_matter_parser'
require 'open3'
require 'jekyll'
require 'ruby-progressbar'
require 'fileutils'

class String
  def titlecase
    split(/([[:alpha:]]+)/).map(&:capitalize).join
  end
end

desc "Install dependencies"
task :install_dependencies do
    progressbar = ProgressBar.create(
                    :title => "install dependencies",
                    :format => "\e[0;33m%t: |%B|\e[0m",
                    :starting_at => 10)
    50.times { progressbar.increment; sleep 0.1 }
    sh 'npm install'
    progressbar.finish
end

desc "Delete corpus files to regenerate"
task :delete_corpus do
    progressbar = ProgressBar.create(
                    :title => "deleting existing files",
                    :format => "\e[0;34m%t: |%B|\e[0m",
                    :starting_at => 10)
    50.times { progressbar.increment; sleep 0.1 }
    if File.exist?('./_site')
        FileUtils.rm_rf('./_site')
    end
    progressbar.finish
end

desc "Run travis tests"
task :test_travis do
    sh 'bundle exec jekyll build ./_site/jekyll-boilerplate'
    options = {
      :assume_extension => true,
      :disable_external => true,
      :empty_alt_ignore => true,
      :allow_hash_href => true,
      :only_4xx => true,
      :http_status_ignore => [404, 403, 410],
      :alt_ignore => ['/.*/'],
      :file_ignore => [/.*\/node_modules\/.*/, /.*\/_sass\/.*/],
      :internal_domains => ['localhost:4000']
    #   :url_swap =>
  }

  HTMLProofer.check_directory("./_site/jekyll-boilerplate", options).run
  sh 'bundle exec jekyll serve --incremental'
end

task :default => [:install_dependencies, :delete_corpus, :test_travis]