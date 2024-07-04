import { getTronNode } from './get-tron-node';

/**
 *this is used to get the tron address
 @returns a value
 @param index derivation index
 */
async function getTronPrivateKey(index = 0) {
  const addressKey0 = await getTronNode(index);
  let privateKey;
  if (addressKey0) {
    privateKey = addressKey0.privateKey;
  }
  const tronPrivateKey = privateKey;
  return tronPrivateKey;
}

export default getTronPrivateKey;
