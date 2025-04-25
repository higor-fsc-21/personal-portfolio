const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

// Run the next build
execSync("next build", { stdio: "inherit" });

// Ensure the manifest file is in the correct location
const sourceDir = path.join(process.cwd(), ".next/server/app");
const targetDir = path.join(process.cwd(), ".next/server/app/(public)");

if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

// Copy the manifest file if it exists
const manifestFile = "page_client-reference-manifest.js";
if (fs.existsSync(path.join(sourceDir, manifestFile))) {
  fs.copyFileSync(
    path.join(sourceDir, manifestFile),
    path.join(targetDir, manifestFile)
  );
}
