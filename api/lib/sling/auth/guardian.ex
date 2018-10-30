defmodule Sling.Auth.Guardian do
  use Guardian, otp_app: :sling

  alias Sling.Repo
  alias Sling.User

  def subject_for_token(resource, _claims) do
    {:ok, to_string(resource.id)}
  end

  # def subject_for_token(_, _) do
  #   {:error, :reason_for_error}
  # end

  def resource_from_claims(claims) do
    id = claims["sub"]
    user = Repo.get(User, String.to_integer(id))
    {:ok, user}
    # {:ok, %{id: claims["sub"]}}
    # {:ok, resource}
  end
end
