const { UserFav } = require('../../db/models');

async function checkFav(req, res) {
  const { id } = req.params;
  const findFav = await UserFav.findOne({ where: { recipe_id: id, user_id: 1 } });
  if (findFav) {
    console.log('findFav', findFav);
    res.json({ fav: true });
  }
  if (!findFav) {
    console.log('findFav', findFav);
    res.json({ fav: false });
  }

  console.log('id', id);
  res.end();
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
