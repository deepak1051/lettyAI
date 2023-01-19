import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import Term from './model/termModel.js'

const app = express()

mongoose.set('strictQuery', true);
mongoose.connect('mongodb://localhost:27017/lettyDB')
  .then(() => console.log('connected to mongoose '))
  .catch(err => console.log(err))


app.use(express.json())
app.use(cors())
app.get('/', async (req, res) => {
  try {
    const user = await Term.find()
    if (!user) return res.status(400).json({ message: 'No Term Exists...' })
    res.status(200).json(user)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})
app.get('/:id', async (req, res) => {
  const id = req.params.id
  try {
    const user = await Term.findById(id)
    if (!user) return res.status(400).json({ message: 'No Term Exists...' })
    res.status(200).json(user)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})
app.post('/', async (req, res) => {
  try {
    const { term } = req.body
    if (!term || term.trim().length === 0) return res.status(400).json({ message: "Please fill the form" })

    const newTerm = new Term({
      term
    })
    newTerm.save()
      .then((user) => res.status(201).json(user))
      .catch(err => res.status(401).json({ message: err.message }))

  } catch (error) {
    res.status(401).json({ message: err.message })
  }
})

app.listen(5000, () => {
  console.log('server up and running on port 5000')
})