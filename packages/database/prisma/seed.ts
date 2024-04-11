import { PrismaClient, Node, Edge } from "../.prisma/client";
import readline from "readline";
import fs from "fs";

const prisma = new PrismaClient();

async function main() {
  const nodes: Node[] = [];

  // Parse nodes CSV
  const nodeStream = readline.createInterface({
    input: fs.createReadStream("prisma/nodes.csv"),
    terminal: false,
  });

  let i = 0;
  for await (const line of nodeStream) {
    if (i == 0) {
      i++;
      continue;
    }
    const [
      id,
      xcordsString,
      ycordsString,
      floor,
      building,
      type,
      longName,
      shortName,
    ] = line.split(",");
    const x = Number(xcordsString);
    const y = Number(ycordsString);
    nodes.push({
      id,
      x,
      y,
      building,
      floor,
      type,
      longName,
      shortName,
    });
  }

  // Save to database
  await prisma.node.createMany({ data: nodes, skipDuplicates: true });

  const edges: Edge[] = [];

  // Parse edges CSV
  const edgeStream = readline.createInterface({
    input: fs.createReadStream("prisma/modedges.csv"),
    terminal: false,
  });

  i = 0;
  for await (const line of edgeStream) {
    if (i == 0) {
      i++;
      continue;
    }
    const [startNodeId, endNodeId] = line.split(",");
    const id = `${startNodeId}-${endNodeId}`;
    edges.push({ id, startNodeId, endNodeId });
    const reverseId = `${endNodeId}-${startNodeId}`;
    edges.push({
      id: reverseId,
      startNodeId: endNodeId,
      endNodeId: startNodeId,
    });
  }

  await prisma.edge.createMany({ data: edges, skipDuplicates: true });

  await prisma.flower.deleteMany();
  for (let i = 0; i < 50; i++) {
    await prisma.flower.create({
      data: {
        flower: "Pretty Flower",
        id: i.toString(),
        serviceId: "CDEPT003L1",
        recipientName: "Flower",
      },
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
