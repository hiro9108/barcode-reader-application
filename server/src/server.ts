import express, { Request, Response } from "express";
import cors from "cors";
import { outputHelper } from "./utils/helper";

const PORT = 8000;

const app = express();

app.use(express.json());
app.use(cors());

app.post(
  "/decoded",
  (req: Request<{}, {}, { text: string }>, res: Response) => {
    const decodedText = req.body.text;
    outputHelper(decodedText);
    res.json({ decodedMsg: decodedText });
  }
);

app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});
