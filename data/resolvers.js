import { reject } from 'lodash';
import { Widgets } from './dbConnectors';

export const resolvers = {
    getProduct: ({ id }) => {
        return new Promise((resolve) => {
            Widgets.findById({ _id: id}, (err, product) => {
                if (err) reject(err)
                else resolve(product)
            })
        });
    },
    getAllProducts: () => {
      return Widgets.find({})
    },
    createProduct: async ({input}) => {
      const newWidget = new Widgets({
          name: input.name,
          description: input.description,
          price: input.price,
          soldout: input.soldout,
          inventory: input.inventory,
          stores: input.stores,
      });
      try {
        newWidget.id = newWidget._id;
        const savedWidgets = await newWidget.save();
        return savedWidgets;
      } catch(error) {
        return error;
      }
     
    },
    updateProduct: ({input}) => { 
        try {
            const updatedWidgets = Widgets.findOneAndUpdate({ _id: input.id }, input, { new: true })
             return updatedWidgets;
        } catch(error) {
            return error;
        }
    },
    deleteProduct: ({ id }) => {
        try {
           const deletedWidget =  Widgets.remove({ _id: id });
           return "successfully deleted";
        }catch(error) {
            return error;
        }
      
    }
};

export default resolvers;
