defmodule Sling.Router do
  use Sling.Web, :router

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/api", Sling do
    pipe_through :api
  end
end
