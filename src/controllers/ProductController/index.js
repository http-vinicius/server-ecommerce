const Product = require('../../models/Product')

const ProductController = {

  async createProduct(req, res) {
    const bodyData = req.body
    const { user_id } = req.params
    try {
      const data = { username: user_id, ...bodyData }
      const newProduct = await Product.create(data)
      await newProduct.populate('username').execPopulate()
      return res.status(200).send(newProduct)
    } catch (err) {
      return res.status(400).send(err)
    }
  },

  async getUserProducts(req, res) {

    const { user_id } = req.params

    try {
      const productsOfAnUser = await Product.find({ username: user_id })
      return res.status(200).send(productsOfAnUser)
    } catch (err) {
      return res.status(400).send(err)
    }
  },

  async updateProduct(req, res) {

    const bodyData = req.body
    const { product_id, user_id } = req.params
    try {
      const updateProduct = await Product.findByIdAndUpdate(product_id, bodyData, { new: true })
      return res.status(200).send(updateProduct)
    } catch (err) {
      return res.status(400).send(err)
    }
  },

  async deleteProduct(req, res) {

    const { product_id, user_id } = req.params
    try {
      const deletedProduct = await Product.findByIdAndDelete(product_id)
      return res.status(200).send(deletedProduct)
    } catch (err) {
      return res.status(400).send(err)
    }
  },

  async getProducts(req, res) {
    try {
      const products = await Product.find()
      return res.status(200).json(products)
    } catch (err) {
      return res.status(400).send(err)
    }
  },

  async getProductById(req, res) {

    const { product_id } = req.params
    try {
      const product = await Product.findById(product_id)
      return res.status(200).json(product)
    } catch (err) {
      return res.status(400).send(err)
    }
  }
}

module.exports = ProductController