const appStorage: { [key: string]: any } = {};

export function saveApp(id: string, config: any) {
  appStorage[id] = config;
}

export function getAppConfig(id: string) {
  return appStorage[id];
}