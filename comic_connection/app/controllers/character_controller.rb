class CharacterController < ApplicationController

  def index
  end

  def new
  end

  def data_request
     url = params[:url]
     response = HTTParty.get(url)
     render :json => response['results'].to_json
  end

  def record_check
    if Character.exists?(:api_detail_url => params[:api_detail_url])
      character = Character.find_by(:api_detail_url => params[:api_detail_url])
      render :json => {character: character}
    else
      render  :json => {character: false}
    end
   end

def create
  Character.create(character_params)
  # foo = params[:character]
  # Character.create(
  #   count_of_issue_appearances: foo[:count_of_issue_appearances],
  #   character_id: foo[:character_id],
  #   image: foo[:image],
  #   deck: foo[:deck],
  #   character_enemies: foo[:character_enemies].values,
  #   character_friends: foo[:character_friends].values,
  #   powers: foo[:powers].values,
  #   teams: foo[:teams].values
  #   )
  render :json => {success: 1}
end

private

  def character_params
    params.require(:character).permit!
  end


end
