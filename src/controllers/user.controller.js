const getUsers = async (body, params, query) => {



}

const getDropdownValues = async () => {
    let { Categories, sequelize } = global['db'];
    return Categories.findAll().then(res => {
        return res.map(item => {
            const { title, name } = item.toJSON();
            return { label: title, value: name };
        })
    });
}

const addUserToProduct = async (body, params, query, req) => {
    let productId = body.productId
    let { user } = req;

    let { UserProducts, Products, User, sequelize } = global['db'];
    const t = await sequelize.transaction();

    return UserProducts.findOne({
        where: {
            productId: productId,
            userId: user.id
        }
    }).then(userProduct => {

        if (userProduct?.toJSON()) {
            throw new Error("Product already exist for this user");
        } else {
            userProduct = UserProducts.build({ userId: user.id, productId }, { transaction: t });

            return User.findAll({
                where: { id: user.id },
                include: [Products]
            })
        }
    }).catch(err => {
        t.rollback();
        throw err;
    })
}

module.exports = {
    getUsersController: getUsers,
    getDropdownValuesController: getDropdownValues,
    addUserToProductController: addUserToProduct
}