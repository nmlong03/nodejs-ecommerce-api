import Cart from "../models/cart";
import Product from "../models/product"
export const addToCart = async (req, res) => {
  const { productId, userId, count = 1 } = req.body;
  try {
    let cart = await Cart.findOne({ userId: userId });
    if (!cart) {
      cart = await Cart.create({ productId, count, userId });
    } else {
      if (cart.productId == productId) {
        if (count) {
          cart.count += count;
        } else {
          cart.count += 1;
        }
        await cart.save();
      } else {
        // Tạo một giỏ hàng mới nếu productId không trùng
        const newCart = await Cart.create({ productId, count, userId });
        cart = newCart;
      }
    }

    return res.status(201).send({ status: 'ok', cart });

  } catch (error) {
    return res.status(400).json({
      message: error.message
    });
  }
};
export const getCart = async (req, res) => {
  try {
    const carts = await Cart.find({ userId: req.params.userId }).populate({
      path: 'productId',
      populate: {
        path: 'categoryId',
        model: 'Category'
      }
    });

    const productCount = carts.reduce((count, cart) => {
      return count + (cart.productId ? 1 : 0);
    }, 0);

    res.status(200).json({
      carts,
      length: productCount
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message
    });
  }
};
export const deleteItemCart = async (req, res) => {
  const id = req.params.id;
  try {
    const cart = await Cart.findOneAndDelete({ productId: id });
    if (!cart) { // Không tìm thấy giỏ hàng chứa sản phẩm đó
      return res.status(404).json({ message: 'Không tìm thấy sản phẩm trong giỏ hàng' });
    }
    res.json({
      message: "Xóa thành công",
      cart
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message
    })
  }
}
export const increment = async (req, res) => {
  try {
    const cartId = req.params.cartId;
    const cart = await Cart.findById(cartId);

    if (!cart) {
      return res.status(404).json({
        message: 'Cart not found'
      });
    }

    cart.count += 1;
    await cart.save();

    res.status(200).json({
      message: 'Incremented successfully',
      cart
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message
    });
  }
};
export const decrement = async (req, res) => {
  try {
    const cartId = req.params.cartId;
    const cart = await Cart.findById(cartId);

    if (!cart) {
      return res.status(404).json({
        message: 'Cart not found'
      });
    }

    if (cart.productId.count <= 0) {
      return res.status(400).json({
        message: 'Product count cannot be negative'
      });
    }

    cart.count -= 1;
    await cart.save();

    res.status(200).json({
      message: 'Decremented successfully',
      cart
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message
    });
  }
};