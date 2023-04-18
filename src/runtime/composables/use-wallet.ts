import detectEthereumProvider from '@metamask/detect-provider'
import { EthereumProvider as WCEthereumProvider } from '@walletconnect/ethereum-provider'
// import CoinbaseWalletSDK from "@coinbase/wallet-sdk";
import { BrowserProvider } from 'ethers'
import { useTimeoutPoll } from '@vueuse/core'
import store from 'store'
import wallet from '../libs/wallet'
import { Wallet, WALLETS_WEBSITE } from '../constants/wallet'
import { useWalletStore, useAccountStore } from '../stores'
import { openExternalLink } from '../utils'
import { Chain } from '../constants/chain'

export default function () {
  // const infuraId = "e301a1229f644717b7b5bd4c9b80ee0f";
  const walletStore = useWalletStore()
  const accountStore = useAccountStore()

  const connectStatus = ref<'unconnected' | 'connecting' | 'connected'>()

  const initWalletConnect = async () => {
    // @note: clear localStorage
    ;[
      // @note: when connected
      'wc@2:core:0.3//keychain',
      'wc@2:client:0.3//session',
      'wc@2:core:0.3//expirer',
      'wc@2:core:0.3//subscription',
      'wc@2:ethereum_provider:/chainId',
      'wc@2:core:0.3//pairing',

      // @note: prepare to connect
      'wc@2:universal_provider:/optionalNamespaces',
      'wc@2:client:0.3//proposal',
      'wc@2:core:0.3//messages',
      'wc@2:universal_provider:/namespaces',
      'wc@2:core:0.3//history'
    ].forEach(item => {
      store.remove(item)
    })

    // @note: get new bridge
    const projectId = '80f9bb3923f859227fa781c0d05a5378'
    // @note: WCEthereumProvider
    const wcProvider = await WCEthereumProvider.init({
      projectId,
      chains: [5],
      showQrModal: true
    })
    await wcProvider.connect()
    initEthereumProvider(wcProvider)
  }
  // @todo: support coinbase
  // const initCoinbase = () => {
  //   // @docs: https://docs.cloud.coinbase.com/wallet-sdk/docs
  //   try {
  //     const coinbaseWallet = new CoinbaseWalletSDK({
  //       appName: "Web3",
  //       appLogoUrl: "https://web3.com/favicon.ico",
  //       darkMode: false,
  //     });
  //     const cbProvider = coinbaseWallet.makeWeb3Provider(
  //       `https://mainnet.infura.io/v3/${infuraId}`,
  //       1
  //     );
  //     initEthereumProvider(cbProvider);
  //   } catch (error) {
  //     console.log("initCoinbaseWallet", error);
  //   }
  // };

  const initFrontierWallet = () => {
    const provider = window.frontier && window.frontier.ethereum
    if (!provider) {
      openExternalLink(WALLETS_WEBSITE.Frontier)
      return
    }
    initEthereumProvider(provider)
  }
  const initBitKeep = () => {
    const provider = window.bitkeep && window.bitkeep.ethereum
    if (!provider) {
      openExternalLink(WALLETS_WEBSITE.BitKeep)
      return
    }
    initEthereumProvider(provider)
  }
  const initOKX = () => {
    const provider = window.okxwallet
    if (!provider) {
      openExternalLink(WALLETS_WEBSITE.OKX)
      return
    }
    initEthereumProvider(provider)
  }
  const initSimilarMetaMask = async (_wallet: Wallet) => {
    const ethereum = (await detectEthereumProvider()) as any
    let provider = ethereum
    if (_wallet === WALLETS.METAMASK && !provider) {
      openExternalLink(WALLETS_WEBSITE[_wallet])
      return
    }
    // @note: if install Coinbase wallet
    if (ethereum.providers?.length) {
      ethereum.providers.forEach((p: any) => {
        // @note: fu*k coinbase
        if (p.isMetaMask && !p.overrideIsMetaMask) {
          provider = p
        }
      })
    }
    initEthereumProvider(provider)
  }
  const initEthereumProvider = async (provider: any) => {
    wallet.origin = provider
    wallet.provider = new BrowserProvider(provider)
    wallet.signer = await wallet.provider.getSigner()
  }
  const selectWallet = async (_wallet: Wallet) => {
    switch (_wallet) {
      case WALLETS.OKX:
        initOKX()
        break
      case WALLETS.FRONTIER:
        initFrontierWallet()
        break
      case WALLETS.BITKEEP:
        initBitKeep()
        break
      // case WALLETS.COINBASE:
      //   initCoinbase();
      //   break;
      case WALLETS.WALLETCONNECT:
        await initWalletConnect()
        break
      case WALLETS.METAMASK:
      case WALLETS.IMTOKEN:
      case WALLETS.TOKENPOCKET:
      case WALLETS.MATHWALLET:
      case WALLETS.TRUSTWALLET:
        await initSimilarMetaMask(_wallet)
        break
    }
  }

  const initWalletListener = (_wallet: Wallet) => {
    const p = wallet.origin
    if (_wallet !== WALLETS.WALLETCONNECT) {
      /* wallet connect 非主网连接时，会触发一次 chainChanged */
      p.on('accountsChanged', (accounts: string[]) => {
        if (accounts.length === 0) walletStore.setConnected(false)
        if (walletStore.connected) {
          accountStore.setAccount(accounts[0])
        }
      })

      // p.on("chainChanged", (chainId: number | string) => {
      //   try {
      //     checkNetwork(chainId);
      //   } catch (error: any) {
      //     console.log(error?.message);
      //   }
      // });
    }
  }

  const initAccount = async (_walletType: Wallet) => {
    const accounts: string[] =
      _walletType === 'WalletConnect'
        ? await wallet.origin.enable() // wallet connect
        : await wallet.provider!.send('eth_requestAccounts', []) // others
    console.log('accounts', accounts)
    if (accounts.length > 0) {
      accountStore.setAccount(accounts[0])
    }
  }
  const initNetwork = async () => {
    const { chainId } = await wallet.provider!.getNetwork()
    walletStore.setChain(Number(chainId) as Chain)
  }

  const connectWallet = async (_walletType: Wallet): Promise<void> => {
    _walletType = _walletType || WALLETS.METAMASK

    try {
      connectStatus.value = 'connecting'

      await selectWallet(_walletType)
      if (!wallet.provider) return
      initWalletListener(_walletType)

      await initAccount(_walletType)
      if (!accountStore.account) return

      await initNetwork()
      if (!walletStore.chain) return

      walletStore.setWallet(_walletType)
      walletStore.setConnected(true)
      connectStatus.value = 'connected'
    } catch (e) {
      walletStore.setConnected(false)
      console.log('connect failed', e)
      throw new Error('Connect wallet failed.')
    }
  }

  const updateBalance = async () => {
    if (!wallet.provider) return
    try {
      const _balance = await wallet.provider.getBalance(accountStore.account)
      console.log('balance', _balance)
      accountStore.setBalance(_balance)
    } catch (error) {
      console.log('update account balance error')
    }
  }
  const { resume: balanceStater, pause: balanceStoper } = useTimeoutPoll(updateBalance, 10 * 1000)
  watch(
    () => accountStore.account,
    () => {
      balanceStater()
    }
  )
  onUnmounted(() => balanceStoper())

  return {
    wallet,
    connectWallet
  }
}
