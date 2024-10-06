import { Entity, Fields } from 'remult';

@Entity('reports', {
  allowApiCrud: true
})
export class Report {
  @Fields.uuid()
  id = '';

  @Fields.string()
  post_url = '';

  @Fields.string()
  author_username = '';

  @Fields.string()
  abuse_type = '';

  @Fields.string()
  reported_by_username = '';

  @Fields.string()
  supporting_link = '';

  @Fields.string()
  investigated_by_id = '';

  @Fields.string()
  status = '';

  @Fields.boolean()
  add_to_black_list = false;

  @Fields.string()
  reason_why_added_to_black_list = '';

  @Fields.string()
  details = '';

  @Fields.boolean()
  downvote = false;

  @Fields.string()
  rejected_because = '';

  @Fields.date()
  last_edited_at = '';

  @Fields.string()
  steem_comment_id = '';

  @Fields.createdAt()
  created_at = '';

  @Fields.updatedAt()
  updated_at = '';
}
