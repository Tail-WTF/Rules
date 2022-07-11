/**
 * Link sanitization rule assembler.
 * Combine all the rules into one YAML file and
 */
const fs = require("fs");
const path = require("path");
const YAML = require("js-yaml");

const WORKING_DIR = process.env.GITHUB_WORKSPACE || __dirname;
const RULES_PATH = path.join(WORKING_DIR, "rules");
const OUTPUT_FILE = path.join(WORKING_DIR, "sanitization_rules.yaml");

fs.readdir(RULES_PATH, (err, files) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }

  const rules = files
    .filter((file) => path.extname(file.toLowerCase()) === ".yaml")
    .map((file) => YAML.load(fs.readFileSync(path.join(RULES_PATH, file))))
    .reduce((acc, curr) => Object.assign(acc, curr), {});

  fs.writeFileSync(
    OUTPUT_FILE,
    YAML.dump(rules, { flowLevel: 0, condenseFlow: true, lineWidth: -1 })
  );
});
