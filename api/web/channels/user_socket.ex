defmodule Sling.UserSocket do
  use Phoenix.Socket

  alias Sling.Auth.Guardian
  channel "rooms:*", Sling.RoomChannel

  transport :websocket, Phoenix.Transports.WebSocket, timeout: 45_000

  def connect(%{"token" => token}, socket) do
    case Guardian.decode_and_verify(token) do
      {:ok, claims} ->
        case Guardian.resource_from_claims(claims) do
          {:ok, user} ->
            {:ok, assign(socket, :current_user, user)}
          {:error, _reason} ->
            :error
        end
      {:error, _reason} ->
        :error
    end
  end

  def connect(_params, socket) do
    {:ok, socket}
  end


  def id(socket), do: "users_socket:#{socket.assigns.current_user.id}"
end
