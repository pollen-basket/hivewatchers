import { Entity, Fields } from 'remult'

@Entity('verifications', { allowApiCrud: true })
export class Verification {
  @Fields.uuid()
  id = ''

  @Fields.string()
  username = ''

  @Fields.string()
  steemit_post = ''

  @Fields.string()
  media_link = ''

  @Fields.string()
  additional_information = ''

  @Fields.string()
  status = ''

  @Fields.createdAt()
  created_at = ''

  @Fields.updatedAt()
  updated_at = ''
}
