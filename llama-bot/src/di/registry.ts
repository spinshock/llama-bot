class Container {
  // holding instances of injectable classes by key
  private static registry: Map<string, any> = new Map();

  static register(key: string, instance: any) {
    if (!Container.registry.has(key)) {
      Container.registry.set(key, instance);
      console.log(`Added ${key} to the registry.`);
    }
  }

  static get(key: string) {
    return Container.registry.get(key);
  }
}
