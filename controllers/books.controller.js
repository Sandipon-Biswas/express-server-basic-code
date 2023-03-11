const Book =require('../models/Books');
  
const getAllBooks = async (req,res,next) => {
    let books;
    try {
        books=await Book.find();
    } catch (error) {
        console.log(error)
    }
    if (!books) {
        return res.status(404).json({message:"no book there"})
    }
    return res.status(200).json({books})
}
const addBook = async (req, res, next) => {
    const { name, author, description, price, available, image } = req.body;
    let book;
    try {
      book = new Book({
        name,
        author,
        description,
        price,
        available,
        image,
      });
      await book.save();
    } catch (err) {
      console.log(err);
    }
  
    if (!book) {
      return res.status(500).json({ message: "Unable To Add" });
    }
    return res.status(201).json({ book });
  };
  const getById = async (req, res, next) => {
    const id = req.params.id;
    let book;
    try {
      book = await Book.findById(id);
    } catch (err) {
      console.log(err);
    }
    if (!book) {
      return res.status(404).json({ message: "No Book found" });
    }
    return res.status(200).json({ book });
  };
  const updateBook = async (req, res, next) => {
    const id = req.params.id;
    const { name, author, description, price, available, image } = req.body;
    let book;
    try {
      book = await Book.findByIdAndUpdate(id, {
        name,
        author,
        description,
        price,
        available,
        image,
      });
      book = await book.save();
    } catch (err) {
      console.log(err);
    }
    if (!book) {
      return res.status(404).json({ message: "Unable To Update By this ID" });
    }
    return res.status(200).json({ book });
  };
  
  const deleteBook = async (req, res, next) => {
    const id = req.params.id;
    let book;
    try {
      book = await Book.findByIdAndRemove(id);
    } catch (err) {
      console.log(err);
    }
    if (!book) {
      return res.status(404).json({ message: "Unable To Delete By this ID" });
    }
    return res.status(200).json({ message: "Product Successfully Deleted" });
  };
module.exports={getAllBooks, addBook,deleteBook,updateBook,getById};