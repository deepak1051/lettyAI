import mongoose from 'mongoose'

const termSchema = new mongoose.Schema({
  term: {
    type: String
  }
})

const Term = mongoose.model('term', termSchema)
export default Term