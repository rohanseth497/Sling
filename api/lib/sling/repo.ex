defmodule Sling.Repo do
  use Ecto.Repo, otp_app: :sling, adapter: Ecto.Adapters.Postgres
  use Scrivener, page_size: 25
end
