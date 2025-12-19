import User from "../models/User.js";
import CourseCard from "../models/CourseCard.js";

export const addToCart = async (req, res) => {
  try {
    const { itemId, itemType } = req.body;
    
    if (!req.user) {
      return res.status(401).json({ error: "Please log in to add items to cart" });
    }

    // Validate item exists
    const item = await CourseCard.findById(itemId);
    
    if (!item) {
      return res.status(404).json({ error: "Course not found" });
    }

    // Get user and add to cart
    const user = await User.findById(req.user._id);
    await user.addToCart(itemId, itemType, item.title, item.price, item.image);

    // Return updated cart with populated items
    const updatedUser = await User.findById(req.user._id)
      .populate('inCart.itemId');

    res.status(200).json({ 
      message: "Course added to cart successfully",
      cart: updatedUser.inCart 
    });

  } catch (err) {
    console.error("Add to cart error:", err);
    
    if (err.message === 'Item already in cart') {
      return res.status(400).json({ error: "This course is already in your cart" });
    }
    if (err.message === 'You already own this item') {
      return res.status(400).json({ error: "You already own this course" });
    }
    
    res.status(500).json({ error: "Server error adding to cart" });
  }
};

export const removeFromCart = async (req, res) => {
  try {
    const { itemId } = req.params;

    if (!req.user) {
      return res.status(401).json({ error: "Please log in" });
    }

    const user = await User.findById(req.user._id);
    await user.removeFromCart(itemId);

    // Return updated cart
    const updatedUser = await User.findById(req.user._id)
      .populate('inCart.itemId');

    res.status(200).json({ 
      message: "Item removed from cart",
      cart: updatedUser.inCart 
    });

  } catch (err) {
    console.error("Remove from cart error:", err);
    res.status(500).json({ error: "Server error" });
  }
};

export const getCart = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "Please log in" });
    }

    const user = await User.findById(req.user._id)
      .populate('inCart.itemId');

    res.status(200).json({ cart: user.inCart });

  } catch (err) {
    console.error("Get cart error:", err);
    res.status(500).json({ error: "Server error" });
  }
};