defmodule Sling.AuthErrorHandler do
  import Plug.Conn

  def auth_error(conn, {type, _reason}, _opts) do

    body = to_string(type)
    conn
    |> put_resp_content_type("text/plain")
    |> send_resp(401, body)
    # body = Poison.encode!(%{message: to_string(type)})
    # send_resp(conn, 401, body)
  end
end
