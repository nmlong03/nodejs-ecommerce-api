import Cart from "../models/cart";
import Product from "../models/product"
export const addToCart = async (req, res) => {
  const newCart = new Cart(req.body);

  try {
      const savedCart = await Cart.create(req.body);
      res.status(201).json({
          type: "success",
          message: "Product added successfully",
          savedCart
      })
  } catch (err) {
      res.status(500).json({
          type: "error",
          message: "Something went wrong please try again",
          err
      })
  }
    // return res.status(200).send({ message:"showing all orders in the cart", createdCart });

  }

    // 2) Check if cart exist
    // if (cart) {
    //   console.log(cart);
    //   // Find product index in the cart
    //   const indexFound = cart.items.findIndex(
    //     (item) => item.product.toString() === productId.toString()
    //   );
    //     console.log(indexFound);
    //   // Check product index
    //   // if (indexFound !== -1 && quantity <= 0) {
    //   //   cart.items.splice(indexFound, 1);
    //   // } else if (
    //   //   indexFound !== -1 
    //   //   // &&
    //   //   // cart.items[indexFound].selectedColor.toString() ===
    //   //   //   selectedColor.toString() &&
    //   //   // cart.items[indexFound].selectedSize.toString() ===
    //   //   //   selectedSize.toString()
    //   // ) {
    //   //   // In case product exist in the cart and have the same color and size.
    //   //   cart.items[indexFound].totalProductQuantity += quantity;
    //   //     priceAfterDiscount * quantity;
    //   //   cart.totalQuantity += quantity;
    //   // } else if (quantity > 0) {
    //   //   // In case product doesn't exist & there is other products in the cart
    //   //   // then push the new product to the items array in the cart
    //   //   // Update totalQuantity & totalPrice
    //     cart.items.push({
    //       product: productId,
    //       quantity: quantity,
    //     });
    //   } else {
    //     return {
    //       type: 'Error',
    //       message: 'invalidRequest',
    //       statusCode: 400
    //     };
    //   }

    //   // Save cart data
    //   await cart.save();

    //   // If everything is OK, send cart
    //   return {
    //     type: 'Success',
    //     message: 'successfulItemAddToCart',
    //     statusCode: 200,
    //     cart
    //   };
    // }

    // 3) In case user doesn't have cart, then create new cart for the user


    // 5) If everything is OK, send cart
    // return {
    //   type: 'Success',
    //   message: 'successfulItemAddToCart',
    //   statusCode: 200,
    //   cart: createdCart
    // };
  


export const get = async (req, res) => {
    // const results = await Cart.aggregate([
    //     {
    //       $group: {
    //         _id: "$product",
    //         orderSum: { $sum: "$quantity" },
    //       },
    //     },
    //   ])
    //     .populate("product", "image name price desc quantity createdAt -_id ")
    //     .exec((err, cart) => {
    //       if (err) return res.status(400).send({ message: "showing order", err });
    //       return res
    //         .status(200)
    //         .send({ message: "showing all orders in the cart", cart });
    //     });
    
    //   res.status(200).json({
    //     status: "success",
    //     results,
    //   });
    
    Cart.find({ user: req.params.userId }, '-_id quantity product')
    .populate("product", "productImage name price createdAt -_id ")
    .exec()
    .then((cart) => {
      return res.status(200).send({ message:"showing all orders in the cart", cart });
    })
    .catch((err) => {
      return res.status(400).send({ message: "unable to show orders", err });
    });
}