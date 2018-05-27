json.array! @new_messages do |new_message|
  json.content  new_message.content
  json.image  new_message.image
  json.user_name  new_message.user.name
  json.date  format_posted_time(new_message.created_at)
  json.id  new_message.id
end
