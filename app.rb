require 'pry'
require 'sinatra'
require 'sinatra/reloader'
require 'httparty'

get '/' do
  erb :index
end

get '/comicchar' do
  url = params[:url]
  response = HTTParty.get(url)
  response['results'].to_json

end

get '/charData' do
  url = params[:url]
  response = HTTParty.get(url)
  response['results'].to_json

end
