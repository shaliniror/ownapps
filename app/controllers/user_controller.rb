class UserController < ApplicationController
	
	def index
		@users = Users.all
	end

	def create
		@user = Users.new(user_params)
 		@user.save
  		redirect_to action: 'index'
	end

	def destroy
		@user = Users.find(params[:id])
		@user.delete
		redirect_to action: 'index'
	end


private
  def user_params
    params.require(:user).permit(:name)
  end

end
