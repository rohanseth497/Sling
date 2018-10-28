defmodule Sling.UserController do
  use Sling.Web, :controller

  alias Sling.User

  def create(conn, params) do
    changeset  = User.registration_changeset(%User{}, params)

    case Repo.insert(changeset) do
      {:ok, user} ->
        new_conn = Guardian.Plug.api_sign_in(conn, user, :access)
        jwt = Guardian.Plug.current_token(new_conn)

        new_conn
        |> put_status(:created)
        |> render(Sling.SessionView, "show.json", user: user, jwt: jwt)
      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> render(Sling.ChangesetView, "error.json", changeset: changeset)
    end
  end

  def delete(conn, _params) do
    jwt = Guardian.Plug.current_token(conn)
    Guardian.revoke!(jwt)

    conn
    |> put_status(:ok)
    |> render("delete.json")
  end

  def refresh(conn, _params) do
    user = Guardian.Plug.current_resource(conn)
    jwt = Guardian.Plug.current_token(conn)
    {:ok, claims} = Guardian.PLug.claims(conn)

    case Guardian.refresh!(jwt, claims, %{ttl: {30, :days}}) do
      {:ok, new_jwt, _new_claims} ->
        conn
        |> put_status(:ok)
        |> render("show.json", user: user, jwt: new_jwt)
      {:error, _reason} ->
        conn
        |> put_status(:unauthorized)
        |> render("forbidden.json", error: "Not authenticated")
    end
  end
end
