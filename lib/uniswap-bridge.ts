export function getUniswapProvider(wallet: any) {
  if (!wallet) return undefined;
  const p = wallet.getProvider();
  return {
    ...p,
    on: p.on || (() => {}),
    removeListener: p.removeListener || (() => {}),
    request: p.request?.bind(p),
  };
}
