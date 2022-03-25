const request = require('supertest');
const { expect } = require('chai');
const httpStatus = require('http-status');
const app = require('../../src/app');
const { Category } = require('../../src/models');

describe('Category routes', () => {
  describe('GET /api/categories', () => {
    it('should return 200 and a tree model of all categories', async () => {
      // act
      const res = await request(app).get('/api/categories').expect(httpStatus.OK);

      // check
      expect(res.body).to.be.an('array');
      expect(res.body).to.have.lengthOf(2);
    });
  });

  describe('GET /api/categories/{id}', () => {
    it('should return 200 and a tree model of a fetched categories', async () => {
      // arrange
      const id = 1;

      // act
      const res = await request(app).get(`/api/categories/${id}`).expect(httpStatus.OK);

      // check
      const dbCategory = await Category.findByPk(id);

      expect(res.body).to.be.an('object');
      expect(dbCategory).to.be.an('object');
      expect(res.body).to.have.property('id', dbCategory.id);
      expect(res.body).to.have.property('name', dbCategory.name);
      expect(res.body).to.have.property('parent_id', dbCategory.parent_id);
    });

    it('should return 200 with a null object if id does not exist', async () => {
      // arrange
      const id = 1232;

      // act
      const res = await request(app).get(`/api/categories/${id}`).expect(httpStatus.NOT_FOUND);

      // check

      expect(res.body).to.be.an('object');
    });

    it('should return 404 error if url is not valid', async () => {
      await request(app).get('/api/categories123').expect(httpStatus.NOT_FOUND);
    });
  });
});
