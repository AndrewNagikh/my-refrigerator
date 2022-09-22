const { UserFav } = require('../../db/models');

async function checkFav(req, res) {
  try {
    const { id } = req.params;
    const userId = req.session?.userId;
    console.log('user_id', userId);
    const findFav = await UserFav.findOne({ where: { recipe_id: id, user_id: userId } });
    if (findFav) {
      console.log('findFav', findFav);
      return res.json({ fav: true });
    }
    console.log('findFav', findFav);
    return res.json({ fav: false });
  } catch (error) {
    console.log('check back error', error);
  }
}

async function toggleFav(req, res) {
  try {
    const { id } = req.params;
    const userId = req.session?.userId;
    const findFav = await UserFav.findOne({ where: { recipe_id: id, user_id: userId } });
    if (findFav) {
      await UserFav.destroy({ where: { recipe_id: id, user_id: userId } });
      res.status(200).json({ fav: false });
    }
    if (!findFav) {
      await UserFav.create({ recipe_id: id, user_id: userId });
      res.status(200).json({ fav: true });
    }
  } catch (error) {
    console.log('check back error', error);
  }
}

module.exports = {
  checkFav, toggleFav,
};
