import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider, WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { UnsafeBurnerWalletAdapter } from '@solana/wallet-adapter-wallets';
import { clusterApiUrl } from '@solana/web3.js';
import React, { FC, ReactNode, useMemo } from 'react';
import styled from 'styled-components';
import FormAdmin from './FormAdmin';

const MainContainer = styled.div`
    width: 100%;
`;
const NavContainer = styled.div`
    width: 100%;
    height: fit-content;
    display: flex;
    justify-content: space-around;

    flex-direction: row;
    border-bottom: 1px solid black;
`;

const NavR = styled.div`
    display: flex;
    // float: right;
    // border: 1px solid black;
    height: fit-content;
    align-self: center;
`;

const NavL = styled.div`
    display: flex;
    // float: Left;
`;

const FormCd = styled.div`
    margin: 1.5em;
`;

require('./App.css');
require('@solana/wallet-adapter-react-ui/styles.css');

const App: FC = () => {
    return (
        <Context>
            <Content />
        </Context>
    );
};
export default App;

const Context: FC<{ children: ReactNode }> = ({ children }) => {
    const network = WalletAdapterNetwork.Devnet;

    const endpoint = useMemo(() => clusterApiUrl(network), [network]);

    const wallets = useMemo(
        () => [new UnsafeBurnerWalletAdapter()],

        [network]
    );

    return (
        <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={wallets} autoConnect>
                <WalletModalProvider>{children}</WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    );
};

const Content: FC = () => {
    return (
        <MainContainer>
            {/* <NavContainer>
                <NavL>
                    <h2>welcome admin</h2>
                </NavL>
                <NavR>
                    <WalletMultiButton />
                </NavR>
            </NavContainer> */}
            <FormCd>
                <FormAdmin />
            </FormCd>
        </MainContainer>
    );
};
