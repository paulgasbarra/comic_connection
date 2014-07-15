Rails.application.routes.draw do

  root 'character#index'
  resources :character
  get '/data_request', to: 'character#data_request'
  get '/data_pull', to: 'character#data_pull'
  get '/record_check/(:api)', to: 'character#record_check'


end
