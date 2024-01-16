import "express-async-errors";
import express from "express";
import supertest from "supertest";
import { AppDataSourceTest } from "../../../database/typeorm/postgres/data-source-test";
import HttpStatus from "http-status-codes";
import producerRoutes from "../producer.routes";
import { httpError } from "../../middlewares/http-errors";
import ProducerEntity from "../../../database/typeorm/postgres/entities/producer.entity";

describe("Producer routes tests", () => {
  const app = express();
  app.use(express.json());
  app.use(httpError);
  app.use(producerRoutes);

  const producerStub = {
    name: "Producer Test",
    document: "438.630.640-46",
  };
  const invalidId = "78f9731e-17d8-4e05-a71b-cde40b43d2f4";

  beforeAll(async () => {
    await AppDataSourceTest.initialize();
    await AppDataSourceTest.getRepository(ProducerEntity).delete({});
  });

  afterAll(async () => {
    await AppDataSourceTest.getRepository(ProducerEntity).delete({});
    await AppDataSourceTest.close();
  });

  describe("Create", () => {
    it("should return a new Producer", async () => {
      const newProducer = {
        name: "Producer Test",
        document: "292.256.890-39",
      };
      const response = await supertest(app)
        .post("/api/v1/producers")
        .send(newProducer)
        .expect(HttpStatus.CREATED);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body.name).toBe(newProducer.name);
      expect(response.body.document).toBe(newProducer.document);
    });

    it("should return an Exception with same document", async () => {
      const repository = AppDataSourceTest.getRepository(ProducerEntity);
      await repository.delete({});
      await repository.save(producerStub);
      await supertest(app)
        .post("/api/v1/producers")
        .send(producerStub)
        .expect(HttpStatus.BAD_REQUEST);
    });

    it("should return an Exception with name invalid", async () => {
      const producer = {
        name: "",
        document: "780.366.920-40",
      };
      await supertest(app)
        .post("/api/v1/producers")
        .send(producer)
        .expect(HttpStatus.BAD_REQUEST);
    });

    it("should return an Exception with document invalid", async () => {
      const producer = {
        name: "Name",
        document: "",
      };
      await supertest(app)
        .post("/api/v1/producers")
        .send(producer)
        .expect(HttpStatus.BAD_REQUEST);
    });

    it("should return an Exception with document in invalid format", async () => {
      const producer = {
        name: "Name",
        document: "12345678901",
      };
      await supertest(app)
        .post("/api/v1/producers")
        .send(producer)
        .expect(HttpStatus.BAD_REQUEST);
    });
  });

  describe("Get All", () => {
    it("should return all Producers", async () => {
      const response = await supertest(app)
        .get("/api/v1/producers")
        .expect(HttpStatus.OK);
      expect(response.body).toBeInstanceOf(Array);
    });
  });

  describe("Get By Id", () => {
    it("should return a Producer when is used a valid id", async () => {
      const repository = AppDataSourceTest.getRepository(ProducerEntity);
      await repository.delete({});
      const producerStored = await repository.save(producerStub);
      const response = await supertest(app)
        .get(`/api/v1/producers/${producerStored.id}`)
        .expect(HttpStatus.OK);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body.name).toBe(producerStub.name);
      expect(response.body.document).toBe(producerStub.document);
    });

    it("should return a not found exception with wrong producer id", async () => {
      await supertest(app)
        .get(`/api/v1/producers/${invalidId}`)
        .expect(HttpStatus.NOT_FOUND);
    });
  });

  describe("Delete", () => {
    it("shold reuturn true with valid id", async () => {
      const repository = AppDataSourceTest.getRepository(ProducerEntity);
      await repository.delete({});
      const producerStored = await repository.save(producerStub);
      await supertest(app)
        .delete(`/api/v1/producers/${producerStored.id}`)
        .expect(HttpStatus.NO_CONTENT);
    });

    it("should return a not found exception with wrong producer id", async () => {
      await supertest(app)
        .delete(`/api/v1/producers/${invalidId}`)
        .expect(HttpStatus.NOT_FOUND);
    });
  });

  describe("Update", () => {
    it("shold return the producer updated with valid data", async () => {
      const repository = AppDataSourceTest.getRepository(ProducerEntity);
      await repository.delete({});
      const producerStored = await repository.save(producerStub);
      const producerUpdateValidBody = {
        name: "Producer Test Updated 3",
        document: "944.910.590-12",
      };
      const response = await supertest(app)
        .patch(`/api/v1/producers/${producerStored.id}`)
        .send(producerUpdateValidBody)
        .expect(HttpStatus.OK);
      expect(response.body).toMatchObject(producerUpdateValidBody);
    });

    it("shold return an error with invalid name", async () => {
      const repository = AppDataSourceTest.getRepository(ProducerEntity);
      await repository.delete({});
      const producerStored = await repository.save(producerStub);
      const producerUpdateValidBody = {
        name: "",
        document: "944.910.590-12",
      };
      await supertest(app)
        .patch(`/api/v1/producers/${producerStored.id}`)
        .send(producerUpdateValidBody)
        .expect(HttpStatus.BAD_REQUEST);
    });

    it("shold return an error with invalid document", async () => {
      const repository = AppDataSourceTest.getRepository(ProducerEntity);
      await repository.delete({});
      const producerStored = await repository.save(producerStub);
      const producerUpdateValidBody = {
        name: "Name",
        document: "944.910.590-11",
      };
      await supertest(app)
        .patch(`/api/v1/producers/${producerStored.id}`)
        .send(producerUpdateValidBody)
        .expect(HttpStatus.BAD_REQUEST);
    });
  });
});
