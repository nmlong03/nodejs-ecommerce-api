import Cart from "../models/cart";
import Product from "../models/product"
export const addToCart = async (req, res) => {
  const {productId, count, userId} = req.body
  try {
    let cart = await Cart.findOneAndUpdate(
      {productId},
      {productId, count, userId: userId},
      {upsert: true},
    )

      const indexFound = cart.productId;
      if(indexFound == productId){
        let cart = await Cart.findOneAndUpdate(
          {productId},
          {productId, count: count + 1, userId: userId},
          {upsert: true},
        )
      }
      console.log(cart);
    res.status(201).send({status: 'ok', cart})
  } catch (err) {
    console.log(err)
    sendResponseError(500, `Error ${err}`, res)
  }

  }


export const getCart = async (req, res) => {
    try {
      const carts = await Cart.find({userId: req.params.userId}).populate('productId')
      res.status(200).send({status: 'ok', carts})
    } catch (error) {
      console.log(error)
    }
}