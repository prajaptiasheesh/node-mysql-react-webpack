const addProduct = async (body, params, query)=>{

    const { Products, Categories, ProductCategories, sequelize } = global['db'];
    // First, we start a transaction from your connection and save it into a variable
    const t = await sequelize.transaction();

    return Products.findOne({ where : {
                  title: body.title
            }}).then(async(result)=>{
            
                if(result){
                    throw new Error("Product is already exists");
                }else{
                    try {
                        let { catId, ...rest } = body;
                        let category = await Categories.findByPk(catId);
                        let result = await Products.create({...rest}, { transaction: t })
                        result = result?.toJSON();
                        await result;
                        t.commit();
                        return Products.find
                    } catch (error) {
                        t.rollback()
                        throw error;
                    }
                }
            })
}

const listProducts = async (body, params, query)=>{

    let { Products } = global["db"];
    return Products.findAll({ raw: true })
}

const deleteProduct = async (body, params, query)=>{
    let { catId } = params;
    let { Products, sequelize } = global['db'];
    const t = await sequelize.transaction();

        return Products.findOne({ where: { id: catId } })
        .then(product=>{
            if(product){
                return Products.destroy({ transaction: t })
                        .then(res=>{
                            if(res){
                                product  = product?.toJSON()
                                t.commit()
                                return product;
                            }else{
                                t.rollback()
                                throw new Error("failed to destroy product")
                            }
                        })
            }else{
                throw new Error("Product does not exist");
            }
        })
}

const mapProductToCategory = async (body, params, query)=>{

    const productId = body.productId;
    const catId = body.catId;

    const { Products, Categories, ProductCategories, sequelize } = global["db"];
    const t = await sequelize.transaction();

    return Products.findOne({
        where : {
            id: productId
        }
    }).then((result)=>{
        if(result){
            return Categories.findOne({
                where: {
                    id: catId
                }
            }).then(async(category)=>{

                try {
                    
                    let product  = await Products.findOne({
                        where: {
                            id: productId
                        },
                        include: [{ model: Categories, required: true}]
                    })
                    if(category && !product){
                        await ProductCategories.create({
                            catId: category.id,
                            productId: productId
                        }, { transaction: t });
    
                        t.commit()
                        return Products.findOne({
                            where: {
                                id: productId
                            },
                            include: [{
                                model: Categories,
                                through: {
                                    attributes: []
                                }
                            }]
                        })
                    }else{
                        if(product){
                            throw new Error("Product category already exist");
                        }else if(!category){
                            throw new Error('Category does not exist');
                        }
                    }

                } catch (error) {
                    t.rollback();
                    throw error;
                }
            })
        }else{
            throw new Error('Product does not exist');
        }
    })
}

module.exports = {
    addProductController: addProduct,
    listProductController: listProducts,
    deleteProductController: deleteProduct,
    mapProductToCategoryController: mapProductToCategory,
}