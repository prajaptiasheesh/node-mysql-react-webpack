const addCategory = async (body, params, query)=>{

    const { Categories, sequelize } = global['db'];
    const t = await sequelize.transaction();

    // First, we start a transaction from your connection and save it into a variable
    return Categories.findOne({ where : {
                  title: body.title
            }}).then(async(result)=>{
            
                if(result){
                    throw new Error("Product category already exists");
                }else{
                    try {
                        
                        let result = await Categories.create({
                            title: body.title,
                            name: body.name
                        }, { transaction: t })
                        t.commit();
                        return result?.toJSON()
                    } catch (error) {
                        t.rollback()
                        throw error;
                    }
                }
            })
}

const listCategory = async (body, params, query)=>{

    let { Categories } = global["db"];
    return Categories.findAll({ raw: true })
}

const deleteCategory = async (body, params, query)=>{
    let { catId } = params;
    let { Categories, sequelize } = global['db'];
    const t = await sequelize.transaction();

        return Categories.findOne({ where: { id: catId } })
        .then(category=>{
            if(category){
                return category.destroy({ transaction: t })
                        .then(res=>{
                            if(res){
                                category  = category?.toJSON()
                                t.commit()
                                return category;
                            }else{
                                t.rollback()
                                throw new Error("failed to destroy category")
                            }
                        })
            }else{
                throw new Error("Category does not exist");
            }
        })
}
module.exports = {
    addCategoryController: addCategory,
    listCategoryController: listCategory,
    deleteCategoryController: deleteCategory
}