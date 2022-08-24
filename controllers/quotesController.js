const axios = require("axios");
const { Quotes } = require("../models");
const API_URL = "http://api.kanye.rest/";

const findQuote = async (user_id, quote_id) => {
  try {
    const findQuote = await Quotes.findOne({
      where: { user_id: user_id, id: quote_id },
    });
    return findQuote;
  } catch (error) {
    throw new Error("Error when finding Quote");
  }
};
const create = async (req, res) => {
  try {
    const { id } = req.user;
    const { quote } = req.body;
    const [data,_] = await Quotes.findOrCreate({
      where: { user_id: id, quote },
      default: { quote, user_id: id },
    });
    return res.status(200).json({ status: "success", data });
  } catch (error) {
    return res
      .status(500)
      .json({ status: "failed", message: "Internal Server Error ", error });
  }
};

const findQuoteFromAPI = async (req, res) => {
  try {
    const { id } = req.user;
    const data = await axios.get(API_URL);
    const quote = data.data.quote;
    await Quotes.findOrCreate({
      where: { user_id: id, quote },
      default: { quote, user_id: id },
    });
    return res.status(200).json({ status: "success", quote });
  } catch (error) {
    return res
      .status(500)
      .json({ status: "failed", message: "Internal Server Error ", error });
  }
};

const getAllQuotes = async (req, res) => {
  try {
    const { id } = req.user;
    const favorites = await Quotes.findAll({
      where: { user_id: id, favorites: true },
    });
    const quotes = await Quotes.findAll({
      where: { user_id: id, favorites: false },
    });
    return res.status(200).json({ message: "success", quotes, favorites });
  } catch (error) {
    return res
      .status(500)
      .json({ status: "failed", message: "Internal Server Error ", error });
  }
};

const setFavorite = async (req, res) => {
  try {
    const { quote_id, set } = req.body;
    const { id } = req.user;
    const quote = await findQuote(id, quote_id);
    if (!quote)
      return res
        .status(404)
        .json({ status: "failed", message: "quote not found !" });
    await Quotes.update({ favorites: set }, { where: { id: quote_id } });
    return res
      .status(200)
      .json({ status: "success", message: "Quotes has been updated !" });
  } catch (error) {
    return res
      .status(500)
      .json({ status: "failed", message: "Internal Server Error ", error });
  }
};

const deleteQuote = async (req, res) => {
  try {
    const { id } = req.user;
    const { quote_id } = req.body;
    const quote = await findQuote(id, quote_id);
    if (!quote)
      return res
        .status(404)
        .json({ status: "failed", message: "quote not found !" });
    await Quotes.destroy({ where: { id: quote_id } });
    return res
      .status(200)
      .json({ status: "success", message: "Quote has been deleted" });
  } catch (error) {
    return res
      .status(500)
      .json({ status: "failed", message: "Internal Server Error ", error });
  }
};

module.exports = {
  create,
  findQuoteFromAPI,
  setFavorite,
  deleteQuote,
  getAllQuotes,
};
