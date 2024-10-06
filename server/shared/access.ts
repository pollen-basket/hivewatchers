import { Entity, Fields } from 'remult'

@Entity('access', {
  allowApiCrud: true
})
export class Access {
  @Fields.uuid()
  id = ''

  @Fields.string()
  ip_address = ''

  @Fields.createdAt()
  created_at = ''

  @Fields.updatedAt()
  updated_at = ''
}
