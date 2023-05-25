import { createContext, useState } from 'react';

export const RegexCtx = createContext(null);

const RegexContextProvider = ({ children }) => {
  const [regex, setRegex] = useState('\\w');

  return (
    <RegexCtx.Provider value={{ regex, setRegex }}>
      {children}
    </RegexCtx.Provider>
  );
};

export default RegexContextProvider;
