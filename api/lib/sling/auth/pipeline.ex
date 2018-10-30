defmodule Sling.Auth.Pipeline do
  use Guardian.Plug.Pipeline,
    otp_app: :sling,
    module: Sling.Auth.Guardian,
    error_handler: Sling.Auth.ErrorHandler


    plug Guardian.Plug.VerifyHeader, realm: "Bearer"
    plug Guardian.Plug.LoadResource, allow_blank: true

  # plug Guardian.Plug.VerifySession, claims: %{"typ" => "access"}
  # If there is an authorization header, restrict it to an access token and validate it
  # plug Guardian.Plug.VerifyHeader, claims: %{"typ" => "access"}, realm: "Bearer"
  # Load the user if either of the verifications worked
  # plug Guardian.Plug.LoadResource, allow_blank: true
end
