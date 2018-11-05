
defmodule Sling.RoomChannel do
  use Sling.Web, :channel

  alias Sling.Message

  def join("rooms:" <> room_id, _params, socket) do
    room = Repo.get!(Sling.Room, room_id)

    page =
      Message
      |> where([m], m.room_id == ^room.id)
      |> order_by([desc: :inserted_at, desc: :id])
      |> preload(:user)
      |> Sling.Repo.paginate()

    response = %{
      room: Phoenix.View.render_one(room, Sling.RoomView, "room.json"),
      messages: Phoenix.View.render_many(page.entries, Sling.MessageView, "message.json"),
      pagination: Sling.PaginationHelpers.pagination(page)
    }

    {:ok, response, assign(socket, :room, room)}
  end

  def handle_in("new_message", params, socket) do
    changeset =
      socket.assigns.room
      |> build_assoc(:messages, user_id: socket.assigns.current_user.id)
      |> Message.changeset(params)
  end

  def terminate(_reason, socket) do
    {:ok, socket}
  end
end
