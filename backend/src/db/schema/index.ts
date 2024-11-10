import userTable from './user.model'
import personalInfoTable from './personalInfo.model'
import checkinTable from './checkin.model'
import loginTable from './login.model'
import subscriptionTable from './subscription.model'
import classTable from './class.model'
import classInfoTable from './classInfo.model'
import exerciseTable from './exercise.model'
import exerciseInfoTable from './exerciseInfo.model'
import classExerciseTable from './classExercise.model'
import exerciseCategoryTable from './exerciseCategory.model'
import contentTable from './content.model'

import userRoleEnum from './enum/userRole.enum'
import fileFormatEnum from './enum/fileFormat.enum'

export {
  userTable,
  userRoleEnum,
  fileFormatEnum,
  personalInfoTable,
  checkinTable,
  loginTable,
  subscriptionTable,
  classTable,
  classInfoTable,
  exerciseTable,
  exerciseInfoTable,
  classExerciseTable,
  exerciseCategoryTable,
  contentTable,
}

export const tables = [
  userTable,
  personalInfoTable,
  checkinTable,
  loginTable,
  subscriptionTable,
  classTable,
  classInfoTable,
  exerciseTable,
  exerciseInfoTable,
  classExerciseTable,
  exerciseCategoryTable,
  contentTable,
]
