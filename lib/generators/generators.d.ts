declare module "@/lib/generators/genericApp" {
  const template: {
    id: string;
    name: string;
    files: Record<string, string>;
  };
  export default template;
}

declare module "@/lib/generators/simpleLanding" {
  const template: {
    id: string;
    name: string;
    files: Record<string, string>;
  };
  export default template;
}
