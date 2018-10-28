defmodule Sling.Router do
  use Sling.Web, :router

  pipeline :auth do
    plug Sling.Pipeline
  end

  pipeline :api do
    plug :accepts, ["json"]
    plug Sling.Pipeline
    plug Guardian.Plug.VerifyHeader, realm: "Bearer"
    plug Guardian.Plug.LoadResource, allow_blank: true
  end

  scope "/api", Sling do
    pipe_through [:api]

    post "/sessions", SessionController, :create
    delete "/sessions", SessionController, :delete
    post "/sessions/refresh", SessionController, :refresh
    post "/users", UserController, :create
  end
end
