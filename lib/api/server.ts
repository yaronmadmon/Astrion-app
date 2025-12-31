import express from "express";
import path from "path";
import { runEngine } from "../engine/runEngine";
import { writeFiles } from "../writer/fileWriter";

const app = express();
app.use(express.json());

app.post("/generate", async (req, res) => {
  try {
    const {
      templateId,
      userParams,
      writeMode = "dry-run",
      overwrite = "skip",
    } = req.body;

    if (!templateId) {
      return res.status(400).json({
        success: false,
        error: "templateId is required",
      });
    }

    const engineResult = await runEngine({
      templateId,
      userParams,
    });

    if (!engineResult.success) {
      return res.status(400).json(engineResult);
    }

    const outputDir = path.join(process.cwd(), "output-app");

    const writerResult = writeFiles(outputDir, engineResult.files, {
      mode: writeMode,
      overwrite,
    });

    return res.json({
      success: true,
      templateId: engineResult.templateId,
      writer: writerResult,
      files: engineResult.files,
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      error: err?.message ?? "API failure",
    });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Astrion API running on http://localhost:${PORT}`);
});
