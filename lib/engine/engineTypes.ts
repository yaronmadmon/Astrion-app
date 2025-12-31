// lib/engine/engineTypes.ts

export type ComponentBlock = {
  id: string;
  type: "text";
  text: string;
};

export type Page = {
  id: string;
  name: string;
  components: ComponentBlock[];
};

export type AppSchema = {
  appName: string;
  pages: Page[];
};
