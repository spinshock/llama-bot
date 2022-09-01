import { Decorator } from "./decorator";

export type ModifyFunction<ToModify extends Decorator> = (
  original: ToModify
) => unknown;

const getLinkedObjects = <Type extends Decorator>(
  a: Decorator,
  list: Type[]
): Type[] => {
  return list.filter((b) => {
    let cond = a.from === b.from && a.key === b.key;

    // do not remove this undefined check, cause unexpected error
    // such as choices apply on all options
    if (a.index !== undefined && b.index !== undefined) {
      cond &&= a.index === b.index;
    }

    return cond;
  });
};

/**
 * @category Internal
 */
export class Modifier<
  ToModify extends Decorator = Decorator
> extends Decorator {
  private _toModify: ModifyFunction<ToModify>;
  private _modifyTypes: unknown[];

  protected constructor(
    toModify: ModifyFunction<ToModify>,
    modifyTypes: unknown[]
  ) {
    super();
    this._toModify = toModify;
    this._modifyTypes = modifyTypes;
  }

  static create<ToModifyEx extends Decorator>(
    toModify: ModifyFunction<ToModifyEx>,
    ...modifyTypes: unknown[]
  ): Modifier<ToModifyEx> {
    return new Modifier<ToModifyEx>(toModify, modifyTypes);
  }

  /**
   * Apply the modifier to a list of objects
   * it only applies the modifications to linked objects
   * that are on the targets type of modification
   *
   * @param modifiers - The modifier list
   * @param originals - The list of objects to modify
   *
   * @returns
   */
  static applyFromModifierListToList(
    modifiers: Modifier[],
    originals: Decorator[]
  ): Promise<void[]> {
    return Promise.all(
      modifiers.map(async (modifier) => {
        // Get the list of objects that are linked to the specified modifier
        let linked = getLinkedObjects(modifier, originals);

        // Filter the linked objects to match the target types of modification
        linked = linked.filter((l) =>
          modifier._modifyTypes.includes(l.constructor)
        );

        // Apply the modifications
        await Promise.all(
          linked.map((linkedOriginal) => {
            return modifier.applyModifications(linkedOriginal);
          })
        );
      })
    );
  }

  applyModifications(original: ToModify): unknown {
    return this._toModify(original);
  }
}
