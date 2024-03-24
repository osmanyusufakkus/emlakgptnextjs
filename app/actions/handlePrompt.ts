import { textStore } from "../store/textStore";

async function HandlePrompt(prompt: any) {
  const result = await performPrismaQuery(prompt);
  console.log("Result:", JSON.stringify(result, null, 2));
  return textStore.getState().updateText(result);
}

async function extractWhereClause(code: any) {
  const regex = /where: {([^;]*)}/g;
  let match;
  const results = [];

  while ((match = regex.exec(code)) !== null) {
    results.push(match[1].trim().slice(0, -2));
  }

  return results;
}

async function performPrismaQuery(code: any) {
  const whereClause = await extractWhereClause(code);
  const whereClauseStr = whereClause[0];
  const whereClauseObj = await eval(`({${whereClauseStr}})`);
  console.log("WhereClauseObj:" + whereClauseObj);
  return whereClauseObj;
}

export default HandlePrompt;
