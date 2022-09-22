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
  const { id } = req.params;
  const findFav = await UserFav.findOne({ where: { recipe_id: id, user_id: user_id_session } });
  if (findFav) {
    await UserFav.destroy({ where: { recipe_id: id, user_id: user_id_session } });
    res.status(200).json({ fav: false });
  }
  await UserFav.create({ where: { recipe_id: id, user_id: user_id_session } });
  if (!findFav) { res.status(200).json({ fav: true }); }
}

module.exports = {
  checkFav, toggleFav,
};
