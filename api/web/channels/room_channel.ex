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
      IO.puts "++++"
    response = %{
      room: Phoenix.View.render_one(room, Sling.RoomView, "room.json"),
      messages: Phoenix.View.render_many(page.entries, Sling.MessageView, "message.json"),
      pagination: Sling.PaginationHelpers.pagination(page)
    }

    send(self, :after_join)
    {:ok, response, assign(socket, :room, room)}
  end

  def handle_in("new_message", params, socket) do
    IO.puts "++++"
    changeset =
      socket.assigns.room
      |> build_assoc(:messages, user_id: socket.assigns.current_user.id)
      |> Message.changeset(params)
      IO.puts "++++"
      IO.inspect(changeset)

    case Repo.insert(changeset) do
      {:ok, message} ->
        broadcast_message(socket, message)
        {:reply, :ok, socket}
      {:error, changeset} ->
        {:reply, {:error, Phoenix.View.render(Sling.ChangesetView, "error.json", changeset: changeset)}, socket}
    end
  end

  def terminate(_reason, socket) do
    {:ok, socket}
  end

  defp broadcast_message(socket, message) do
    message = Repo.preload(message, :user)
    rendered_message = Phoenix.View.render_one(message, Sling.MessageView, "message.json")
    broadcast!(socket, "message_created", rendered_message)
  end

  def handle_info(:after_join, socket) do
    Sling.Presence.track(socket, socket.assigns.current_user.id, %{
      user: Phoenix.View.render_one(socket.assigns.current_user, Sling.UserView, "user.json")
    })
    push(socket, "presence_state", Sling.Presence.list(socket))
    {:noreply, socket}
  end
end
