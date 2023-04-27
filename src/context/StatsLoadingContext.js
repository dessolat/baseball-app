import { createContext, useContext } from 'react';

const ctx = createContext();

const StatsLoadingProvider = ({ value, children }) => <ctx.Provider value={value}>{children}</ctx.Provider>;

export const useStatsLoadingCtx = () => useContext(ctx);

export default StatsLoadingProvider;
