import { partialUpdate } from '@/libs/joi'

import general from './general'

export default partialUpdate(general)
    .or(...Object.keys(general.describe().keys))
    .required()
