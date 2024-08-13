import userTable from './user.model'
import clientTable from './client.model'

import userRoleEnum from './enum/user-role.enum'

export { clientTable, userTable, userRoleEnum }

export const tables = [clientTable, userTable]
