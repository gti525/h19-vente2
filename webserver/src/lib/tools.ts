import { SHA3 } from "sha3";

// https://www.competa.com/blog/lets-find-duplicate-property-values-in-an-array-of-objects-in-javascript/
export function checkDuplicateInObject(propertyName: string, inputArray: Array<any>) {
    let seenDuplicate = false;
    const testObject = {};

    inputArray.map(function(item) {
      const itemPropertyName = item[propertyName];
      if (itemPropertyName in testObject) {
        testObject[itemPropertyName].duplicate = true;
        item.duplicate = true;
        seenDuplicate = true;
      } else {
        testObject[itemPropertyName] = item;
        delete item.duplicate;
      }
    });

    return seenDuplicate;
  }

  export function hashPassword(password: string, salt: string): string {
    const hasher = new SHA3(512);
    hasher.update(password.concat(salt));
    const hashedPassword = hasher.digest("base64");
    // console.log("hash: " + hashedPassword);
    hasher.reset();

    return hashedPassword;
  }
