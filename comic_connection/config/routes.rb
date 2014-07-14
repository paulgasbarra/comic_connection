Rails.application.routes.draw do

  root 'character#index'
  resources :character
  get '/data_request', to: 'character#data_request'
  get '/record_check/(:api)' to: 'character#records_check'

end
