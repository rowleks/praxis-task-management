const mongoose = require('mongoose')
const tokenBlacklistSchema = require('../database/schemas/tokenBlacklist.schema')

const TokenBlacklist = mongoose.model('TokenBlacklist', tokenBlacklistSchema)

const findOne = async filter => await TokenBlacklist.findOne(filter)

const create = async tokenData => await new TokenBlacklist(tokenData).save()

const deleteMany = async filter => await TokenBlacklist.deleteMany(filter)

module.exports = { findOne, create, deleteMany }
