import type { OnRpcRequestHandler } from '@metamask/snaps-sdk';
import { panel, text } from '@metamask/snaps-sdk';
import getTronAddress from './bip/derive-tron-address';
import getTronPrivateKey from './bip/get-tron-private-key';
import { getTrxBalance } from './tronWeb';

/**
 * Handle incoming JSON-RPC requests, sent through `wallet_invokeSnap`.
 *
 * @param args - The request handler args as object.
 * @param args.origin - The origin of the request, e.g., the website that
 * invoked the snap.
 * @param args.request - A validated JSON-RPC request object.
 * @returns The result of `snap_dialog`.
 * @throws If the request method is not valid for this snap.
 */
export const onRpcRequest: OnRpcRequestHandler = async ({
  origin,
  request,
}) => {
  switch (request.method) {
    case 'hello':
      return snap.request({
        method: 'snap_dialog',
        params: {
          type: 'confirmation',
          content: panel([
            text(`Hello, **${origin}**!`),
            text('This custom confirmation is just for display purposes.'),
            text(
              'But you can edit the snap source code to make it do something, if you want to!',
            ),
          ]),
        },
      });
    default:
      throw new Error('Method not found.');

    case 'GenerateTronAddress':
      return await getTronAddress();
    case 'GetTrxBalance': {
      const address = (await getTronAddress()) as string;
      return await getTrxBalance(address);
    }
    case 'GetBandwidthAndEnergyBalance':
      return 'bandwidth and energy balance';
  }
};
