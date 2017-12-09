import { Reflection } from './reflection';
import { Metadata } from './metadata';
import { IsFunction, GetPrototypeArray, IsString } from './utils';
import { Constructor } from './constructor';

export class Lookup {
  
  /**
   * Find all attribute with interceptor
   */
  public static findInterceptors(typeOrInstance: Constructor): Map<string, Reflection> {

    const results = new Map<string, Reflection>();
    const prototypes = GetPrototypeArray(typeOrInstance);

    for (const proto of prototypes.reverse()) {
      
      const reflections = Metadata.getAll(proto);
      
      for (const [key, reflection] of reflections) {
        
        // property don't have a descriptor
        if (key && IsString(key) && reflection.hasInterceptor()) {
          
          // reflection without descriptor must a field
          results.set(String(key), reflection);
          
        }
        
      }
      
    }

    return results;
  }

  public static findInitializers(typeOrInstance: Constructor): Map<string, Reflection> {

    const results = new Map<string, Reflection>();
    const prototypes = GetPrototypeArray(typeOrInstance);

    for (const proto of prototypes.reverse()) {
      const reflections = Metadata.getAll(proto);
      for (const [key, reflection] of reflections) {
        // property don't have a descriptor
        if (key && IsString(key) && reflection.hasInitializer()) {
          // reflection without descriptor must a field
          results.set(String(key), reflection);
        }
      }
    }

    return results;
  }

}
