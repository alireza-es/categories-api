const proxyquire = require('proxyquire');
const { expect } = require('chai');
const { Category } = require('../../src/models');

const fakeCategories = [
  {
    id: 1,
    name: 'Fake Root category1',
    parent_id: null,
  },
  {
    id: 3,
    name: 'Child category11',
    parent_id: 1,
  },
  {
    id: 7,
    name: 'Grandchild category111',
    parent_id: 3,
  },
  {
    id: 8,
    name: 'Grandchild category112',
    parent_id: 3,
  },
  {
    id: 4,
    name: 'Child category12',
    parent_id: 1,
  },
  {
    id: 2,
    name: 'Root category2',
    parent_id: null,
  },
  {
    id: 5,
    name: 'Child category21',
    parent_id: 2,
  },
  {
    id: 9,
    name: 'Grandchild category211',
    parent_id: 5,
  },
  {
    id: 10,
    name: 'Grandchild category212',
    parent_id: 5,
  },
  {
    id: 6,
    name: 'Child category22',
    parent_id: 2,
  },
];

describe('CategoryService', () => {
  describe('queryAllCategories', () => {
    it('should return all categories', async () => {
      // arrange
      Category.sequelize.query = async () => {
        return Promise.resolve(fakeCategories);
      };
      const categoryService = proxyquire('../../src/services/category.service', { Category });

      // act
      const result = await categoryService.queryAllCategories();

      // check
      expect(result).to.be.an('array');
      expect(result).to.have.lengthOf(2);
      expect(result[0]).to.have.property('id', fakeCategories[0].id);
      expect(result[0]).to.have.property('name', fakeCategories[0].name);
      expect(result[0]).to.have.property('parent_id', fakeCategories[0].parent_id);
      expect(result[0]).to.have.property('children');
      expect(result[0].children).to.be.an('array');
      expect(result[0].children).to.have.lengthOf(2);
      expect(result[0].children[0]).to.have.property('id', fakeCategories[1].id);
      expect(result[0].children[0]).to.have.property('name', fakeCategories[1].name);
      expect(result[0].children[0]).to.have.property('parent_id', fakeCategories[1].parent_id);
      expect(result[0].children[0]).to.have.property('parent_id', fakeCategories[0].id);
    });

    it('should return empty array if no categories', async () => {
      // arrange
      Category.sequelize.query = async () => {
        return Promise.resolve([]);
      };
      const categoryService = proxyquire('../../src/services/category.service', { Category });

      // act
      const result = await categoryService.queryAllCategories();

      // check
      expect(result).to.be.an('array');
      expect(result).to.have.lengthOf(0);
    });
  });

  describe('queryCategoryById', () => {
    it('should return existent category', async () => {
      // arrange
      Category.sequelize.query = async () => {
        const ids = [1, 3, 4, 7, 8];
        return Promise.resolve(fakeCategories.filter((c) => ids.includes(c.id)));
      };
      const categoryService = proxyquire('../../src/services/category.service', { Category });
      const id = 1;

      // act
      const result = await categoryService.getCategoryById(id);

      // check
      expect(result).to.be.an('object');
      expect(result).to.have.property('id', fakeCategories[0].id);
      expect(result).to.have.property('name', fakeCategories[0].name);
      expect(result).to.have.property('parent_id', fakeCategories[0].parent_id);
      expect(result).to.have.property('children');
      expect(result.children).to.be.an('array');
      expect(result.children).to.have.lengthOf(2);
      expect(result.children[0]).to.have.property('id', fakeCategories[1].id);
      expect(result.children[0]).to.have.property('name', fakeCategories[1].name);
      expect(result.children[0]).to.have.property('parent_id', fakeCategories[1].parent_id);
    });

    it('should return null for an invalid category', async () => {
      // arrange
      Category.sequelize.query = async () => {
        return Promise.resolve([]);
      };
      const categoryService = proxyquire('../../src/services/category.service', { Category });
      const id = 10;

      // act
      const result = await categoryService.getCategoryById(id);

      // check
      expect(result).to.equal(null);
    });
  });
});
