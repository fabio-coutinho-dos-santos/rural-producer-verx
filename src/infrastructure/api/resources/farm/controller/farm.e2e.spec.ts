import "express-async-errors";
import express from "express";
import supertest from "supertest";
import HttpStatus from "http-status-codes";
import farmRoutes from "../farm.routes";
import { httpError } from "../../../middlewares/http-errors";
import Producer from "../../../../../domain/producer/entity/producer.entity";
import ProducerEntity from "../../../../database/typeorm/postgres/entities/producer.entity";
import { AppDataSourceTest } from "../../../../database/typeorm/postgres/datasources/data-source-test";
import FarmEntity from "../../../../database/typeorm/postgres/entities/farms.entity";
import { PlantedCrops } from "../../../../../domain/producer/enum/planted-crops.enum";
import UpdateFarmDto from "../dto/update-farm.dto";

jest.setTimeout(20000);

describe("Farms routes tests", () => {
  const app = express();
  app.use(express.json());
  app.use(httpError);
  app.use(farmRoutes);

  let farmRepository;
  let producerRepository;

  const producer = new Producer("Name", "292.256.890-39");

  let producerStored: ProducerEntity;
  let requestBodyStubValid: UpdateFarmDto;
  let requestBodyStubValid2: UpdateFarmDto;

  beforeAll(async () => {
    await AppDataSourceTest.initialize();
    farmRepository = AppDataSourceTest.getRepository(FarmEntity);
    producerRepository = AppDataSourceTest.getRepository(ProducerEntity);
    await farmRepository.delete({});
    await producerRepository.delete({});

    producerStored = await producerRepository.save(producer);
    requestBodyStubValid = {
      name: "Farm name",
      city: "City",
      state: "State",
      producerId: producerStored.id,
      totalArea: 10,
      arableArea: 2,
      vegetationArea: 4,
      crops: [PlantedCrops.COFFE, PlantedCrops.CORN],
    };

    requestBodyStubValid2 = {
      name: "Farm name",
      city: "City",
      state: "State",
      producerId: producerStored.id,
      totalArea: 25.5,
      arableArea: 2,
      vegetationArea: 4,
      crops: [PlantedCrops.COFFE, PlantedCrops.SOY],
    };
  });

  afterAll(async () => {
    const repository = AppDataSourceTest.getRepository(FarmEntity);
    await repository.delete({});
    await AppDataSourceTest.close();
  });

  describe("Create", () => {
    it("should return a new Farm with valid data", async () => {
      const farmStubValid = {
        name: "Farm name",
        city: "City",
        state: "State",
        producerId: producerStored.id,
        totalArea: 10,
        arableArea: 2,
        vegetationArea: 4,
        crops: ["cotton", "coffe"],
      };
      await supertest(app)
        .post("/api/v1/farms")
        .send(farmStubValid)
        .expect(HttpStatus.CREATED);
    });

    it("should return an error with invalid producerId", async () => {
      const farmStubValid = {
        name: "Farm name",
        city: "City",
        state: "State",
        producerId: "b1419ac5-0d1b-416f-b6d7-9fcdb12a8dc4",
      };
      await supertest(app)
        .post("/api/v1/farms")
        .send(farmStubValid)
        .expect(HttpStatus.BAD_REQUEST);
    });

    it("should return an error with invalid name", async () => {
      const farmStubValid = {
        name: "",
        city: "City",
        state: "State",
        producerId: producerStored.id,
      };
      await supertest(app)
        .post("/api/v1/farms")
        .send(farmStubValid)
        .expect(HttpStatus.BAD_REQUEST);
    });

    it("should return an error with invalid city", async () => {
      const farmStubValid = {
        name: "Name",
        city: "",
        state: "State",
        producerId: producerStored.id,
      };
      await supertest(app)
        .post("/api/v1/farms")
        .send(farmStubValid)
        .expect(HttpStatus.BAD_REQUEST);
    });

    it("should return an error with invalid state", async () => {
      const farmStubValid = {
        name: "Name",
        city: "City",
        state: "",
        producerId: producerStored.id,
      };
      await supertest(app)
        .post("/api/v1/farms")
        .send(farmStubValid)
        .expect(HttpStatus.BAD_REQUEST);
    });

    it("should return an error with invalid area proportion", async () => {
      const farmStubValid = {
        name: "Farm name",
        city: "City",
        state: "State",
        producerId: producerStored.id,
        totalArea: 10,
        arableArea: 7,
        vegetationArea: 4,
        crops: ["cotton", "coffe"],
      };
      await supertest(app)
        .post("/api/v1/farms")
        .send(farmStubValid)
        .expect(HttpStatus.BAD_REQUEST);
    });

    it("should return an error with invalid crop", async () => {
      const farmStubValid = {
        name: "Farm name",
        city: "City",
        state: "State",
        producerId: producerStored.id,
        totalArea: 10,
        arableArea: 3,
        vegetationArea: 4,
        crops: ["rice", "coffe"],
      };
      await supertest(app)
        .post("/api/v1/farms")
        .send(farmStubValid)
        .expect(HttpStatus.BAD_REQUEST);
    });
  });

  describe("Get All", () => {
    it("should return a farm array", async () => {
      const response = await supertest(app)
        .get("/api/v1/farms")
        .expect(HttpStatus.OK);
      expect(response.body).toBeInstanceOf(Array);
    });
  });

  describe("Update Farm", () => {
    it("should return a updated farm with valid data", async () => {
      const farmStored = await AppDataSourceTest.getRepository(FarmEntity).save(
        requestBodyStubValid
      );
      const farmId = farmStored.id;

      const requestToUpdateFarm = {
        name: "Farm name updated",
        city: "City updated",
        state: "State updated",
        totalArea: 15,
        arableArea: 10,
        vegetationArea: 4,
        crops: [PlantedCrops.COFFE, PlantedCrops.CORN, PlantedCrops.COTTON],
      };

      const response = await supertest(app)
        .patch(`/api/v1/farms/${farmId}`)
        .send(requestToUpdateFarm)
        .expect(HttpStatus.OK);
      const farmUpdated = response.body;
      expect(farmUpdated).toBeInstanceOf(Object);
    });

    it("should return an error with invalid name", async () => {
      const farmStored = await AppDataSourceTest.getRepository(FarmEntity).save(
        requestBodyStubValid
      );
      const farmId = farmStored.id;

      const requestToUpdateFarm = {
        name: "",
        city: "City updated",
        state: "State updated",
        totalArea: 15,
        arableArea: 10,
        vegetationArea: 4,
        crops: [PlantedCrops.COFFE, PlantedCrops.CORN, PlantedCrops.COTTON],
      };

      await supertest(app)
        .patch(`/api/v1/farms/${farmId}`)
        .send(requestToUpdateFarm)
        .expect(HttpStatus.BAD_REQUEST);
    });

    it("should return an error with invalid city", async () => {
      const farmStored = await AppDataSourceTest.getRepository(FarmEntity).save(
        requestBodyStubValid
      );
      const farmId = farmStored.id;

      const requestToUpdateFarm = {
        name: "Name",
        city: "",
        state: "State updated",
        totalArea: 15,
        arableArea: 10,
        vegetationArea: 4,
        crops: [PlantedCrops.COFFE, PlantedCrops.CORN, PlantedCrops.COTTON],
      };

      await supertest(app)
        .patch(`/api/v1/farms/${farmId}`)
        .send(requestToUpdateFarm)
        .expect(HttpStatus.BAD_REQUEST);
    });

    it("should return an error with invalid state", async () => {
      const farmStored = await AppDataSourceTest.getRepository(FarmEntity).save(
        requestBodyStubValid
      );
      const farmId = farmStored.id;

      const requestToUpdateFarm = {
        name: "Name",
        city: "City updated",
        state: "",
        totalArea: 15,
        arableArea: 10,
        vegetationArea: 4,
        crops: [PlantedCrops.COFFE, PlantedCrops.CORN, PlantedCrops.COTTON],
      };

      await supertest(app)
        .patch(`/api/v1/farms/${farmId}`)
        .send(requestToUpdateFarm)
        .expect(HttpStatus.BAD_REQUEST);
    });

    it("should return an error with invalid area proportion", async () => {
      const farmStored = await AppDataSourceTest.getRepository(FarmEntity).save(
        requestBodyStubValid
      );
      const farmId = farmStored.id;

      const requestToUpdateFarm = {
        name: "Name",
        city: "City updated",
        state: "State",
        totalArea: 15,
        arableArea: 10,
        vegetationArea: 9,
        crops: [PlantedCrops.COFFE, PlantedCrops.CORN, PlantedCrops.COTTON],
      };

      await supertest(app)
        .patch(`/api/v1/farms/${farmId}`)
        .send(requestToUpdateFarm)
        .expect(HttpStatus.BAD_REQUEST);
    });

    it("should return an error with invalid crop", async () => {
      const farmStored = await AppDataSourceTest.getRepository(FarmEntity).save(
        requestBodyStubValid
      );
      const farmId = farmStored.id;

      const requestToUpdateFarm = {
        name: "Name",
        city: "City updated",
        state: "State",
        totalArea: 15,
        arableArea: 10,
        vegetationArea: 9,
        crops: ["rice", PlantedCrops.CORN, PlantedCrops.COTTON],
      };

      await supertest(app)
        .patch(`/api/v1/farms/${farmId}`)
        .send(requestToUpdateFarm)
        .expect(HttpStatus.BAD_REQUEST);
    });
  });

  describe("Delete Farm", () => {
    it("should return no content with valid data", async () => {
      const farmStored = await AppDataSourceTest.getRepository(FarmEntity).save(
        requestBodyStubValid
      );
      const farmId = farmStored.id;
      await supertest(app)
        .delete(`/api/v1/farms/${farmId}`)
        .expect(HttpStatus.NO_CONTENT);
    });

    it("should return an not found error with invalid id", async () => {
      await AppDataSourceTest.getRepository(FarmEntity).save(
        requestBodyStubValid
      );
      const farmId = "db659f80-ba5e-435a-8b44-23a2d0667e73";
      await supertest(app)
        .delete(`/api/v1/farms/${farmId}`)
        .expect(HttpStatus.NOT_FOUND);
    });
  });

  describe("Get Totals Farms", () => {
    it("should return amount and area total", async () => {
      await AppDataSourceTest.getRepository(FarmEntity).delete({});
      await AppDataSourceTest.getRepository(FarmEntity).save(
        requestBodyStubValid
      );
      await AppDataSourceTest.getRepository(FarmEntity).save(
        requestBodyStubValid2
      );
      const response = await supertest(app)
        .get("/api/v1/farms/totals")
        .expect(HttpStatus.OK);
      expect(response.body.amountFarms).toBe(2);
      expect(response.body.areas.total).toBe(
        requestBodyStubValid.totalArea.valueOf() +
          requestBodyStubValid2.totalArea.valueOf()
      );
      expect(response.body.areas.vegetation).toBe(
        requestBodyStubValid.vegetationArea.valueOf() +
          requestBodyStubValid2.vegetationArea.valueOf()
      );
      expect(response.body.areas.arable).toBe(
        requestBodyStubValid.arableArea.valueOf() +
          requestBodyStubValid2.arableArea.valueOf()
      );
      expect(response.body.farmsByState).toMatchObject([
        {
          amount: 2,
          state: "State",
        },
      ]);
      expect(response.body.farmsByCrop).toMatchObject([
        {
          amount: 1,
          crop: 'corn',
        },
        {
          amount: 2,
          crop: 'coffe',
        },
        {
          amount: 1,
          crop: 'soy',
        },
      ]);
    });
  });
});
