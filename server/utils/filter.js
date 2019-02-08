exports.issueFilter = ({
  id,
  iid,
  title,
  description,
  state,
  labels,
  assignee,
  web_url: webUrl,
  time_stats: { time_estimate: estimatedTime },
  milestone
}) => ({
  id,
  iid,
  title,
  description,
  state,
  labels,
  assigneeId: assignee ? assignee.id : null,
  webUrl,
  estimatedTime,
  milestone
});

exports.mrFilter = ({
  id,
  iid,
  title,
  description,
  state,
  labels,
  author,
  merge_status: mergeStatus,
  web_url: webUrl
}) => ({
  id,
  iid,
  title,
  description,
  state,
  labels,
  authorId: author.id,
  mergeStatus,
  webUrl
});

exports.commentFilter = ({
  id,
  body,
  author,
  noteable_id: noteableId,
  updated_at: updatedAt
}) => {
  if (!body.trim().startsWith("[TIME]")) {
    return;
  }

  return {
    id,
    body,
    authorId: author.id,
    noteableId,
    updatedAt
  };
};

exports.memberFilter = ({ id, username, name, avatar_url: avatarUrl }) => ({
  id,
  username,
  name,
  avatarUrl
});
