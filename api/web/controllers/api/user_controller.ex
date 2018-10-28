defmodule Sling.UserController do
  use Sling.Web, :controller

  alias Sling.GuardianSerializer
  alias Sling.User

  def create(conn, params) do

    changeset  = User.registration_changeset(%User{}, params)

    case Repo.insert(changeset) do
      {:ok, user} ->
        new_conn = GuardianSerializer.Plug.sign_in(conn, user)
        jwt = GuardianSerializer.Plug.current_token(new_conn)

        IO.puts "++++"
        IO.inspect(new_conn)


        new_conn
        |> put_status(:created)
        |> render(Sling.SessionView, "show.json", user: user, jwt: jwt)
      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> render(Sling.ChangesetView, "error.json", changeset: changeset)
    end
  end

end
