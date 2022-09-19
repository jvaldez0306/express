const fs = require("fs");
const Product = require("../models/Product");
const catchAsync = require("../utils/catchAsync");

exports.getAllProducts = catchAsync(async (req, res) => {
  const products = await Product.find();
  
  res.status(200).json({
    status: "success",
    timeOfRequest: req.requestTime,
    results: products.length,
    data: {
      products,
    },
  });
});

exports.addProduct = catchAsync(async(req, res) => {
  const newProduct = await Product.create(req.body);
  res.status(200).json({
    status: "success",
    data: {
      products: newProduct ,
    },
  });
});

exports.getProductById = catchAsync(async(req, res) => {
  const foundProduct = await Product.findById(req.params.id);
  if (foundProduct) {
    return res.status(200).json({
      status: "success",
      data: {
        product: foundProduct,
      },
    });
  } else {
    res.status(404).json({
      status: "not found",
    });
  }
});

exports.deleteProductById = catchAsync(async(req, res) => {
  const deleteProduct = await Product.findByIdAndDelete(req.params.id);
  if (deleteProduct) {
  return res.status(200).json({
    status: "product was deleted",
    data: {
      product: deleteProduct,
    },
  });
} else {
  res.status(404).json({
    status: "not found",
  });
}
});

 exports.updateProductById = catchAsync(async(req, res) => {
  const id = req.params.id
  const body = req.body
  const updateProduct = await Product.findByIdAndUpdate(id,body,{ new: true });
  if (updateProduct) {
    return res.status(200).json({
      status: "product was updated",
      data: {
        product: updateProduct,
        }
    });
  
  } else {
    res.status(404).json({
      status: "not found",
    });
  }
});