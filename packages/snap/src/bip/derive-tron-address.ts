import { getBIP44AddressKeyDeriver } from '@metamask/key-tree';
import { TronWeb } from 'tronweb';
import { getTronNode } from './get-tron-node';

/**
 *this is used to get the tron address
 @returns a value
 @param index derivation index
 */
async function getTronAddress(index = 0) {
  const addressKey0 = await getTronNode(index);
  let tronAddress;
  if (addressKey0) {
    tronAddress = addressKey0.address;
  }
  return tronAddress;
}
export default getTronAddress;
