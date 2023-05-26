import { createContext, useState } from 'react';

export const RegexCtx = createContext(null);

const RegexContextProvider = ({ children }) => {
  const [regex, setRegex] = useState('\\w');
  const [matchCount, setMatchCount] = useState(0);

  return (
    <RegexCtx.Provider value={{ regex, setRegex, matchCount, setMatchCount }}>
      {children}
    </RegexCtx.Provider>
  );
};

export default RegexContextProvider;
