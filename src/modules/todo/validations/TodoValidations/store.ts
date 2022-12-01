import { partialStore } from '@/libs/joi'

import general from './general'

export default partialStore(general, ['done'])
