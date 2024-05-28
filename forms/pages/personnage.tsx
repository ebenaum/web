import Head from "next/head";
import { promises as fs } from "fs";
import { CharacterForm } from "../components/character-form";

export async function getStaticProps() {
  const content = await fs.readFile(
    `${process.env["DATA_DIR"]}/world.json`,
    "utf8",
  );
  const world = JSON.parse(content);

  const races = [];
  for (const key in world) {
    if (world[key].type === "race") {
      races.push(world[key]);
    }
  }

  const factions = [];
  for (const key in world) {
    if (world[key].type === "faction") {
      factions.push(world[key]);
    }
  }

  const characterClasses = [];
  for (const key in world) {
    if (world[key].type === "character-class") {
      characterClasses.push(world[key]);
    }
  }

  const characteristicsContent = await fs.readFile(
    `${process.env["DATA_DIR"]}/characteristics.json`,
    "utf8",
  );
  const characteristics = JSON.parse(characteristicsContent);

  return {
    props: { races, factions, characterClasses, characteristics, world },
  };
}

export default function Home(props: any) {
  return (
    <div>
      <main className="container mx-auto px-4">
        <CharacterForm traitsPoints={7} {...props} />
      </main>
    </div>
  );
}
