import { CorsOptions } from "cors";
import HttpStatus  from "http-status-codes";

export const corsOptions: CorsOptions = {
  origin: "*",
  methods: "OPTIONS,POST,PUT,GET,PATCH,DELETE",
  allowedHeaders: "Content-Type",
  optionsSuccessStatus: HttpStatus.NO_CONTENT,
  preflightContinue: false,
};
