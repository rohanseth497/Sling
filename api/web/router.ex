defmodule Sling.Router do
  use Sling.Web, :router

  pipeline :api do
    plug :accepts, ["json"]
    plug Guardian.Plug.VerifyHeader, realm: "Bearer"
    plug Guardian.Plug.LoadResource
  end

  scope "/api", Sling do
    pipe_through :api

    post "/sessions", SessionController, :create
  end
end
