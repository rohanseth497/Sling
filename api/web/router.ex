defmodule Sling.Router do
  use Sling.Web, :router

  # alias Sling.Auth.Guardian
  pipeline :api do
    plug :accepts, ["json"]

    plug Guardian.Plug.VerifyHeader, realm: "Bearer"
    plug Guardian.Plug.LoadResource, allow_blank: true
    plug Sling.Auth.Pipeline
  end

  pipeline :guest_pipeline do
    plug Guardian.Plug.LoadResource, allow_blank: true
    plug Sling.Auth.Pipeline
  end

  pipeline :login_required do
    plug Guardian.Plug.EnsureAuthenticated
  end

  scope "/api", Sling do
    pipe_through [:guest_pipeline]
    post "/users", UserController, :create
    post "/sessions", SessionController, :create
  end

  scope "/api" do
    pipe_through [:api, :login_required]
    delete "/sessions", SessionController, :delete
    post "/sessions/refresh", SessionController, :refresh
  end
end
