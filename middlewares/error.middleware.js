const unknownEndpoint = (_, res) => {
  res.status(404).json({ success: false, message: 'Unknown endpoint' })
}

const errorHandler = (err, _, res, __) => {
  if (err.name === 'CastError') {
    return res.status(400).json({ success: false, message: 'Malformatted ID' })
  }
  if (err.name === 'ValidationError') {
    return res.status(400).json({ success: false, message: err.message })
  }
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0]
    return res
      .status(400)
      .json({ success: false, message: `${field} already exists` })
  }

  res.status(err.status || 500).json({ success: false, message: err.message })
}

module.exports = { unknownEndpoint, errorHandler }
