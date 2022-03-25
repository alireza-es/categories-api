module.exports = {
  async insertCategory(queryInterface, category) {
    const categoryToInsert = { ...category };
    categoryToInsert.createdAt = new Date();
    categoryToInsert.updatedAt = new Date();
    delete categoryToInsert.children;
    const ids = await queryInterface.bulkInsert('Categories', [categoryToInsert], { returning: true });

    if (category.children && category.children.length > 0) {
      const promises = [];
      category.children.forEach(async (child) => {
        const childToInsert = { ...child, parent_id: ids[0].id };
        promises.push(this.insertCategory(queryInterface, childToInsert));
      });
      await Promise.all(promises);
    }
  },
  async up(queryInterface) {
    const categories = [
      {
        name: 'Root category1',
        children: [
          {
            name: 'Child category11',
            children: [
              {
                name: 'Grandchild category111',
              },
              {
                name: 'Grandchild category112',
              },
            ],
          },
          {
            name: 'Child category12',
          },
        ],
      },
      {
        name: 'Root category2',
        children: [
          {
            name: 'Child category21',
            children: [
              {
                name: 'Grandchild category211',
              },
              {
                name: 'Grandchild category212',
              },
            ],
          },
          {
            name: 'Child category22',
          },
        ],
      },
    ];

    const promises = [];
    categories.forEach(async (category) => {
      promises.push(this.insertCategory(queryInterface, category));
    });

    return Promise.all(promises);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Categories', null, {});
  },
};
