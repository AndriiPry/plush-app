'use strict';

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::product.product', ({ strapi }) => ({
  async create(ctx) {
    try {
      const { products } = ctx.request.body;
      
      if (!products || !Array.isArray(products)) {
        return ctx.send({ error: 'Invalid product data.' });
      }

      const updatedProducts = [];

      for (const product of products) {
        const { id, quantity } = product;
        const existingProduct = await strapi.entityService.findOne('api::product.product', id);

        if (existingProduct) {
          const newTotalFunded = (Number(existingProduct.total_funded) || 0) + Number(quantity);
          const updatedProduct = await strapi.entityService.update('api::product.product', id, {
            data: {
              total_funded: newTotalFunded,
            },
          });

          updatedProducts.push(updatedProduct);
        } else {
          ctx.send({ message: `Product with ID ${id} not found.` });
        }
      }

      ctx.send({ message: 'success' });
    } catch (error) {
      ctx.send({ error: 'An error occurred while updating the products.' });
    }
  },
}));


// 'use strict';

// const { createCoreController } = require('@strapi/strapi').factories;

// module.exports = createCoreController('api::product.product', ({ strapi }) => ({
//   async create(ctx) {
//     try {
//         const { products } = ctx.request.body;
        
//     } catch (error) {
//       ctx.send({ error: 'An error occurred while creating the product.' });
//     }
//   },
// }));
