import { getBIP44AddressKeyDeriver } from '@metamask/key-tree';
import { TronWeb } from 'tronweb';

/**
 *this is used to get the tron address
 @returns a value
 @param index diravation index
 */
export async function getTronNode(index: number) {
  console.log('this got called..........');
  const dogecoinNode = await snap.request({
    method: 'snap_getBip44Entropy',
    params: {
      coinType: 195,
    },
  });

  // Next, create an address key deriver function for the Dogecoin coin_type node.
  // In this case, its path is: m/44'/3'/0'/0/address_index
  const deriveTronAddress = await getBIP44AddressKeyDeriver(dogecoinNode);

  // These are BIP-44 nodes containing the extended private keys for the respective derivation paths.

  // m/44'/195'/0'/0/0
  const addressKey0 = await deriveTronAddress(index);

  return addressKey0;

  // Now, you can ask the user to sign transactions, etc.
}
