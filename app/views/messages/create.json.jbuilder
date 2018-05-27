json.content  @message.content
json.image  @message.image
json.user_name  @message.user.name
json.date  format_posted_time(@message.created_at)
json.id  @message.id
